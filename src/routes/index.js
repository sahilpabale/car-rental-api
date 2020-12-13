const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.send("Car Rental API Entrance");
});

// defining the route handlers

// 1. get all car details
const GetAllCars = async (req, res) => {
    try {
        let query = `SELECT * FROM cars;`;
        let result = await db.raw(query);
        res.status(200).json({
            status: "success",
            data: result[0],
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Failed to access the data.",
        });
    }
};

// 2. get the car details by id
const GetCarById = async (req, res) => {
    try {
        let query = `SELECT * FROM cars WHERE id='${req.params.id}'`;
        let result = await db.raw(query);
        res.status(200).json({
            status: "success",
            data: result[0],
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Failed to access the data.",
        });
    }
};

// 3. Create an account
const SignUp = async (req, res) => {
    try {
        let { full_name, email_id, password } = req.body;
        password = await bcrypt.hash(password, 10);

        let emailExistsQuery = `SELECT EXISTS(SELECT * from users WHERE email_id='${email_id}') AS 'check';`;

        let emailExists = await db.raw(emailExistsQuery);

        if (!emailExists[0][0].check) {
            let query = `INSERT INTO users (full_name, email_id, password) VALUES ('${full_name}','${email_id}','${password}')`;

            let result = await db.raw(query);

            res.status(200).json({
                status: "success",
                message: "Account created successfully.",
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "Email Id already exists!",
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Failed to Sign-Up!",
        });
    }
};

// 4. Sign In user
const SignIn = async (req, res) => {
    try {
        let { email_id, password } = req.body;

        res.status(200).json({
            status: "success",
            data: result[0],
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "Failed to authenticate!",
        });
    }
};

// Get All Cars
router.get("/cars", GetAllCars);
router.get("/cars/:id", GetCarById);

router.post("/signup", SignUp);
router.post("/signin", SignIn);

module.exports = router;
