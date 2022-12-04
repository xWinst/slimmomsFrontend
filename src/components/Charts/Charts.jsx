import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReports } from 'redux/productOperation';
import { useWidth } from 'hooks/useWidth';
import s from './Charts.module.css';

const sort = array => {
    if (!array) return null;
    const arr = [...array].sort((a, b) => {
        const first = a.date.split('-').map(Number);
        const second = b.date.split('-').map(Number);
        if (first[2] !== second[2]) return first[2] - second[2];
        if (first[1] !== second[1]) return first[1] - second[1];
        return first[0] - second[0];
    });
    return arr;
};

const getDate = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
};

const startY = 400;

const Charts = ({ isAlltime }) => {
    const reports = useSelector(state => state.product.reports);
    const [params, setParams] = useState();
    const [data, setData] = useState();
    const [period, setPeriod] = useState();
    const [days, setDays] = useState();
    const canvas = useRef(null);
    const canvas2 = useRef(null);
    const canvas3 = useRef(null);
    const canvas4 = useRef(null);
    const canvas5 = useRef(null);
    const canvas6 = useRef(null);
    const dispatch = useDispatch();
    const w = useWidth();
    const width = w < 480 ? w - 40 : w < 768 ? 440 : w < 1280 ? 704 : 1216;

    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);

    useEffect(() => {
        setPeriod(null);
        setData(sort(reports));
    }, [isAlltime, reports]);

    const paintBase = canvas => {
        const ctx = canvas.getContext('2d');
        ctx.setLineDash([]);
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.moveTo(0, startY);
        ctx.lineTo(width, startY);
        ctx.moveTo(0, startY);
        ctx.lineTo(0, 0);
        ctx.moveTo(width - 1, startY);
        ctx.lineTo(width - 1, 0);
        ctx.stroke();
    };

    const paintMinMax = canvas => {
        const ctx = canvas.getContext('2d');
        ctx.setLineDash([1, 1]);
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.moveTo(0, startY - 300);
        ctx.lineTo(50, startY - 300);
        ctx.moveTo(0, startY - 20);
        ctx.lineTo(50, startY - 20);
        ctx.moveTo(0, startY - 380);
        ctx.lineTo(50, startY - 380);
        ctx.moveTo(0, startY - 130);
        ctx.lineTo(50, startY - 130);
        ctx.stroke();
    };

    const paintGrid = canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        const x = width > 440 ? 1 : Math.ceil(days / 30);
        for (let i = 0; i <= days; i += x) {
            ctx.moveTo((i * width) / days, startY);
            ctx.lineTo((i * width) / days, 0);
        }
        ctx.stroke();
        paintBase(canvas5.current);
        paintMinMax(canvas6.current);
    };

    const paintChar = (canvas, type, color) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        // const max = Math.max(...data.map(a => a[type]));
        // let min = Math.min(...data.map(a => a[type]).filter(a => a !== 0));
        // let k = 280 / (max - min);
        // if (k === Infinity) {
        //     min = 0;
        //     k = 280 / max;
        // }

        const k = type === 'weight' ? params.kWeight : params.kKcal;
        const min = type === 'weight' ? params.minWeight : params.minKcal;

        const startY = type === 'weight' ? 380 : 270;
        const startData = data.find(a => a[type] !== 0);
        if (!startData) return;
        const startPeriod = period.findIndex(a => a === startData.date);

        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.moveTo(
            (startPeriod * width) / days,
            startY - (startData[type] - min) * k
        );
        for (let i = 0; i <= days; i++) {
            const item = data.find(a => a.date === period[i]);
            if (!item || item[type] === 0) continue;
            ctx.lineTo((i * width) / days, startY - (item[type] - min) * k);
        }
        ctx.stroke();
    };

    const createChar = () => {
        if (data && !period) {
            const start = data[0].date.split('-').map(Number);
            const finish = data[data.length - 1].date.split('-').map(Number);
            let startDate = new Date(start[2], start[1] - 1, start[0]);
            const finishDate = new Date(finish[2], finish[1] - 1, finish[0]);

            if (!isAlltime) {
                startDate = new Date(finish[2], finish[1] - 1, finish[0]);
                startDate.setDate(startDate.getDate() - 30);
            }

            const days =
                (finishDate.getTime() - startDate.getTime()) / 24 / 3600000;

            let currentDate = startDate;
            const arr = [];
            let count = 0;

            while (count <= days) {
                count++;
                arr.push(getDate(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const maxConsumed = Math.max(...data.map(a => a.consumed));
            const minConsumed = Math.min(
                ...data.map(a => a.consumed).filter(a => a !== 0)
            );
            const maxRate = Math.max(...data.map(a => a.dailyRate));
            const minRate = Math.min(
                ...data.map(a => a.dailyRate).filter(a => a !== 0)
            );
            const maxKcal = Math.max(maxConsumed, maxRate);
            const minKcal = Math.min(minConsumed, minRate);

            const maxWeight = Math.max(...data.map(a => a.weight));
            const minWeight = Math.min(
                ...data.map(a => a.weight).filter(a => a !== 0)
            );

            const kKcal =
                maxKcal === minKcal ? 250 / maxKcal : 250 / (maxKcal - minKcal);
            const kWeight =
                maxWeight === minWeight
                    ? 280 / maxWeight
                    : 280 / (maxWeight - minWeight);

            setParams({
                kKcal,
                kWeight,
                minKcal,
                minWeight,
                maxWeight,
                maxKcal,
            });
            setPeriod(arr);
            if (days === 0) setDays(1);
            else setDays(days);
        }

        if (period) {
            paintGrid(canvas.current);
            paintChar(canvas2.current, 'weight', '#88FF1E');
            paintChar(canvas3.current, 'consumed', '#FF881E');
            paintChar(canvas4.current, 'dailyRate', '#2222EE');
        }
    };

    createChar();
    const x = Math.ceil(days / 30);

    return (
        <div className={s.container}>
            <canvas ref={canvas} width={width} height={400} />
            <canvas
                ref={canvas2}
                width={width}
                height={400}
                style={{ marginTop: '-400px' }}
            />
            <canvas
                ref={canvas3}
                width={width}
                height={400}
                style={{ marginTop: '-400px' }}
            />
            <canvas
                ref={canvas4}
                width={width}
                height={400}
                style={{ marginTop: '-400px' }}
            />
            <canvas
                ref={canvas5}
                width={width}
                height={400}
                style={{ marginTop: '-400px' }}
            />
            <canvas
                ref={canvas6}
                width={width}
                height={400}
                style={{ marginTop: '-400px' }}
            />

            <ul className={s.list}>
                {period?.map(
                    (date, i) =>
                        (width > 440 || i % x === 0) && (
                            <li
                                className={s.legend}
                                key={date}
                                style={{ left: (i * width) / days - 40 }}
                            >
                                {date}
                            </li>
                        )
                )}
            </ul>
            <p className={s.maxW}>{params?.maxWeight} kg</p>
            <p className={s.minW}>{params?.minWeight} kg</p>
            <p className={s.maxK}>{params?.maxKcal} kcal</p>
            <p className={s.minK}>{params?.minKcal} kcal</p>
        </div>
    );
};

export default Charts;
