import { useRef } from 'react'
import { Modal } from '@mui/material'

import { StudentI } from '@renderer/internal/interface'
import { MaterialButton } from '../buttons/MaterialButton'
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast'

interface Props {
  student: StudentI
  isOpen: boolean
  onClose: () => void
}

export const StudentCardModal = ({ student, isOpen, onClose }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null)
  // const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadImage = async () => {
    if (!cardRef.current || !student) return

    try {
      const canvas = await html2canvas(cardRef.current)
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `carnet-${student.first_name}-${student.first_last_name}-${student.dni}-${student.id}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      toast.error('oops, ¡algo salió mal!')
      console.error('oops, something went wrong!', err)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="bg-[rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ padding: '0.5rem' }}
      >
        <div style={{ padding: '0.5rem' }} ref={cardRef}>
          {/* Header Section */}
          <div className="bg-primary px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <img src={'./school-logo.jpeg'} alt="Logo" className="h-12 w-auto object-contain" />

              <div className="text-right">
                <h2 className="text-primary-foreground font-bold text-lg leading-tight">
                  {'E.B.N SATURNO MEDINA OVALLES'}
                </h2>
                <p className="text-primary-foreground/80 text-xs font-medium mt-0.5">
                  CARNET ESTUDIANTIL
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6" style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }}>
            <div className="flex gap-4">
              {/* Information Section */}
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Estudiante
                  </p>
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {student?.first_name} {student?.first_last_name}
                  </h3>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                    C.I.
                  </p>
                  <p className="text-sm font-mono font-semibold text-foreground">{student?.dni}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-4 pt-4 space-y-2.5 flex justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                  Dirección
                </p>
                <p className="text-sm text-foreground leading-relaxed">{student?.address}</p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                  Teléfono
                </p>
                <p className="text-sm font-mono text-foreground">{student?.phone_number}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3">
              <p className="text-xs text-muted-foreground text-center">
                ID de Registro: <span className="font-mono font-semibold">{student?.id}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-2 bg-accent" />

        <div
          style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
        >
          <MaterialButton variant="outlined" onClick={onClose} disabled={false}>
            Cancelar
          </MaterialButton>

          <MaterialButton
            type="submit"
            variant="contained"
            disabled={false}
            onClick={handleDownloadImage}
          >
            Guardar
          </MaterialButton>
        </div>
      </div>
    </Modal>
  )
}
