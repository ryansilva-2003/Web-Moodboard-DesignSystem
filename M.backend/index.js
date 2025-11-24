const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

//rota user
const userRoutes = require("./routes/userRoute");
app.use(userRoutes);
//rota board
const boardRoutes = require("./routes/boardRoute");
app.use(boardRoutes);
//rota image
const imageRoutes = require("./routes/imageRoute");
app.use(imageRoutes);
//rota auth
const authRoutes = require("./routes/authRoute");
app.use("/auth", authRoutes);
//rota protected
const protectedRoutes = require("./routes/protectedRoute");
app.use("/protected", protectedRoutes);


app.get("/", (req, res) => {
  return res.json({ message: "Backend Moodboard rodando!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FUNCIONANDO. Servidor rodando na porta ${PORT}`);
});


