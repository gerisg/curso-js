const fs = require('fs');
const chalk = require('chalk');

const CONFIG_FILE = __dirname + '/config.json';

const COLORS = {
    'black': chalk.black,
    'red': chalk.red,
    'green': chalk.green,
    'yellow': chalk.yellow,
    'blue': chalk.blue,
    'magenta': chalk.magenta,
    'cyan': chalk.cyan,
    'white': chalk.white,
    'gray': chalk.gray,
    'grey': chalk.grey,
    'blackBright': chalk.blackBright,
    'redBright': chalk.redBright,
    'greenBright': chalk.greenBright,
    'yellowBright': chalk.yellowBright,
    'blueBright': chalk.blueBright,
    'magentaBright': chalk.magentaBright,
    'cyanBright': chalk.cyanBright,
    'whiteBright': chalk.whiteBright
};

const DEFAULT = {
    filename: './tareas.json',
    state_colors: { 
        'pendiente': 'red', 
        'en progreso': 'blueBright',
        'terminada': 'green'
    }
};

function buildStateColors(sc) {
    let stateColors = {};
    for (const key in sc) {
        if (sc.hasOwnProperty(key)) {
            const element = sc[key];
            stateColors[key] = COLORS[element];
        }
    }
    return stateColors;
}

function read() {
    if (!fs.existsSync(CONFIG_FILE)) {
        let config = {};
        config.filename = DEFAULT.filename;
        config.state_colors = buildStateColors(DEFAULT.state_colors);
        console.log('Default config Loaded');
        return config;
    }
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    config.state_colors = buildStateColors(config.state_colors);
    return config;
}

function write(config) {
    let stringConfig = JSON.stringify(config, null, ' ');
    fs.writeFileSync(CONFIG_FILE, stringConfig);
    console.log('Custom config saved');
}

module.exports = { read, write };