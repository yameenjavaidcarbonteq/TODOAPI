import app from "../http/bootstrap/app";
import { application } from "@config";
import { logger } from "@logger";

app.listen(application.port, () => {
  logger.log(`info`,`Server is up and running on port number ${application.port}`);
});