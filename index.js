const express = require('express');
const spaceTypeRouter = require('./routers/spaceType.router');
const faultTypeRouter = require('./routers/faultType.router');
const logger = require('morgan');
const app = express();
const port = 3000;


app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/space-types', spaceTypeRouter);
app.use('/fault-types', faultTypeRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});