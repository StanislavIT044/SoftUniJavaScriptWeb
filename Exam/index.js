const express = require('express');

const { PORT } = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfing = require('./config/routes');

//const authMiddleware = require('./middlewares/auth');
//const userService = require('./services/user');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfing(app);

    app.listen(PORT, () => {
        // testAuth();
        console.log(`Application started at http://localhost:${PORT}`)
    });
}

// async function testAuth() {
//     const reqMock = {};
//     const resMock = {
//         cookie() {
//             console.log('Set cookie', arguments)
//         }
//     };
//     const nextMock = () => {};

//     try{
//         const auth = authMiddleware();
//         auth(reqMock, resMock, nextMock);
//         await reqMock.auth.login('peter', '123123');

//         // const result = await userService.createUser('Peter', '123123');
//         // console.log(result);

//         // const user =  await userService.getUserByEmail('peter');
//         // console.log(user);

//     } catch (err){
//         console.log('Error:', err.message);
//     }
// }