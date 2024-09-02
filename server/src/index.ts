import "dotenv/config";
import express from "express";
import { APIErrorHandler } from "./lib/utils";
import routes from "./routes";

const app = express();

const port = process.env.PORT || 3000;
// many host providers automatically sets this ENV variable based on deployed app url
const url = process.env.URL || "http://localhost";

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
