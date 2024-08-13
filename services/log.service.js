import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
	console.log(chalk.bgRed(`Error ${error}`));
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(`SUCCESS ${message}`));
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgBlue("HELP")}
		Without parameters - weather output
		-l [COORDINATES] establish a coordinates
		-h provide help
		-t [API_KEY] save token
		`
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgBlueBright("WEATHER")} Weather in the ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp}
		Feel like: ${res.main.feels_like}
		Humidity: ${res.main.humidity}%
		Speed wind: ${res.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };
