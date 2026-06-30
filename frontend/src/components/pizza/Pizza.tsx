import { IPizza } from "../../interfaces/IPizza";

const Pizza = ({pizza}:{pizza:IPizza}) => {
    const {name, price, size} = pizza;
    return (
        <div style={{backgroundColor: "lavender", width: '200px'}}>
            <h3>{name}</h3>
            <h6>Price: {price} UAH</h6>
            <h6> Size: {size} sm</h6>
        </div>
    );
};

export { Pizza };