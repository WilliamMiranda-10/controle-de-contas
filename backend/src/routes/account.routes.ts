import { Router } from "express";
import {
  findAll,
  create,
  findById,
  update,
} from "../controllers/account.controller.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", create);
router.patch("/:id", update);

export default router;
