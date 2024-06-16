import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "../components/ContextReducer";

export default function Card({ item }) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  const getOptions = (category) => {
    switch (category.toLowerCase()) {
      case 'biryani/rice':
      case 'starter':
        return { "half": 100, "full": 200 }; // Example prices
      case 'pizza':
        return { "regular": 150, "medium": 200, "large": 300 }; // Example prices
      default:
        return {};
    }
  };

  const options = getOptions(item.category);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(Object.keys(options)[0] || "");

  const handleAddToCart = async () => {
    let food = data.find(d => d.id === item._id && d.size === size);

    if (food) {
      await dispatch({ type: "UPDATE", id: item._id, price: calculateTotalPrice(), qty });
    } else {
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.name,
        price: calculateTotalPrice(),
        qty,
        size,
        img: item.img
      });
    }
  };

  const calculateTotalPrice = () => {
    return (qty * options[size]).toFixed(2);
  };

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  return (
    <div className="card mt-3" style={{ width: "19rem", maxHeight: "490px" }}>
      <img src={item.img} className="card-img-top" style={{ height: "13rem", objectFit: "fill" }} alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)} value={qty}>
            {Array.from(Array(6), (e, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)} value={size}>
            {Object.keys(options).map((option, index) => (
              <option key={index} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
          <div className="d-inline h-100 fs-5">₹{calculateTotalPrice()}/-</div>
        </div>
        <hr />
        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
}
