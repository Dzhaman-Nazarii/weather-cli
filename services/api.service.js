import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getWeather = async (latitude, longitude) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error("Missing API-KEY");
	}
	const { data } = await axios.get(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			params: {
				lat: latitude,
				lon: longitude,
				units: "metric",
				appid: token,
			},
		}
	);
	console.log(data)
};

export { getWeather };
