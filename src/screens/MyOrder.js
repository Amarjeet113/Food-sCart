import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await response.json();
      setOrderData(result.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.reverse().map((order, orderIndex) => (
              <div key={orderIndex} className="mb-5">
                <div className="m-auto mt-5">
                  <h5 className="text-center">Order Date: {new Date(order[0].Order_date).toDateString()}</h5>
                  <hr />
                </div>
                <div className="row">
                  {order.slice(1).map((item, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-3">
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt={item.name}
                          style={{ height: "120px", objectFit: "fill" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="container w-100 p-0" style={{ height: "38px" }}>
                            <span className="m-1">{item.qty}</span>
                            <span className="m-1">{item.size}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">No Orders Found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
