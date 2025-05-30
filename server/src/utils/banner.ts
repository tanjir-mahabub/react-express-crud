import os from 'os';
import fs from 'fs';
import path from 'path';
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

const bannerFlagFile = path.resolve(__dirname, '.banner_printed');

export async function printServerBanner(port: number) {
    if (fs.existsSync(bannerFlagFile)) {
        return;
    }

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

    fs.writeFileSync(bannerFlagFile, 'printed');

    // Register cleanup handlers once
    setupCleanup();
}

function removeBannerFlagFile() {
    try {
        if (fs.existsSync(bannerFlagFile)) {
            fs.unlinkSync(bannerFlagFile);
            console.log('Banner flag file removed.');
        }
    } catch (err) {
        console.error('Failed to remove banner flag file:', err);
    }
}

export function setupCleanup() {
    // To avoid registering multiple listeners on repeated calls
    if (setupCleanup.hasRun) return;
    setupCleanup.hasRun = true;

    process.on('exit', () => {
        removeBannerFlagFile();
    });
    process.on('SIGINT', () => {
        removeBannerFlagFile();
        process.exit();
    });
    process.on('SIGTERM', () => {
        removeBannerFlagFile();
        process.exit();
    });
}
// Track whether setupCleanup was called to prevent multiple listener registrations
setupCleanup.hasRun = false;
