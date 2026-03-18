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
