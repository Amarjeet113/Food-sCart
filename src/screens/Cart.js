import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3" style={{color:"white"}}>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        setErrorMessage("Failed to place order. Please try again.");
      }
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = data
    .reduce((total, food) => total + food.price * food.qty, 0)
    .toFixed(2);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody style={{color:"white"}}>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{(food.price * food.qty).toFixed(2)}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/512/3817/3817209.png"
                      }
                      alt="delete"
                      onClick={() => dispatch({ type: "REMOVE", index })}
                      style={{ width: "24px", height: "24px" }} // Adjust width and height as needed
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 " style={{color:"white"}}>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          {isLoading ? (
            <button className="btn bg-success mt-5" disabled>
              Processing...
            </button>
          ) : (
            <button className="btn bg-success mt-5" onClick={handleCheckOut}>
              Check Out
            </button>
          )}
        </div>
        {errorMessage && (
          <div className="mt-3 text-danger">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
