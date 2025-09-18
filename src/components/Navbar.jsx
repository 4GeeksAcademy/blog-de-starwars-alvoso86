
import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (uid, type) => {
    dispatch({ type: "remove_from_favorites", payload: { uid, type } });
  };
  console.log("Favoritos actuales:", store.favorites);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand">
        <img src="https://tse4.mm.bing.net/th/id/OIP.q0YmndVpdNqa8dz1mfD-fQHaHa?pid=Api&P=0&h=220" alt="Star Wars Logo" width="40" height="40" />
      </Link>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="favoritesDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favoritos <span className="badge bg-warning">{store.favorites.length}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
          {store.favorites.length > 0 ? (
            store.favorites.map((fav) => (
              <li key={fav.uid} className="d-flex justify-content-between align-items-center px-3">
                <span>{fav.name}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFavorite( fav.uid, fav.type )}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            ))
          ) : (
            <li>
              <span className="dropdown-item text-muted">No hay favoritos</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
