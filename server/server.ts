import { config } from "dotenv";
config();

import fastify from "fastify";

const app = fastify();

console.log("hi");

app.listen({ port: parseInt(process.env.PORT!) });
