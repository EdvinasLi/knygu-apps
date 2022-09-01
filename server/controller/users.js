import express from "express";
import bcrypt from "bcrypt";
import db from "../database/connect.js";
import { registerValidator } from "../middleware/validate.js";
const router = express.Router();
import { loginValidator } from "../middleware/validate.js";

const saltRounds = 10;

router.post("/register", registerValidator, async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      res.status(401).send("User already exists");
      return;
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await db.Users.create(req.body);
    res.json({ message: "Vartotojas sėkmingai sukurtas" });
  } catch {
    res.status(400).json({ message: "Registracija nepavyko" });
  }
});

router.post("/login", loginValidator, async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.status(401).send("User not found");

    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.loggedIn = true;
      res.send("prisijungimas sekmingas");
    } else {
      res.status(401).send("Nepavyko prisijungti");
    }
  } catch (err) {
    console.log(err);
    res.status(418).send("ivyko klaida");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Jus sekmingai atsijungete");
});

export default router;
