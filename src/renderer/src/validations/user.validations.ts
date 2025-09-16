import { z } from 'zod';

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

export const RegisterUserSchema = z.object({
  name: z
    .string({
      error: 'El nombre es obligatorio',
    })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    .regex(nameRegex, {
      message: 'El nombre solo puede contener letras y espacios',
    }),

  last_name: z
    .string({
      error: 'El apellido es obligatorio',
    })
    .min(2, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(100, { message: 'El apellido no puede exceder los 100 caracteres' })
    .regex(nameRegex, {
      message: 'El apellido solo puede contener letras y espacios',
    }),

  dni: z
    .string({
      error: 'El DNI es obligatorio',
    })
    .min(8, { message: 'El DNI debe tener exactamente 8 caracteres' })
    .regex(/^\d+$/, { message: 'El DNI solo puede contener números' }),

  email: z
    .email({
      message: 'Formato de email inválido',
    })
    .min(1, { message: 'El email debe tener al menos 1 caracteres' })
    .max(254, { message: 'El email no puede exceder los 254 caracteres' }),

  password: z
    .string({
      error: 'La contraseña es obligatoria',
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(16, { message: 'La contraseña no puede exceder los 100 caracteres' }),
  // .regex(/[A-Z]/, {
  //   message: 'La contraseña debe contener al menos una mayúscula',
  // })
  // .regex(/[a-z]/, {
  //   message: 'La contraseña debe contener al menos una minúscula',
  // })
  // .regex(/\d/, {
  //   message: 'La contraseña debe contener al menos un número',
  // }),
});
export type RegisterUserSchemaT = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z
    .email({
      message: 'Formato de email inválido',
    })
    .min(1, { message: 'El email debe tener al menos 1 caracteres' })
    .max(254, { message: 'El email no puede exceder los 254 caracteres' }),

  password: z
    .string({
      error: 'La contraseña es obligatoria',
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(16, { message: 'La contraseña no puede exceder los 100 caracteres' }),
  // .regex(/[A-Z]/, {
  //   message: 'La contraseña debe contener al menos una mayúscula',
  // })
  // .regex(/[a-z]/, {
  //   message: 'La contraseña debe contener al menos una minúscula',
  // })
  // .regex(/\d/, {
  //   message: 'La contraseña debe contener al menos un número',
  // }),
});
export type LoginUserSchemaT = z.infer<typeof LoginUserSchema>;
