import chalk from "chalk";

class CustomConsole {
    agent(message: string) {
        console.log(chalk.blue("Agent:"), message);
    }
}
const inform = new CustomConsole();

export default inform;