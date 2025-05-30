import app from './app';
import config from './config';
import { printServerBanner, setupCleanup } from './utils/banner';

const host = '0.0.0.0';
const port = config.port;

const isDev = process.env.NODE_ENV !== 'production';
const isInitialBoot = !module.parent;

app.listen(port, host, async () => {

    if (isDev && isInitialBoot) {
        await printServerBanner(port);
    }
});

setupCleanup();