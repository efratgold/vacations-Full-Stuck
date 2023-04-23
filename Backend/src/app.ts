import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import vacationsRoutes from "./6-routes/vacations-routes"
import authRoute from "./6-routes/auth-routes"
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", vacationsRoutes);
server.use("/api", authRoute);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
