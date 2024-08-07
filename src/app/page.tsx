"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

function getCurrentDate(){
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US");
  const date = new Date().getDate() + ", " + monthName;
  return date;
}

export default function Home() {

  const date = getCurrentDate();
  const [weatherData, setweatherData] = useState<any>(null);
  const [city, setcity] = useState("lahore");

  async function fecthData(cityName: string) {
    try{
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setweatherData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData = (await response.json()).data;
      setweatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

 return (
    <main className={styles.man}> 
    <div className={styles.title}>
      <h1 className={styles.h1}>Weather IA</h1>
    </div>
     <article className={styles.widget}>
      <form onSubmit={(e) => {
       e.preventDefault();
       fecthData(city);
       }}
       className={styles.weatherLocation}>
        <input 
          className={styles.input_field}
          placeholder="Enter city name"
          type="text"
          id="cityName"
          name="cityName"
          onChange={(e) => setcity(e.target.value)}
        />
        <button className={styles.search_button} type="submit">
          Search
        </button>
      </form>
     {weatherData && weatherData.weather && weatherData.weather[0] ? (
        <>
        <div className={styles.icon_and_weatherInfo}>
          <div className={styles.weatherIcon}>
          {weatherData?.weather[0]?.description === "rain" ||
                weatherData?.weather[0]?.description === "fog" ? (
                  <i
                    className={`wi wi-day-${weatherData?.weather[0]?.description}`}
                  ></i>
                ) : (
            <i className="wi wi-day-cloudy"></i>
                )}
          </div>
        </div>
           
        <div className={styles.weatherInfo}>
          <div className={styles.temperature}>
            <span>
            {(weatherData?.main?.temp - 273.5).toFixed(2) +
              String.fromCharCode(176)}
            </span>
          </div>
            <div className={styles.weatherCondition}>
              {weatherData?.weather[0]?.description?.toUpperCase()}
            </div>
        </div>
          <div className={styles.place}>{weatherData?.name}</div>
          <div className={styles.date}>{date}</div>

        </>

      ):(
        <div className={styles.place}>Loading...</div>
      )}

     </article>
    </main>
  );
}

