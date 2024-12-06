// server.js
const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Vérification et création du dossier "uploads" s'il n'existe pas
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Dossier "uploads" créé avec succès');
} else {
  console.log('Le dossier "uploads" existe déjà');
}

async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log("Table 'users' vérifiée ou créée avec succès.");
  } catch (err) {
    console.error("Erreur lors de la création de la table 'users':", err);
  }
}

createUsersTable();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

app.use(express.json());

app.use(cors());

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Token manquant." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide." });
    }
    req.user = user;
    next();
  });
}

app.post("/api/register", async (req, res) => {
  const { name, email, password, password2, role } = req.body;

  if (!name || !email || !password || !password2) {
    return res.status(400).json({
      error: "S'il vous plaît saisissez toutes les informations",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: "Le mot de passe doit contenir au moins 6 caractères",
    });
  }

  if (password !== password2) {
    return res.status(400).json({
      error: "Les mots de passe ne correspondent pas",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Email déjà enregistré" });
    }

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "Utilisateur enregistré avec succès",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Saisissez l'email et le mot de passe" });
  }

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const payload = { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, role: user.rows[0].role };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });

    res.status(200).json({
      message: "Connexion réussie",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); 
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Seules les images sont autorisées !"));
    },
  });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier n'a été téléchargé" });
  }
  res.status(200).json({
    message: "Image téléchargée avec succès",
    file: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    },
  });
});

app.get("/api/uploads", (req, res) => {
  const fs = require("fs");
  const directoryPath = path.join(__dirname, "uploads");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Impossible de lire le dossier" });
    }
    const images = files.map((file) => ({
      filename: file,
      url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
    }));
    res.status(200).json(images);
  });
});


app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Bienvenue au dashboard",
    user: req.user,
  });
});

app.get("/api/users", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query(`SELECT id, name, email, role FROM users`);

    if (users.rows.length === 0) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé" });
    }

    res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès",
      users: users.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/api/uploads/filter", (req, res) => {
  const fs = require("fs");
  const directoryPath = path.join(__dirname, "uploads");

  const { type, date, name } = req.query;

  try {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Impossible de lire le dossier" });
      }

      let filteredFiles = files;

      if (type) {
        const validTypes = type.split(",").map((t) => t.trim().toLowerCase());
        filteredFiles = filteredFiles.filter((file) =>
          validTypes.includes(path.extname(file).toLowerCase().slice(1))
        );
      }

      if (date) {
        const filterDate = new Date(date);
        filteredFiles = filteredFiles.filter((file) => {
          const filePath = path.join(directoryPath, file);
          const stats = fs.statSync(filePath);
          return stats.mtime > filterDate;
        });
      }

      if (name) {
        const keyword = name.toLowerCase();
        filteredFiles = filteredFiles.filter((file) =>
          file.toLowerCase().includes(keyword)
        );
      }

      const filteredResults = filteredFiles.map((file) => ({
        filename: file,
        url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
      }));

      res.status(200).json(filteredResults);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
