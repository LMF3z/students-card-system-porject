import { z } from 'zod'

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

export const TeacherSchema = z.object({
  first_name: z
    .string({
      error: 'El primer nombre es obligatorio'
    })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    .regex(nameRegex, {
      message: 'El nombre solo puede contener letras y espacios'
    }),
  second_name: z
    .string({
      error: 'El segundo nombre es obligatorio'
    })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    .regex(nameRegex, {
      message: 'El nombre solo puede contener letras y espacios'
    }),
  first_last_name: z
    .string({
      error: 'El primer apellido es obligatorio'
    })
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(50, { message: 'El apellido no puede exceder los 50 caracteres' })
    .regex(nameRegex, {
      message: 'El apellido solo puede contener letras y espacios'
    }),
  second_last_name: z
    .string({
      error: 'El segundo apellido es obligatorio'
    })
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(50, { message: 'El apellido no puede exceder los 50 caracteres' })
    .regex(nameRegex, {
      message: 'El apellido solo puede contener letras y espacios'
    }),
  dni: z
    .string({
      error: 'El C.I. es obligatorio'
    })
    .min(8, { message: 'El C.I. debe tener exactamente 8 caracteres' })
    .regex(/^\d+$/, { message: 'El C.I. solo puede contener números' }),
  address: z
    .string({
      error: 'La dirección es obligatoria'
    })
    .min(3, { message: 'La dirección debe tener al menos 3 caracteres' })
    .max(50, { message: 'La dirección no puede exceder los 50 caracteres' }),
  phone_number: z
    .string({
      error: 'El número de teléfono es obligatorio'
    })
    .min(10, { message: 'El número de teléfono debe tener al menos 10 caracteres' })
    .max(50, { message: 'El número de teléfono debe tener máximo 50 caracteres' }),
  email: z
    .email({
      message: 'Formato de email inválido'
    })
    .min(1, { message: 'El email debe tener al menos 1 caracteres' })
    .max(254, { message: 'El email no puede exceder los 254 caracteres' }),

  password: z
    .string({
      error: 'La contraseña es obligatoria'
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(16, { message: 'La contraseña no puede exceder los 100 caracteres' })
  // register_by: z.number({
  //   error: 'El campo "registrado por" es obligatorio'
  // })
})

export type TeacherSchemaT = z.infer<typeof TeacherSchema>
