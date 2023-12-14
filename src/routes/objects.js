import express from "express";
import {
  ADD_OBJECT,
  GET_OBJECTS,
  GET_OBJECT_BY_ID,
  GET_RANDOM_OBJECT,
  UPDATE_OBJECT,
  DELETE_OBJECT,
} from "../controllers/objects.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/objects", auth, ADD_OBJECT);
router.get("/objects", auth, GET_OBJECTS);
router.get("/objects/random", GET_RANDOM_OBJECT);
router.get("/objects/:id", GET_OBJECT_BY_ID);
router.put("/objects/:id", auth, UPDATE_OBJECT);
router.delete("/objects/:id", auth, DELETE_OBJECT);

export default router;
