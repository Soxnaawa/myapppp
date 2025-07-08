const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const serverless = require('serverless-http'); // ✅ ajouté pour Vercel

dotenv.config();

const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Configuration moteur de template EJS avec layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // ✅ chemin adapté pour Vercel
app.set('layout', 'layout');

app.use(expressLayouts);

// Middleware statique et body parser
app.use(express.static(path.join(__dirname, '../public'))); // ✅ chemin adapté
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRoutes = require('../routes/index');
const meteoRoutes = require('../routes/meteoRoutes');

app.use('/', indexRoutes);
app.use('/meteo', meteoRoutes);

// Page 404
app.use((req, res) => {
  res.status(404).render('error', { message: "Page non trouvée" });
});

// ✅ Ne PAS utiliser app.listen avec Vercel
module.exports = app;
module.exports.handler = serverless(app);
