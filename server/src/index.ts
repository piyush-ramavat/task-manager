import "dotenv/config";
import express from "express";
import { APIErrorHandler } from "./lib/utils";
import routes from "./routes";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;
// many host providers automatically sets this ENV variable based on deployed app url
const url = process.env.URL || "http://localhost";

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Routes
app.use("/", routes);

// Error handler
app.use(APIErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}...`);
});
