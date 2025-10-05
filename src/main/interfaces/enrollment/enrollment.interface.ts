export interface EnrollmentI {
  id: number
  student_id: number
  school_grade: number
  start_period: number
  end_period: number
  // note: 'CHECK constraint: start_period < end_period'

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
