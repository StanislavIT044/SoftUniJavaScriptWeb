const User = require('../models/User');

async function createUser( username, hashedPassword) {
    const user = new User({
        username,
        hashedPassword
    });
    await user.save();

    return user;
}

async function getUserByUsername(username) {
    return await User.findOne({ username: { $regex: username, $options: 'i' } });
}

async function findUser() {

}

module.exports = {
    createUser,
    getUserByUsername
};