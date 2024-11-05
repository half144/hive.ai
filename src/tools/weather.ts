import { Tool } from "../models";
import { getParams, typ } from "../typeUtils";

// Define the parameters expected for the weather tool
const WeatherParams = {
  city: typ.string, // The name of the city to get the weather for
};

// Create the WeatherTool instance
const WeatherTool = new Tool({
  description: "Fetches the current weather for a specified city using the MetaWeather API.",
  name: "WeatherTool",
  executerParams: getParams(WeatherParams),
  executer: async ({ city }) => {
    try {
      // First, get the location ID for the city
      const result = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=4ae9be7e0ff7408493d181328220606&q=${city}&days=1&aqi=no&alerts=no`
      ).then((res) => res.json());
      
      return result.current; // Returning the weather data
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Unable to fetch weather data. Please check the city name.");
    }
  },
});

// Export the WeatherTool for use in other parts of your application
export { WeatherTool };
