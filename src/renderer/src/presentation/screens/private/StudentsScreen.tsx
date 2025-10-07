import { useState } from 'react'
import { FilePenLine, IdCard, Trash2 } from 'lucide-react'
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

import { useCheckEvent, usePaginate } from '@renderer/internal/hooks'
import {
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
  useUpdateStudentMutation
} from '@renderer/internal/hooks/queries'
import { StudentI } from '@renderer/internal/interface'
import {
  Loader,
  MaterialButton,
  StudentCardModal,
  StudentModal
} from '@renderer/presentation/components'

export const StudentsScreen = () => {
  const { offset, limit, page, handlePageChange, handleRowsPerPageChange } = usePaginate()

  const [students, setStudents] = useState({ rows: [] as StudentI[], count: 0 })
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [selectedStudent, setSelectedStudent] = useState<StudentI | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  const {
    isPending: isGetting,
    refetch: refetchGetting,
    isRefetching: isRefetchingGetting
  } = useGetStudentsQuery(offset, limit)
  useCheckEvent({
    event: 'GET_STUDENTS_RESPONSE',
    callback: (studentsResults: any) => {
      if (studentsResults) {
        setStudents(studentsResults)
      }
    }
  })
  const { mutate: createMutation, isPending: isCreating } = useCreateStudentMutation()
  useCheckEvent({
    event: 'CREATE_STUDENT_RESPONSE',
    callback: (studentsResults: any) => {
      if (studentsResults) {
        refetchGetting()
      }
    }
  })
  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteStudentMutation()
  useCheckEvent({
    event: 'DELETE_STUDENT_RESPONSE',
    callback: (studentsResults: any) => {
      if (studentsResults) {
        refetchGetting()
      }
    }
  })
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateStudentMutation()
  useCheckEvent({
    event: 'UPDATE_STUDENT_RESPONSE',
    callback: (studentsResults: any) => {
      if (studentsResults) {
        refetchGetting()
      }
    }
  })

  const handleCreate = () => {
    setModalMode('create')
    setSelectedStudent(null)
    setIsModalOpen(true)
  }

  const handleUpdate = (student: StudentI) => {
    setModalMode('update')
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteMutation(id)
  }

  const handleModalSubmit = async (data: Partial<StudentI>) => {
    if (modalMode === 'create') {
      createMutation(data as StudentI)
    } else if (selectedStudent) {
      updateMutation({ ...selectedStudent, ...data })
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
        <h1>Estudiantes</h1>
        <MaterialButton onClick={handleCreate} variant="contained">
          nuevo
        </MaterialButton>
      </div>

      <Loader
        isLoading={isGetting || isRefetchingGetting || isCreating || isDeleting || isUpdating}
      />

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {['Nombres', 'DNI', 'Dirección', 'Celular', 'Acciones'].map((column) => (
                <TableCell key={column} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.rows?.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell align="center">
                  {row.first_name} {row.first_last_name}
                </TableCell>
                <TableCell align="center">{row.dni}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-3">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setSelectedStudent(row)
                        setIsCardModalOpen(true)
                      }}
                    >
                      <IdCard className="text-green-500" />
                    </IconButton>

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
        count={students?.count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, page) => {
          handlePageChange(page)
        }}
        onRowsPerPageChange={(event) => {
          handleRowsPerPageChange(+event.target.value)
        }}
      />

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSubmit={handleModalSubmit}
        initialData={selectedStudent || undefined}
      />

      <StudentCardModal
        student={selectedStudent!}
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false)
          setSelectedStudent(null)
        }}
      />
    </div>
  )
}
