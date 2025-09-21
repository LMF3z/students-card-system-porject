export interface StudentI {
  id: number
  first_name: string
  second_name: string
  first_last_name: string
  second_last_name: string
  dni: string
  address: string
  phone_number: string
  photo?: string
  register_by: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
