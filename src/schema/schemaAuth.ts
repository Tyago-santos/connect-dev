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

export function schemaRegister(password: string, email: string, name: string) {
  const validateUser = zod.object({
    password: zod.string().min(6, 'precisa conter no mínimo 6 caracteres'),
    email: zod.email('endereço de email inválido'),
    name: zod.string('Nome é obrigatório').min(2, 'Nome tem ter no minimo 2 caracteres'),
  });

  return validateUser.safeParse({
    password,
    email,
    name,
  });
}
