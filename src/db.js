const mysql = require("mysql");
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

// using knex
const db = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "password",
        database: "car_rental",
    },
});

module.exports = db;
