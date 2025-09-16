import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterUserSchema, type RegisterUserSchemaT } from '../../../validations'
import { Loader, MaterialButton, MaterialInput } from '../../components'
import { useRegisterNewAdminMutation } from '../../../internal/hooks/queries'

export const RegisterScreen = () => {
  const { mutate: registerNewAdmin, isPending: isLoading } = useRegisterNewAdminMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterUserSchemaT>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: 'Moises',
      last_name: 'Freites',
      dni: '12345678',
      email: 'mail@mail.com',
      password: 'password'
    }
  })

  const onSubmit = (data: RegisterUserSchemaT) => {
    registerNewAdmin(data, {
      onSuccess: () => {
        reset()
      }
    })
  }

  return (
    <div
      className="screen-container text-center grid grid-cols-1 lg:grid-cols-2"
      style={{ padding: '3rem' }}
    >
      <div className="hidden lg:flex justify-center items-center">imagen</div>
      <div className="">
        <div className="h-full flex justify-center items-center">
          <form
            style={{ padding: '1rem' }}
            className="max-w-3xl w-full grid gap-3"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <h1>Registrate como administrador</h1>
            <MaterialInput
              label="Nombre"
              {...register('name')}
              error={!!errors?.name}
              helperText={errors.name?.message}
            />

            <MaterialInput
              label="Apellido"
              {...register('last_name')}
              error={!!errors?.last_name}
              helperText={errors.last_name?.message}
            />

            <MaterialInput
              label="DNI"
              {...register('dni')}
              error={!!errors?.last_name}
              helperText={errors.last_name?.message}
            />

            <MaterialInput
              type="email"
              label="Correo electrónico"
              {...register('email')}
              error={!!errors?.email}
              helperText={errors.email?.message}
            />

            <MaterialInput
              type="password"
              label="Contraseña"
              {...register('password')}
              error={!!errors?.password}
              helperText={errors.password?.message}
            />

            <MaterialButton type="submit">Registrar</MaterialButton>

            <Loader isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  )
}
