const mongoose = require('mongoose');
const { userModel } = require('../models');


(async () => {

    try {

        console.log('chats updated');
    } catch (error) {
        console.error("Error updating chats:", error);
    }
})()