import axios from "axios";
import { API_KEY } from "@/constants";
import { WeatherType } from "../types/weather.d";

const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeatherForecast = async (cityName: string, days = 7): Promise<WeatherType> => {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${cityName}&days=${days}&aqi=no&alerts=no`;
  const response = await axios.get(url);
  return response.data;
};
