/** @format */
import { useState } from "react";

export const WheatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d4f8326e0b2a981c826008c35df01b77";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const respuesta = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await respuesta.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ocurrio el siguiente error", error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div className="glass-card">
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)}°C</p>
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
