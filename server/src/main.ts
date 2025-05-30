import app from './app';
import config from './config';
import { printServerBanner } from './utils/banner';

const host = '0.0.0.0';
const port = config.port;

app.listen(port, host, async () => {
    await printServerBanner(port);
});
