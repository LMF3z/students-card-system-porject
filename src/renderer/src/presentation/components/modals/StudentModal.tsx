import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@mui/material'
import { StudentSchema, StudentSchemaT } from '@renderer/validations'

import { StudentI } from '@renderer/internal/interface'
import { MaterialInput } from '../inputs/MaterialInput'
import { MaterialButton } from '../buttons/MaterialButton'

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'update'
  initialData?: Partial<StudentI>
  onSubmit: (data: Partial<StudentI>) => Promise<void>
}

export const StudentModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit
}: StudentModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<StudentSchemaT>({
    resolver: zodResolver(StudentSchema)
  })

  useEffect(() => {
    if (isOpen && initialData) {
      reset(initialData as StudentSchemaT)
    }
  }, [isOpen, initialData])

  const handleClose = () => {
    onClose()
    reset()
  }

  const handleSendForm = async (data: StudentSchemaT) => {
    setLoading(true)
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error('Error submitting form', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="bg-[rgba(0,0,0,0.5)]"
    >
      <form
        onSubmit={handleSubmit(handleSendForm)}
        className="p-4 absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ padding: '1rem' }}
      >
        <MaterialInput
          label="Primer nombre"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('first_name')}
          error={!!errors?.first_name}
          helperText={errors.first_name?.message}
        />

        <MaterialInput
          label="Segundo nombre"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('second_name')}
          error={!!errors?.second_name}
          helperText={errors.second_name?.message}
        />

        <MaterialInput
          label="Primer apellido"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('first_last_name')}
          error={!!errors?.first_last_name}
          helperText={errors.first_last_name?.message}
        />

        <MaterialInput
          label="Segundo apellido"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('second_last_name')}
          error={!!errors?.second_last_name}
          helperText={errors.second_last_name?.message}
        />

        <MaterialInput
          label="DNI"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('dni')}
          error={!!errors?.dni}
          helperText={errors.dni?.message}
        />

        <MaterialInput
          label="Dirección"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('address')}
          error={!!errors?.address}
          helperText={errors.address?.message}
        />

        <MaterialInput
          label="Teléfono"
          fullWidth
          style={{ marginBottom: '1rem' }}
          {...register('phone_number')}
          error={!!errors?.phone_number}
          helperText={errors.phone_number?.message}
        />

        <div
          style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
        >
          <MaterialButton variant="outlined" onClick={handleClose} disabled={loading}>
            Cancelar
          </MaterialButton>

          <MaterialButton type="submit" variant="contained" disabled={loading}>
            {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Actualizar'}
          </MaterialButton>
        </div>
      </form>
    </Modal>
  )
}
