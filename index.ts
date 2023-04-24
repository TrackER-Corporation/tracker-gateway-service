import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './db/services/database.service';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const routes = new Map<string, any>()
routes.set("users", process.env.USER_SERVICE)
routes.set("buildings", process.env.BUILDINGS_SERVICE)
routes.set("bills", process.env.BILLS_SERVICE)
routes.set("renewable", process.env.RENEWABLE_SERVICE)
routes.set("organization", process.env.ORGANIZATION_SERVICE)
routes.set("activity", process.env.ACTIVITY_SERVICE)
routes.set("preference", process.env.PREFERENCE_SERVICE)

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

routes.forEach((service_port: any, route: string) => {
  console.log(`/api/${route}`, `http://localhost:${service_port}`)
  app.use(
    `/api/${route}`,
    createProxyMiddleware({
      target: `http://localhost:${service_port}`,
      changeOrigin: true,
    })
  );


})

connectToDatabase()
app.listen(port, () => console.info(`tracker-gateway is running`));

export default app