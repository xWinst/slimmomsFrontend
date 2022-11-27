// import { useState, useEffect } from 'react';
// import { Icon } from 'components';
// import icons from 'images/icons.svg';
import s from './Select.module.css';

const Select = ({ products, getProduct }) => {
    // const [isShow, setIsShow] = useState(false);
    // const [btnIcon, setBtnIcon] = useState(`${icons}#arrowDown`);
    // const [btnColor, setBtnColor] = useState('#c7ccdc');
    // const [selectedCategory, setSelectedCategory] = useState('Product category');

    // console.log('products: ', products);
    // const keys = Object.keys(products);

    // useEffect(() => {
    //     window.addEventListener('click', onClick);
    //     window.addEventListener('keydown', onKeyDown);
    //     return () => {
    //         window.removeEventListener('click', onClick);
    //         window.removeEventListener('keydown', onKeyDown);
    //     };
    // }, []);

    // useEffect(() => {
    //     setSelectedCategory('Product category');
    //     // setBtnColor('#c7ccdc');
    // }, [initial]);

    // const onClick = event => {
    //     if (event.target.name !== 'btn') {
    //         // setIsShow(false);
    //         // setBtnIcon(`${icons}#arrowDown`);
    //     }
    // };

    // const onKeyDown = event => {
    //     if (event.code === 'Tab' || event.code === 'Escape') {
    //         // setIsShow(false);
    //         // setBtnIcon(`${icons}#arrowDown`);
    //     }
    // };

    // const showSelection = () => {
    //     setIsShow(state => !state);
    //     setBtnIcon(isShow ? `${icons}#arrowDown` : `${icons}#arrowUp`);
    // };

    // const selectProduct = product => {
    // setSelectedCategory(event.target.innerText);
    // setBtnColor('#52555f');
    // setIsShow(false);
    //     getProduct(product);
    // };

    return (
        <div className={s.container}>
            <ul className={s.list}>
                {products.map(product => (
                    <li
                        key={product._id}
                        className={s.item}
                        onClick={() => getProduct(product)}
                    >
                        <p className={s.title}>{product.title.ua}</p>
                        <div className={s.thumb}>
                            <p>{product.weight} g</p>
                            <p>{product.calories} kcal</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
