const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('Middlewares/uploads'));

//rota user
const userRoutes = require("./routes/userRoute");
app.use(userRoutes);
//rota board
const boardRoutes = require("./routes/boardRoute");
app.use(boardRoutes);
//rota auth
const authRoutes = require("./routes/authRoute");
app.use("/auth", authRoutes);
//rota protected
const protectedRoutes = require("./routes/protectedRoute");
app.use("/protected", protectedRoutes);
//multer
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/", (req, res) => {
  return res.json({ message: "Backend Moodboard rodando!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FUNCIONANDO. Servidor rodando na porta ${PORT}`);
});


