// [x] initialize express app
// [x] setup handlebars
// [x] setup static files
// [x] setup storage middleware
// [x] set main route handler (controller action)

const express = require('express');
//const database = require('./config/database');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const { init: storage } = require('./services/storage');

start();

async function start() {
    const port = 3000;
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    
    app.use(await storage());
    routesConfig(app);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}