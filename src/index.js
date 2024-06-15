import colors from 'colors';
import app from './app.js';

const port = process.env.PORT || 3000;
const host = 'localhost';
app.listen(port, host, () => {
    console.warn(`Server ON - http://${host}:${port}/api`.green.bold);
});
