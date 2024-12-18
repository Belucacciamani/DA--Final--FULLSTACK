import app from "./app.js";

/* app.listen(): método propio de Express.js para iniciar el servidor HTTP. 
Dentro de los paréntesis, se especifican los parámetros de configuración del servidor. */
app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en el puerto", app.get("port"));
});
