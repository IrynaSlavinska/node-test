// console.log("I am index.js. glad to see you");

const users = require("./users");
console.log("users: ", users);

const { admins } = require("./users");
console.log("admins: ", admins);

const { clients } = require("./users");
console.log("clients: ", clients);
