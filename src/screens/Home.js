import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();

      if (Array.isArray(response) && response.length === 2) {
        setFoodItem(response[0]);
        setFoodCat(response[1]);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                className="btn btn-outline-success my-2 my-sm-0 text-white bg-success"
                type="submit"
              >
                Search
              </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(100%)",
                  width: "100px",
                  height: "770px",
                }}
                src="https://static.vecteezy.com/system/resources/previews/025/065/315/non_2x/fast-food-meal-with-ai-generated-free-png.png"
                alt="Burger"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(70%)",
                  width: "100px",
                  height: "770px",
                }}
                src="https://www.indianhealthyrecipes.com/wp-content/uploads/2023/02/paneer-biryani-recipe.jpg"
                alt="Biryani"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(70%)",
                  width: "100px",
                  height: "770px",
                }}
                src="https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2017/03/Paneer-Tikka-Masala-4.jpg?fit=1024%2C683&ssl=1"
                alt="paneer tikka"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                style={{
                  filter: "brightness(70%)",
                  width: "100px",
                  height: "770px",
                }}
                src="https://i.pinimg.com/originals/e1/da/d5/e1dad5315972c8a9db86fb01d69c7ecb.jpg"
                alt="Thali"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div
                      key={filteredItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        item={{
                          ...filteredItem,
                          category: category.CategoryName,
                        }}
                      />
                    </div>
                  ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

