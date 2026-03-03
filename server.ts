import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("strength_forged.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT,
    role TEXT DEFAULT 'customer'
  );

  CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    rating REAL,
    location TEXT,
    image TEXT,
    description TEXT,
    price_range TEXT,
    is_online INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER,
    name TEXT,
    price REAL,
    image TEXT,
    stock INTEGER,
    FOREIGN KEY(business_id) REFERENCES businesses(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    business_id INTEGER,
    slot TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(business_id) REFERENCES businesses(id)
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER,
    content TEXT,
    image TEXT,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(business_id) REFERENCES businesses(id)
  );
`);

// Seed data if empty or outdated
const businessCount = db.prepare("SELECT COUNT(*) as count FROM businesses").get() as { count: number };
if (businessCount.count < 10) {
  console.log(`Seeding database... current count: ${businessCount.count}`);
  // Clear existing to avoid duplicates if partially seeded
  db.exec("DELETE FROM businesses");
  db.exec("DELETE FROM posts");
  db.exec("DELETE FROM bookings");
  
  const insertBusiness = db.prepare("INSERT INTO businesses (name, category, rating, location, image, description, price_range, is_online) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertBusiness.run("Elite Fitness Hub", "Gym", 4.8, "Downtown", "https://picsum.photos/seed/gym1/800/600", "Premium gym with modern equipment and expert trainers.", "$$", 0);
  insertBusiness.run("Zen Yoga Studio", "Yoga", 4.9, "Uptown", "https://picsum.photos/seed/yoga1/800/600", "Peaceful yoga sessions for all levels, from Hatha to Vinyasa.", "$", 0);
  insertBusiness.run("Coach Sarah", "Personal Trainer", 5.0, "Remote", "https://picsum.photos/seed/coach1/800/600", "Expert in strength and conditioning with 10+ years experience.", "$$$", 1);
  insertBusiness.run("Healthy Bites", "Food", 4.7, "City Center", "https://picsum.photos/seed/food1/800/600", "Daily healthy meal subscriptions tailored to your macros.", "$$", 1);
  insertBusiness.run("Iron Forge Gym", "Gym", 4.6, "Industrial Area", "https://picsum.photos/seed/gym2/800/600", "Hardcore bodybuilding and powerlifting facility.", "$$", 0);
  insertBusiness.run("Serenity Spa & Yoga", "Yoga", 4.8, "Beachside", "https://picsum.photos/seed/yoga2/800/600", "Luxury yoga and wellness retreat by the ocean.", "$$$", 0);
  insertBusiness.run("Coach Juan", "Personal Trainer", 4.9, "Manila", "https://picsum.photos/seed/pinoy1/800/600", "Strength and conditioning specialist focusing on powerlifting.", "$$", 0);
  insertBusiness.run("Coach Marco", "Personal Trainer", 4.8, "Quezon City", "https://picsum.photos/seed/pinoy2/800/600", "HIIT and weight loss expert with a passion for transformation.", "$$", 0);
  insertBusiness.run("Coach Paolo", "Personal Trainer", 5.0, "Makati", "https://picsum.photos/seed/pinoy3/800/600", "Bodybuilding professional and nutrition consultant.", "$$$", 0);
  insertBusiness.run("Coach Rafael", "Personal Trainer", 4.7, "Taguig", "https://picsum.photos/seed/pinoy4/800/600", "Functional fitness and mobility specialist.", "$$", 0);
  insertBusiness.run("Coach Angelo", "Personal Trainer", 4.9, "Pasig", "https://picsum.photos/seed/pinoy5/800/600", "Boxing and martial arts conditioning coach.", "$$", 0);
  insertBusiness.run("The Salad Bar", "Food", 4.5, "Mall Plaza", "https://picsum.photos/seed/food2/800/600", "Fresh, organic salads and cold-pressed juices.", "$", 0);
  insertBusiness.run("Muscle Factory", "Gym", 4.7, "South District", "https://picsum.photos/seed/gym3/800/600", "24/7 access with state-of-the-art cardio and weights.", "$$", 0);

  const insertPost = db.prepare("INSERT INTO posts (business_id, content, image) VALUES (?, ?, ?)");
  insertPost.run(1, "New HIIT classes starting this Monday! Book your slot now.", "https://picsum.photos/seed/post1/800/600");
  insertPost.run(2, "Morning meditation sessions are back. Find your inner peace.", "https://picsum.photos/seed/post2/800/600");
  console.log("Database seeded successfully.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/businesses", (req, res) => {
    const businesses = db.prepare("SELECT * FROM businesses").all();
    res.json(businesses);
  });

  app.get("/api/feed", (req, res) => {
    const posts = db.prepare(`
      SELECT posts.*, businesses.name as business_name, businesses.image as business_logo 
      FROM posts 
      JOIN businesses ON posts.business_id = businesses.id
      ORDER BY created_at DESC
    `).all();
    res.json(posts);
  });

  app.post("/api/bookings", (req, res) => {
    const { user_id, business_id, slot } = req.body;
    const info = db.prepare("INSERT INTO bookings (user_id, business_id, slot) VALUES (?, ?, ?)").run(user_id, business_id, slot);
    res.json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
