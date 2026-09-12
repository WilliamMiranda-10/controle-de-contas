import * as z from "zod";

export const createAccountSchema = z.object({
  description: z
    .string()
    .min(3, "A descrição deve ter pelo menos 3 caracteres."),
  amount: z.number().positive("O valor deve ser maior que 0."),
  totalInstallments: z
    .number()
    .int()
    .positive("A quantidade de parcelas deve ser maior que 0."),
  currentInstallment: z
    .number()
    .int()
    .nonnegative("A parcela atual deve ser maior que 0."),
  dueDate: z.string("A data de vencimento é obrigatória."),
  paid: z.boolean("O campo pago deve ser verdadeiro ou falso."),
});

export const updateAccountSchema = createAccountSchema.partial();
// trasnforma todas as restrições do createAccountSchema em opcional
// porem se passar os valores tera que seguir as regras do createAccountSchema.

export type CreateAccount = z.infer<typeof createAccountSchema>;

export type UpdateAccount = z.infer<typeof updateAccountSchema>;
