import { Router } from "express";
import {
  findAll,
  create,
  findById,
  update,
  deleteAccount,
} from "../controllers/account.controller.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", deleteAccount);

export default router;
