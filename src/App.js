import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(false);
  const [loading, setLoading] = useState(false);
  const cities = ["paris", "new york", "tokyo", "seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // try-catch를 이용한 API 호출 에러 핸들링을 추가한 함수
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=36c7e8662756cdc79406a17b81f4940b&units=metric`;

    try {
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      // 에러가 발생하면 해당 도시의 날씨 정보를 null로 설정하여 에러를 핸들링합니다.
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // try-catch를 이용한 API 호출 에러 핸들링을 추가한 함수
  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c7e8662756cdc79406a17b81f4940b&units=metric`;

    try {
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      // 에러가 발생하면 해당 도시의 날씨 정보를 null로 설정하여 에러를 핸들링합니다.
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      getCurrentLocation();
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (!city) {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div className="container">
      {loading ? (
        <ClipLoader color="#f88c6b" loading={loading} size={150} />
      ) : (
        <div className="container">
          {/* WeatherBox 컴포넌트에 현재 날씨 정보를 전달합니다. */}
          <WeatherBox weather={weather} />
          {/* WeatherButton 컴포넌트에 도시 목록과 도시 변경 핸들러를 전달합니다. */}
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      )}
    </div>
  );
}

export default App;
