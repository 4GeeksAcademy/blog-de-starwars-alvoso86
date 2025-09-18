
import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Planets = () => {
  const { store, dispatch } = useGlobalReducer(); 
  const [planets, setPlanets] = useState([]);


  useEffect(() => {
    // Obtener todos los Planetas de la API
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
      })
      .catch((error) => console.error("Error al obtener planetas:", error));
  }, []);

  const toggleFavorite = (planet, type) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === planet.uid && fav.type === type)
    if (isFavorite) {
      dispatch({ type: "remove_from_favorites", payload: {uid: planet.uid, type}});
    } else {
      dispatch({ type: "add_to_favorites", payload: {...planet, type }});
    }
  };

  return (
    <>

      <div className="container mt-4">
        <h1>Planetas de Star Wars</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {planets.map((planet, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img
                  src="https://i.pinimg.com/736x/40/85/89/408589264d694b5811e0f8285552a42a.jpg"
                  className="card-img-top"
                  alt={planet.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{planet.name}</h5>
                  <p className="card-text">ID: {planet.uid}</p>
                </div>
                <div className="card-footer">
                  <Link to={`informe-card/planets/${planet.uid}`} className="btn btn-primary">
                    Más detalles
                  </Link>
                  <button
                    className={`btn ${store.favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets")
                      ? "btn-danger"
                      : "btn-outline-warning"
                      }`}
                    onClick={() => toggleFavorite(planet, "planets")}
                  >
                    <i className={`fa-heart ${store.favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets")
                        ? "fa-solid"
                        : "fa-regular"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Planets
