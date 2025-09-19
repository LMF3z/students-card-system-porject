import { useState, useEffect } from 'react'
import type { SchoolGradesI } from '../../../internal/interface/grades/grades.interface'
import { MaterialInput } from '../inputs/MaterialInput'
import { MaterialButton } from '../buttons/MaterialButton'

interface SchoolGradesModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'update'
  initialData?: Partial<SchoolGradesI>
  onSubmit: (data: Partial<SchoolGradesI>) => Promise<void>
}

export const SchoolGradesModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit
}: SchoolGradesModalProps) => {
  const [formData, setFormData] = useState({ grade_title: '', grade_section: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        grade_title: initialData.grade_title || '',
        grade_section: initialData.grade_section || ''
      })
    }
  }, [isOpen, initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
      onClose()
      setFormData({ grade_title: '', grade_section: '' })
    } catch (error) {
      console.error('Error submitting form', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setFormData({ grade_title: '', grade_section: '' })
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2>{mode === 'create' ? 'Crear Calificación' : 'Actualizar Calificación'}</h2>
        <form onSubmit={handleSubmit}>
          <MaterialInput
            label="Título de la Calificación"
            value={formData.grade_title}
            onChange={(e) => setFormData({ ...formData, grade_title: e.target.value })}
            required
            fullWidth
          />
          <MaterialInput
            label="Sección de la Calificación"
            value={formData.grade_section}
            onChange={(e) => setFormData({ ...formData, grade_section: e.target.value })}
            required
            fullWidth
          />
          <div
            style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
          >
            <MaterialButton variant="outlined" onClick={handleClose} disabled={loading}>
              Cancelar
            </MaterialButton>
            <MaterialButton
              type="submit"
              variant="contained"
              disabled={loading || !formData.grade_title || !formData.grade_section}
            >
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Actualizar'}
            </MaterialButton>
          </div>
        </form>
      </div>
    </div>
  )
}
