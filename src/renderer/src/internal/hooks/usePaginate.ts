import { useState } from 'react'

export const usePaginate = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 20,
    offset: 0,
    total: 0
  })

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage
    }))
  }

  const handleRowsPerPageChange = (newLimit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: newLimit,
      page: 0
    }))
  }
  const limit = pagination.limit
  const page = pagination.page

  const offset = page * limit

  return { offset, limit, page, handlePageChange, handleRowsPerPageChange }
}
