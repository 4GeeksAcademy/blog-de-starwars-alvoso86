
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import StarShips from "./StarShips";
import Planets from "./Planets";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer(); 
  const [characters, setCharacters] = useState([]); 
 

  useEffect(() => {
    // Obtener todos los personajes de la API
    fetch("https://www.swapi.tech/api/people")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
      })
      .catch((error) => console.error("Error al obtener personajes:", error));
  }, []);

  const toggleFavorite = (item, type) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === item.uid && fav.type === type);
    if (isFavorite) {
      dispatch({ type: "remove_from_favorites", payload: { uid: item.uid, type } });
    } else {
      dispatch({ type: "add_to_favorites", payload: { ...item, type } });
    }
  };

  return (
    <>

      <div className="container mt-4">
        <h1>Personajes de Star Wars</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {characters.map((character, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.ZmDKZf5RbSAE667EdsXjOQHaEK?pid=Api&P=0&h=220"
                  className="card-img-top"
                  alt={character.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text">ID: {character.uid}</p>
                </div>
                <div className="card-footer">
                  <Link to={`informe-card/people/${character.uid}`} className="btn btn-primary">
                    Más detalles
                  </Link>
                  <button
                    className={`btn ${store.favorites.some((fav) => fav.uid === character.uid && fav.type === "people")
                      ? "btn-danger"
                      : "btn-outline-warning"
                      }`}
                    onClick={() => toggleFavorite(character, "people")}
                  >
                    <i className={`fa-heart ${store.favorites.some((fav) => fav.uid === character.uid && fav.type === "people")
                        ? "fa-solid" : "fa-regular"}`}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      < StarShips />
      < Planets />
    </>
  );
};
