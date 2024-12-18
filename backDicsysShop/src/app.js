import express from "express";
// import config from "./config.js";
import clientes from "./modulos/categorias/ruta.js";
import productos from "./modulos/productos/rutas.js";
import cors from 'cors';

const app = express();

 app.use(
   cors({
     origin: "http://localhost:4200",
   })
 );

app.use(express.json()); //para leer todos los json q edito en las rutas


app.set("port", 4000);



app.use("/api/categorias", clientes);

app.use("/api/productos", productos);

export default app;
