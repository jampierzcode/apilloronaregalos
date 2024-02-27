// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

// Ruta para leer los datos del archivo JSON
app.get("/api/datos", (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "datos.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos" });
  }
});
// Ruta para leer los datos del archivo JSON
app.get("/api/datos/:codigo", (req, res) => {
  try {
    const codigo = req.params.codigo;
    const filePath = path.resolve(__dirname, "datos.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const registro = data.regalos.find((reg) => reg.codigoUnico === codigo);
    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ msg: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos" });
  }
});

// Ruta para sobreescribir el archivo JSON
app.post("/api/datos", (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "datos.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!data.regalos) {
      data.regalos = [];
    }
    data.regalos.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "No se actualizaron los datos correctamente" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
