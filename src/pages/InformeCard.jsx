
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const InformeCard = () => {
  const { category, id } = useParams();
  const [data, setData] = useState("");
  console.log(`Type: ${category}, ID: ${id}`)

  useEffect(() => {
    // Hacer fetch para obtener los datos del personaje
    fetch(`https://www.swapi.tech/api/${category}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.result.properties);
      })
      .catch((error) => console.error(`Error al obtener datos de ${category}:`, error));
  }, [category, id]);

  if (!data) {
    return <p>Cargando información...</p>; // Mensaje de carga
  }

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ width: "30rem" }}>
        <img src="https://tse3.mm.bing.net/th/id/OIP.QxVlkYJa62KoIND_CVbZAQHaEK?pid=Api&P=0&h=220" className="card-img-top" alt={data.name} />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          {category === "people" && (
            <>
              <p className="card-text"><strong>Altura:</strong> {data.height} cm</p>
              <p className="card-text"><strong>Peso:</strong> {data.mass} kg</p>
              <p className="card-text"><strong>Color de ojos:</strong> {data.eye_color}</p>
              <p className="card-text"><strong>Color de piel:</strong> {data.skin_color}</p>
              <p className="card-text"><strong>Año de nacimiento:</strong> {data.birth_year}</p>
            </>
          )}
          {category === "planets" && (
            <>
              <p className="card-text"><strong>Clima:</strong> {data.climate}</p>
              <p className="card-text"><strong>Población:</strong> {data.population}</p>
              <p className="card-text"><strong>Terreno:</strong> {data.terrain}</p>
              <p className="card-text"><strong>Diámetro:</strong> {data.diameter} km</p>
            </>
          )}
          {category === "starships" && (
            <>
              <p className="card-text"><strong>Modelo:</strong> {data.model}</p>
              <p className="card-text"><strong>Fabricante:</strong> {data.manufacturer}</p>
              <p className="card-text"><strong>Capacidad de pasajeros:</strong> {data.passengers}</p>
              <p className="card-text"><strong>Velocidad máxima:</strong> {data.max_atmosphering_speed}</p>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default InformeCard;
