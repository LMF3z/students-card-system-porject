import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useGetIfExistAdminQuery, useLoginUserMutation } from '../../../internal/hooks/queries'
import { Loader, MaterialButton, MaterialInput } from '../../components'
import { router } from '../../../routes/routes.constants'
import { LoginUserSchema, type LoginUserSchemaT } from '../../../validations'
import { useCheckEvent } from '../../../internal/hooks'
import { useAuthStore } from '../../../internal/store'

export const LoginScreen = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  useCheckEvent({
    event: 'loginUserAccess',
    callback: (data: any) => {
      if (data) {
        setAuth({ user: data, token: data.token })
        navigate(router.homeScreen)
      }
    }
  })

  const { data: ifExistAdmin, isPending: isLoading } = useGetIfExistAdminQuery()
  const { mutate: loginUserMutate, isPending: isLoging } = useLoginUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserSchemaT>({
    resolver: zodResolver(LoginUserSchema)
  })

  useEffect(() => {
    if (ifExistAdmin === false) {
      navigate(router.registerScreen)
    }
  }, [ifExistAdmin])

  const onSubmit = (data: LoginUserSchemaT) => {
    loginUserMutate(data, {})
  }

  return (
    <div className="screen-container">
      <div className="w-full h-full flex items-center justify-center">
        <form
          style={{ padding: '1rem' }}
          className="w-lg text-center flex flex-col justify-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Loader isLoading={isLoading || isLoging} />

          <h1>Bienvenido</h1>

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

          <MaterialButton type="submit">Inicia sesión</MaterialButton>
        </form>
      </div>
    </div>
  )
}
