import { useState } from 'react'
import { FilePenLine, Trash2 } from 'lucide-react'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'

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
import { useCheckEvent } from '@renderer/internal/hooks'

export const SchoolGradesScreen = () => {
  const [grades, setGrades] = useState({ rows: [] as SchoolGradesI[], count: 0 })
  const [selectedGrade, setSelectedGrade] = useState<SchoolGradesI | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(20)
  const offset = page * limit

  const {
    isPending: isGetting,
    refetch: refetchGetting,
    isRefetching: isRefetchingGetting
  } = useGetSchoolGradesQuery(offset, limit)
  useCheckEvent({
    event: 'GET_SCHOOL_GRADES_RESPONSE',
    callback: (gradesResults: any) => {
      if (gradesResults) {
        setGrades(gradesResults)
      }
    }
  })
  const { mutate: createMutation, isPending: isCreating } = useCreateSchoolGradeMutation()
  useCheckEvent({
    event: 'CREATE_SCHOOL_GRADE_RESPONSE',
    callback: (data) => {
      if (data) {
        refetchGetting()
      }
    }
  })
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateSchoolGradeMutation()
  useCheckEvent({
    event: 'UPDATE_SCHOOL_GRADE_RESPONSE',
    callback: (data) => {
      if (data) {
        refetchGetting()
      }
    }
  })
  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteSchoolGradeMutation()
  useCheckEvent({
    event: 'DELETE_SCHOOL_GRADE_RESPONSE',
    callback: (data) => {
      if (data) {
        refetchGetting()
      }
    }
  })

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
    deleteMutation(id)
  }

  const handleModalSubmit = async (data: Partial<SchoolGradesI>) => {
    if (modalMode === 'create') {
      createMutation(data as SchoolGradesI)
    } else if (selectedGrade) {
      updateMutation({ ...selectedGrade, ...data })
    }
  }

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
          nuevo
        </MaterialButton>
      </div>

      <Loader
        isLoading={isGetting || isCreating || isRefetchingGetting || isDeleting || isUpdating}
      />

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {['Grado', 'Sección', 'Acciones'].map((column) => (
                <TableCell key={column} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {grades?.rows?.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell align="center">{row.grade_title}</TableCell>
                <TableCell align="center">{row.grade_section}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-3">
                    <IconButton aria-label="delete" onClick={() => handleUpdate(row)}>
                      <FilePenLine className="text-blue-500" />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                      <Trash2 className="text-red-500" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[limit]}
        component="div"
        count={grades?.count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, page) => {
          setPage(page)
        }}
        onRowsPerPageChange={(event) => {
          setLimit(+event.target.value)
          setPage(0)
        }}
      />

      <SchoolGradesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSubmit={handleModalSubmit}
        initialData={selectedGrade || undefined}
      />
    </div>
  )
}
