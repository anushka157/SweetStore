const connection = require("./config/db");

connection.query("SELECT 1", (err, result) => {
    if (err) {
        console.log("Database Error:", err);
    } else {
        console.log("Database Connected Successfully");
    }
});