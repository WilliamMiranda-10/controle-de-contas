import { Router } from "express";
import {
  findAll,
  create,
  findById,
  update,
  deleteAccount,
} from "../controllers/account.controller.js";
import { createAccountSchema, updateAccountSchema } from "../schemas/account.schema.js";
import { validate } from "../middlewares/validateMiddleware.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", validate(createAccountSchema), create);
router.patch("/:id", validate(updateAccountSchema), update);
router.delete("/:id", deleteAccount);

export default router;
