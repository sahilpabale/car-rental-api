const mysql = require("mysql");
const host = process.env.LOCAL_DB_HOST;
const user = process.env.LOCAL_DB_USER;
const password = process.env.LOCAL_DB_PASSWORD;
const database = process.env.LOCAL_DB;

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
