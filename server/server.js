import express from "express";
import dotenv from "dotenv";
import loginRouters from "../src/services/api/login.router.js"
import eventsdayRouters from "../src/services/api/eventsday.router.js";
const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(express.json());

app.use("/api", loginRouters);
app.use("/api", eventsdayRouters);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});