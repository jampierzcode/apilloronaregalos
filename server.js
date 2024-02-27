// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

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
    const data = JSON.parse(fs.readFileSync("datos.json", "utf8"));
    const registro = data.regalos.find((reg) => reg.codigoUnico === codigo);
    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al leer los datos" });
  }
});

// Ruta para sobreescribir el archivo JSON
app.put("/api/datos", (req, res) => {
  try {
    fs.writeFileSync("datos.json", JSON.stringify(req.body));
    res.json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
