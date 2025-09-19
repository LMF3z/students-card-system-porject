import { useState } from 'react'
import {
  useGetSchoolGradesQuery,
  useCreateSchoolGradeMutation,
  useUpdateSchoolGradeMutation,
  useDeleteSchoolGradeMutation
} from '../../../internal/hooks/queries'
import { Loader } from '../../components/Loader'
import { SchoolGradesModal } from '../../components/modals/SchoolGradesModal'
import { MaterialButton } from '../../components/buttons/MaterialButton'
import type { SchoolGradesI } from '../../../internal/interface/grades/grades.interface'
import { useAuthStore } from '../../../internal/store/useAuthStore'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useCheckEvent } from '@renderer/internal/hooks'

export const SchoolGradesScreen = () => {
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  const [grades, setGrades] = useState({ rows: [] as SchoolGradesI[], count: 0 })
  const [selectedGrade, setSelectedGrade] = useState<SchoolGradesI | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [offset, setOffset] = useState(0)
  const limit = 20

  const { isPending: isGetting } = useGetSchoolGradesQuery(offset, limit)
  useCheckEvent({
    event: 'GET_SCHOOL_GRADES_RESPONSE',
    callback: (data: any) => {
      if (data) {
        setGrades(data)
      }
    }
  })
  const createMutation = useCreateSchoolGradeMutation()
  const updateMutation = useUpdateSchoolGradeMutation()
  const deleteMutation = useDeleteSchoolGradeMutation()

  const handleCreate = () => {
    setModalMode('create')
    setSelectedGrade(null)
    setIsModalOpen(true)
  }

  const handleUpdate = (grade: SchoolGradesI) => {
    setModalMode('update')
    setSelectedGrade(grade)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleModalSubmit = async (data: Partial<SchoolGradesI>) => {
    if (modalMode === 'create') {
      createMutation.mutate({ ...data, register_by: userId! } as SchoolGradesI)
    } else if (selectedGrade) {
      await updateMutation.mutate({ ...selectedGrade, ...data })
    }
  }

  const handleNextPage = () => {
    setOffset((prev) => prev + limit)
  }

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit))
  }

  // if (isLoading) return <Loader />
  // if (error) return <div>Error loading grades: {error.message}</div>

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}
      >
        <h1>Grados</h1>
        <MaterialButton onClick={handleCreate} variant="contained">
          Crear Nuevo Grado
        </MaterialButton>
      </div>

      <Loader isLoading={isGetting} />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {['Grado', 'Sección'].map((column) => (
                  <TableCell key={column} align="center">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {grades?.rows?.map((row, idx) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell key={idx} align="center">
                    {row.grade_title}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={grades?.rows.length}
          rowsPerPage={20}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <MaterialButton onClick={handlePrevPage} disabled={offset === 0} variant="outlined">
          Anterior
        </MaterialButton>
        <span>Página {Math.floor(offset / limit) + 1}</span>
        <MaterialButton onClick={handleNextPage} disabled={[].length < limit} variant="outlined">
          Siguiente
        </MaterialButton>
      </div>

      <SchoolGradesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}
