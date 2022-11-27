import s from './Select.module.css';

const Select = ({ products, getProduct }) => {
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
