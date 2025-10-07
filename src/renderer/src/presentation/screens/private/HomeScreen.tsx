import { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TablePagination
} from '@mui/material'
import { Trash2 } from 'lucide-react'

import type { StudentI, SchoolGradesI, EnrollmentI } from '@renderer/internal/interface'
import { useCheckEvent, usePaginate } from '@renderer/internal/hooks'
import {
  useGetStudentsQuery,
  useGetSchoolGradesQuery,
  useGetEnrollmentsQuery,
  useCreateEnrollmentMutation,
  useDeleteEnrollmentMutation
} from '@renderer/internal/hooks/queries'
import { Loader, MaterialButton, MaterialSelect } from '@renderer/presentation/components'

export const HomeScreen = () => {
  const [students, setStudents] = useState({ rows: [] as StudentI[], count: 0 })
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [grades, setGrades] = useState({ rows: [] as SchoolGradesI[], count: 0 })
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [enrollments, setEnrollments] = useState({ rows: [] as EnrollmentI[], count: 0 })

  const { offset, limit, page, handlePageChange, handleRowsPerPageChange } = usePaginate()

  // Obtener estudiantes y grados
  const { isPending: isLoadingStudents } = useGetStudentsQuery(offset, limit)
  useCheckEvent({
    event: 'GET_STUDENTS_RESPONSE',
    callback: (results: any) => {
      if (results) {
        setStudents(results)
      }
    }
  })
  const { isPending: isLoadingGrades } = useGetSchoolGradesQuery(offset, limit)
  useCheckEvent({
    event: 'GET_SCHOOL_GRADES_RESPONSE',
    callback: (results: any) => {
      if (results) {
        setGrades(results)
      }
    }
  })
  const { isPending: isLoadingEnrollments, refetch } = useGetEnrollmentsQuery(offset, limit)
  useCheckEvent({
    event: 'GET_ENROLLMENTS_RESPONSE',
    callback: (results: any) => {
      if (results) {
        setEnrollments(results)
      }
    }
  })
  const { mutate: createEnrollment, isPending: isCreating } = useCreateEnrollmentMutation()
  useCheckEvent({
    event: 'CREATE_ENROLLMENT_RESPONSE',
    callback: (results: any) => {
      if (results) {
        refetch()
      }
    }
  })
  const { mutate: deleteEnrollment, isPending: isDeleting } = useDeleteEnrollmentMutation()
  useCheckEvent({
    event: 'DELETE_ENROLLMENT_RESPONSE',
    callback: (results: any) => {
      if (results) {
        refetch()
      }
    }
  })

  // Calcular año actual y siguiente
  const currentYear = new Date().getFullYear()
  const enrollmentPeriod = `${currentYear}-${currentYear + 1}`

  // Handlers
  const handleInscribir = () => {
    if (!selectedStudent || !selectedGrade) return
    createEnrollment(
      {
        student_id: Number(selectedStudent),
        school_grade: Number(selectedGrade),
        start_period: currentYear,
        end_period: currentYear + 1
      } as EnrollmentI,
      {
        onSuccess: () => {
          setSelectedStudent(null)
          setSelectedGrade(null)
          refetch()
        }
      }
    )
  }

  const handleDelete = (id: number) => {
    deleteEnrollment(id, { onSuccess: () => refetch() })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Proceso de Inscripción
      </Typography>

      <Paper style={{ padding: 24, marginBottom: 32 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleInscribir()
          }}
          style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <MaterialSelect
            label="Estudiante"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value as number)}
            disabled={isLoadingStudents || students?.rows?.length === 0}
            data={students?.rows?.map((s) => ({
              label: `${s.first_name} ${s.first_last_name}`,
              value: s.id
            }))}
          />

          <MaterialSelect
            label="Grado"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value as number)}
            disabled={isLoadingGrades || grades?.rows?.length === 0}
            data={grades?.rows?.map((s) => ({
              label: `${s.grade_title} ${s.grade_section}`,
              value: s.id
            }))}
          />

          <div>
            <Typography variant="body2" color="textSecondary">
              Año de inscripción:
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {enrollmentPeriod}
            </Typography>
          </div>

          <MaterialButton
            type="submit"
            variant="contained"
            disabled={!selectedStudent || !selectedGrade || isLoadingStudents || isLoadingGrades}
          >
            {isCreating ? 'Inscribiendo...' : 'Inscribir'}
          </MaterialButton>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Inscripciones actuales
      </Typography>
      <Loader isLoading={isLoadingEnrollments || isDeleting} />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Estudiante</TableCell>
              <TableCell>Grado</TableCell>
              <TableCell>Año</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments?.rows?.map((enr) => {
              const student = students?.rows?.find((s) => s.id === enr.student_id)
              const grade = grades?.rows?.find((g) => g.id === enr.school_grade)
              return (
                <TableRow key={enr.id}>
                  <TableCell>
                    {student
                      ? `${student.first_name} ${student.second_name} ${student.first_last_name} ${student.second_last_name}`
                      : '—'}
                  </TableCell>
                  <TableCell>
                    {grade ? `${grade.grade_title} ${grade.grade_section}` : '—'}
                  </TableCell>
                  <TableCell>
                    {enr.start_period}-{enr.end_period}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(enr.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            {enrollments?.rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay inscripciones registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[limit]}
        component="div"
        count={enrollments?.count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, page) => {
          handlePageChange(page)
        }}
        onRowsPerPageChange={(event) => {
          handleRowsPerPageChange(+event.target.value)
        }}
      />
    </div>
  )
}
