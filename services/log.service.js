import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(`Error ${error}`));
}

const printSuccess = (message) => {
	console.log(chalk.bgGreen(`SUCCESS ${message}`));
}

const printHelp = () => {
	console.log(
		dedent`${chalk.bgBlue('HELP')}
		Without parameters - weather output
		-c [CITY] establish a city
		-h provide help
		-t [API_KEY] save token
		`)
}

export {printError, printSuccess, printHelp}