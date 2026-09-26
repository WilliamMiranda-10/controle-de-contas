import { Router } from "express";
import {
  findAll,
  create,
  findById,
  update,
  deleteAccount,
} from "../controllers/account.controller.js";
import {
  accountIdSchema,
  createAccountSchema,
  updateAccountSchema,
} from "../schemas/account.schema.js";
import { validate } from "../middlewares/validateMiddleware.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", validate(accountIdSchema, "params"), findById);
router.post("/", validate(createAccountSchema, "body"), create);
router.patch(
  "/:id",
  validate(accountIdSchema, "params"),
  validate(updateAccountSchema, "body"),
  update
);
router.delete("/:id", validate(accountIdSchema, "params"), deleteAccount);

export default router;
