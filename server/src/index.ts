import express from "express";
import { APIErrorHandler } from "./error-handler";
import routes from "./routes";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use("/", routes);

// Error handler
app.use(APIErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
