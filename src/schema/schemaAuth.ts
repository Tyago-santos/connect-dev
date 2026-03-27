import zod from 'zod';

export function schemaLogin(password: string, email: string) {
  const validateUser = zod.object({
    password: zod.string().min(6, 'precisa conter no mínimo 6 caracteres'),
    email: zod.email('endereço de email inválido'),
  });

  return validateUser.safeParse({
    password,
    email,
  });
}

export function schemaRegister(
  password: string,
  email: string,
  name: string,
  birthdate: string,
) {
  const validateUser = zod.object({
    password: zod.string().min(6, 'precisa conter no mínimo 6 caracteres'),
    email: zod.email('endereço de email inválido'),
    name: zod
      .string('Nome é obrigatório')
      .min(2, 'Nome tem ter no minimo 2 caracteres'),
    birthdate: zod
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento inválida (formato: YYYY-MM-DD)')
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age - 1 >= 13;
        }
        return age >= 13;
      }, 'Você precisa ter pelo menos 13 anos para se registrar'),
  });

  return validateUser.safeParse({
    password,
    email,
    name,
    birthdate,
  });
}
