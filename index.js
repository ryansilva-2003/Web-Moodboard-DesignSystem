const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

//rota user
const userRoutes = require("./routers/userRoute");
app.use(userRoutes);
//rota board
const boardRoutes = require("./routers/boardRoute");
app.use(boardRoutes);
//rota image
const imageRoutes = require("./routers/imageRoute");
app.use(imageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend Moodboard rodando!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FUNCIONANDO. Servidor rodando na porta ${PORT}`);
});


