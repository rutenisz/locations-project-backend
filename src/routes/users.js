import express from "express";
import { SIGN_UP, LOGIN } from "../controllers/users.js";

const router = express.Router();

router.post("/users", SIGN_UP);
router.post("/users/login", LOGIN); // naudojame posta nes Get metodas neturi bodzio, todel per ji negalima siusti duomenu

export default router;
