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

import { useCheckEvent, usePaginate } from '@renderer/internal/hooks'
import {
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useGetTeachersQuery,
  useUpdateTeacherMutation
} from '@renderer/internal/hooks/queries'
import { TeacherI } from '@renderer/internal/interface'
import { Loader, MaterialButton, TeacherModal } from '@renderer/presentation/components'

export const TeachersScreen = () => {
  const { offset, limit, page, handlePageChange, handleRowsPerPageChange } = usePaginate()

  const [teachers, setTeachers] = useState({ rows: [] as TeacherI[], count: 0 })
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherI | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    isPending: isGetting,
    refetch: refetchGetting,
    isRefetching: isRefetchingGetting
  } = useGetTeachersQuery(offset, limit)
  useCheckEvent({
    event: 'GET_TEACHERS_RESPONSE',
    callback: (teachersResults: any) => {
      if (teachersResults) {
        setTeachers(teachersResults)
      }
    }
  })
  const { mutate: createMutation, isPending: isCreating } = useCreateTeacherMutation()
  useCheckEvent({
    event: 'CREATE_TEACHER_RESPONSE',
    callback: (teachersResults: any) => {
      if (teachersResults) {
        refetchGetting()
      }
    }
  })
  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteTeacherMutation()
  useCheckEvent({
    event: 'DELETE_TEACHER_RESPONSE',
    callback: (teachersResults: any) => {
      if (teachersResults) {
        refetchGetting()
      }
    }
  })
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateTeacherMutation()
  useCheckEvent({
    event: 'UPDATE_TEACHER_RESPONSE',
    callback: (teachersResults: any) => {
      if (teachersResults) {
        refetchGetting()
      }
    }
  })

  const handleCreate = () => {
    setModalMode('create')
    setSelectedTeacher(null)
    setIsModalOpen(true)
  }

  const handleUpdate = (teacher: TeacherI) => {
    setModalMode('update')
    setSelectedTeacher(teacher)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteMutation(id)
  }

  const handleModalSubmit = async (data: Partial<TeacherI>) => {
    if (modalMode === 'create') {
      createMutation(data as TeacherI)
    } else if (selectedTeacher) {
      updateMutation({ ...selectedTeacher, ...data })
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
        <h1>Profesores</h1>
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
              {['Nombres', 'C.I.', 'Dirección', 'Celular', 'Correo', 'Acciones'].map((column) => (
                <TableCell key={column} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers?.rows?.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell align="center">
                  {row.first_name} {row.first_last_name}
                </TableCell>
                <TableCell align="center">{row.dni}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
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
        count={teachers?.count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, page) => {
          handlePageChange(page)
        }}
        onRowsPerPageChange={(event) => {
          handleRowsPerPageChange(+event.target.value)
        }}
      />

      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSubmit={handleModalSubmit}
        initialData={selectedTeacher || undefined}
      />
    </div>
  )
}
