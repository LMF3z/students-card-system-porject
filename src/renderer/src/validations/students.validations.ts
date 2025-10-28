import { z } from 'zod'

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

export const StudentSchema = z.object({
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
  representative: z
    .number({
      error: 'El representante es obligatorio'
    })
    .int({ message: 'El representante debe ser un valor numérico' })
    .positive({ message: 'El representante debe ser un id válido' })
})

export type StudentSchemaT = z.infer<typeof StudentSchema>
