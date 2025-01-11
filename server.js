import dotenv from "dotenv";
import app from "./app.js";
import db from "./db/connectDB.js";

dotenv.config({
  path: ".env",
});

// connect to db
db();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});