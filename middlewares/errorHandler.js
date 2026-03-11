import mongoose from "mongoose"

const errorHandler = (err, req, res, next) => {
    // 1. Set default values in case it's not a Mongoose error
    let message = err.message || "Internal Server Error";
    let status = err.status || 500;

    if (err.code === 11000) {
        message = "Email already exists. Please use a different email.";
        status = 400;
    }
    
    // 2. Handle Mongoose Validation Errors
    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map(val => val.message);
        status = 400;
    }

    // 3. Handle Mongoose Bad ID (CastError)
    if (err.name === "CastError") {
        message = "Resource not found (Invalid ID format)";
        status = 404;
    }

    // 4. Log the error for you (the developer) to see in terminal
    console.error("Error Log:", err);

    // 5. Send the response
    res.status(status).json({
        success: false,
        message: message
    });
}
export default errorHandler;