import os from 'os';
import chalk from 'chalk';

function getLocalNetworkAddress(): string {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

export async function printServerBanner(port: number) {
    const figlet = (await import('figlet')).default;
    const boxen = (await import('boxen')).default;

    const localURL = `http://localhost:${port}`;
    const networkURL = `http://${getLocalNetworkAddress()}:${port}`;

    const title = figlet.textSync('Express Ready', {
        horizontalLayout: 'default',
        font: 'Standard',
    });

    const msg =
        chalk.green.bold('Server running on:\n') +
        chalk.cyan(`➜  Local:   ${localURL}\n`) +
        chalk.cyan(`➜  Network: ${networkURL}`);

    const box = boxen(msg, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
    });

    console.clear();
    console.log(chalk.blue(title));
    console.log(box);
}
