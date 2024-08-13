#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import {
	printHelp,
	printSuccess,
	printError,
	printWeather,
} from "./services/log.service.js";
import {
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY,
} from "./services/storage.service.js";

const saveToken = async (token) => {
	if (!token.length) {
		printError("Missing token");
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess("Token saved successfully");
	} catch (error) {
		printError(error.message);
	}
};

const saveCoordinates = async (lat, lon) => {
	console.log(lat, lon);
	if (!lat.length || !lon.length) {
		printError("Missing coordinates");
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.lat, lat);
		await saveKeyValue(TOKEN_DICTIONARY.lon, lon);
		printSuccess("Coordinates saved successfully");
	} catch (error) {
		printError(error.message);
	}
};

const getForecast = async () => {
	try {
		const lat = await getKeyValue(TOKEN_DICTIONARY.lat);
		const lon = await getKeyValue(TOKEN_DICTIONARY.lon);
		const weather = await getWeather(lat, lon);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (error) {
		if (
			error?.response?.status === 404 ||
			error?.response?.status === 400
		) {
			printError("Invalid coordinates");
		} else if (error?.response?.status === 401) {
			printError("Invalid token");
		} else {
			printError(error.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.lat && args.lon) {
		return saveCoordinates(args.lat, args.lon);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForecast();
};

initCLI();
