import express from "express";
import cors from "cors";
import posts from "./controller/posts.js";
import users from "./controller/users.js";
import session from "express-session";

const app = express();

//CORS blokavimo nuėmimas
app.use(cors());

//Duomenų priėmimui JSON formatu
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({ extended: true }));
//priskiriamas session

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000000 },
  })
);

//Priskiriame posts kontrolerį
app.use("/api/posts/", posts);
app.use("/api/users/", users);

//Paleidžiame serverį
app.listen(3000);
