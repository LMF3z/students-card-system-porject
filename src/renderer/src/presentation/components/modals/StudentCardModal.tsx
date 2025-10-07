import { Modal } from '@mui/material'

import { StudentI } from '@renderer/internal/interface'
import { MaterialButton } from '../buttons/MaterialButton'

interface Props {
  student: StudentI
  isOpen: boolean
  onClose: () => void
}

export const StudentCardModal = ({ student, isOpen, onClose }: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="bg-[rgba(0,0,0,0.5)]"
    >
      <div
        className="p-4 absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ padding: '1rem' }}
      >
        {/* Header Section */}
        <div className="bg-primary px-6 py-4">
          <div className="flex items-center justify-between">
            <img src={'./school-logo.jpeg'} alt="Logo" className="h-12 w-auto object-contain" />
            <div className="text-right">
              <h2 className="text-primary-foreground font-bold text-lg leading-tight">
                {'UNIVERSIDAD NACIONAL DE CAJAMARCA'}
              </h2>
              <p className="text-primary-foreground/80 text-xs font-medium mt-0.5">
                CARNET ESTUDIANTIL
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
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
                  DNI
                </p>
                <p className="text-sm font-mono font-semibold text-foreground">{student?.dni}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-4 pt-4 border-t border-border space-y-2.5">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                Dirección
              </p>
              <p className="text-sm text-foreground leading-relaxed">{student?.address}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                Teléfono
              </p>
              <p className="text-sm font-mono text-foreground">{student?.phone_number}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              ID de Registro: <span className="font-mono font-semibold">{student?.id}</span>
            </p>
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

          <MaterialButton type="submit" variant="contained" disabled={false}>
            Guardar
          </MaterialButton>
        </div>
      </div>
    </Modal>
  )
}
