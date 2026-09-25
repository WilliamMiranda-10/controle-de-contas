import { Router } from "express";
import {
  findAll,
  create,
  findById,
  update,
  deleteAccount,
} from "../controllers/account.controller.js";
import {
  createAccountSchema,
  updateAccountSchema,
} from "../schemas/account.schema.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { accountIdSchema } from "../schemas/account.schema.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", validate(accountIdSchema, "params"), findById);
router.post("/", validate(createAccountSchema, "body"), create);
router.patch("/:id", validate(updateAccountSchema, "params"), update);
router.delete("/:id", deleteAccount);

export default router;
