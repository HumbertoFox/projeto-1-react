import express from "express";
import dotenv from "dotenv";
import loginRouters from "./api/login.router.js";
import eventsdayRouters from "./api/eventsday.router.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", loginRouters);
app.use("/api", eventsdayRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});