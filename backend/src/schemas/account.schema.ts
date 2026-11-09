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
    .nonnegative("A parcela atual não pode ser negativa"),
  dueDate: z.iso.date("A data de vencimento é obrigatória."),
  paid: z.boolean("O campo pago deve ser verdadeiro ou falso."),
});

export const accountIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/, "O ID deve ser um número inteiro maior que 0."),
});

export const updateAccountSchema = createAccountSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualizar",
  });

export type CreateAccount = z.infer<typeof createAccountSchema>;

export type UpdateAccount = z.infer<typeof updateAccountSchema>;

export type AccountIdParams = z.infer<typeof accountIdSchema>;
