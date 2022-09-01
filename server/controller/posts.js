import express from "express";
import db from "../database/connect.js";
import Joi from "joi";
import { auth } from "../middleware/auth.js";
import { postValidator } from "../middleware/validate.js";
import upload from "../middleware/multer.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  const options = {};
  if (req.query.order) options.order = [(options.order = ["title", "DESC"])];

  try {
    const posts = await db.Posts.findAll(options);
    res.json(posts);
  } catch {
    //Pirmas variantas grąžinti tik statusą
    //res.status(500).end()

    //Antras variantas grąžinti tik statusą
    //res.sendStatus(500)

    res.status(500).send({ message: "Įvyko serverio klaida" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).send({ message: "Įvyko serverio klaida" });
  }
});
//naujas irasas
router.post(
  "/",
  upload.single("image"),
  auth,
  postValidator,
  async (req, res) => {
    try {
      if (req.file) {
        req.body.image = "/uploads/" + req.file.filename;
      }
      new db.Posts(req.body).save();
      res.json({ message: "Įrašas sėkmingai sukurtas" });
    } catch (error) {
      res.status(500).send({ message: "Įvyko serverio klaida" });
    }
  }
);

router.post(
  "/edit/:id",
  auth,
  upload.single("image"),
  postValidator,
  async (req, res) => {
    try {
      const post = await db.Posts.findByPk(req.params.id);
      if (req.file) {
        req.body.image = "/uploads/" + req.file.filename;
      }
      post.update(req.body);
      res.json({ message: "Įrašas sėkmingai atnaujintas" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Įvyko serverio klaidaaaaaa" });
    }
  }
);

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    post.destroy();
    res.json({ message: "Įrašas sėkmingai ištrintas" });
  } catch (error) {
    res.status(500).send({ message: "Įvyko serverio klaida" });
  }
});

//paieska
router.get("/search/:keyword", async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.params.keyword + "%",
        },
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(200).send({ message: "Įvyko serverio klaida" });
  }
});

//CRUD - Create, Read, Update, Delete
//       POST    GET    PUT    DELETE

export default router;
