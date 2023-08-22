const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const { transporter } = require("./modules/mailer.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());

app.post("/contacto", async (req, res) => {
  const formattedContent = Object.entries(req.body)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  console.log("Datos del formulario:", JSON.stringify(req.body, null, 2));
  try {
    await transporter.sendMail({
      from: "ocean.viewjob2023@gmail.com",
      to: "julian.pinzon@alertandote.com",
      subject: "Nuevo mensaje del formulario de contacto",
      text: formattedContent,
    });
    res.send("Mensaje enviado correctamente");
    console.log("Mensaje enviado correctamente");
  } catch (error) {
    console.log("Error al enviar el correo" + error);
    res.send("Hubo un error al enviar el mensaje");
  }
});

app.listen(port, () => {
  console.clear();
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

module.exports = app;
