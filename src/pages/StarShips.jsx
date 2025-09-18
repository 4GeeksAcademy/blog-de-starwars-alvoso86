
import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const StarShips = () => {
  const { store, dispatch } = useGlobalReducer();
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    // Obtener todas las naves de la API
    fetch("https://www.swapi.tech/api/starships")
      .then((response) => response.json())
      .then((data) => {
        setStarships(data.results);
      })
      .catch((error) => console.error("Error al obtener naves:", error));
  }, []);
  const toggleFavorite = (starship, type) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === starship.uid && fav.type === type)
    if (isFavorite) {
      dispatch({ type: "remove_from_favorites", payload: {uid: starship.uid, type}});
    } else {
      dispatch({ type: "add_to_favorites", payload: {...starship, type }});
    }
  };

  return (
    <>

      <div className="container mt-4">
        <h1>Naves de Star Wars</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {starships.map((starship, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img
                  src="http://www.itespresso.es/wp-content/uploads/2012/10/gm-naves-abecedario-gm.jpg "
                  className="card-img-top"
                  alt={starship.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{starship.name}</h5>
                  <p className="card-text">ID: {starship.uid}</p>
                </div>
                <div className="card-footer">
                  <Link to={`informe-card/starships/${starship.uid}`} className="btn btn-primary">
                    Más detalles
                  </Link>
                  <button
                    className={`btn ${store.favorites.some((fav) => fav.uid === starship.uid && fav.type === "starships")
                      ? "btn-danger"
                      : "btn-outline-warning"
                      }`}
                    onClick={() => toggleFavorite(starship, "starships")}
                  >
                    <i className={`fa-heart ${store.favorites.some((fav) => fav.uid === starship.uid && fav.type === "starships")
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
export default StarShips
