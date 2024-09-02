import "dotenv/config";
import express from "express";
import { APIErrorHandler } from "./error-handler";
import routes from "./routes";

const app = express();

const port = process.env.PORT || 3000;
// many host providers automatically sets this ENV variable based on deployed app url
const url = process.env.URL || "http://localhost";

app.use(express.json());

// API routes
app.use("/", routes);

// Error handler
app.use(APIErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}...`);
});
