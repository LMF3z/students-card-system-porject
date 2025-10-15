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
  useCreateRepresentativeMutation,
  useDeleteRepresentativeMutation,
  useGetRepresentativesQuery,
  useUpdateRepresentativeMutation
} from '@renderer/internal/hooks/queries'
import { RepresentativeI } from '@renderer/internal/interface'
import { Loader, MaterialButton, StudentModal } from '@renderer/presentation/components'

export const RepresentativeScreen = () => {
  const { offset, limit, page, handlePageChange, handleRowsPerPageChange } = usePaginate()

  const [representatives, setRepresentatives] = useState({
    rows: [] as RepresentativeI[],
    count: 0
  })
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [selectedRepresentative, setSelectedRepresentative] = useState<RepresentativeI | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    isPending: isGetting,
    refetch: refetchGetting,
    isRefetching: isRefetchingGetting
  } = useGetRepresentativesQuery(offset, limit)
  useCheckEvent({
    event: 'GET_REPRESENTATIVES_RESPONSE',
    callback: (representativesResults: any) => {
      if (representativesResults) {
        setRepresentatives(representativesResults)
      }
    }
  })
  const { mutate: createMutation, isPending: isCreating } = useCreateRepresentativeMutation()
  useCheckEvent({
    event: 'CREATE_REPRESENTATIVE_RESPONSE',
    callback: (representativesResults: any) => {
      if (representativesResults) {
        refetchGetting()
      }
    }
  })
  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteRepresentativeMutation()
  useCheckEvent({
    event: 'DELETE_REPRESENTATIVE_RESPONSE',
    callback: (representativesResults: any) => {
      if (representativesResults) {
        refetchGetting()
      }
    }
  })
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateRepresentativeMutation()
  useCheckEvent({
    event: 'UPDATE_REPRESENTATIVE_RESPONSE',
    callback: (representativesResults: any) => {
      if (representativesResults) {
        refetchGetting()
      }
    }
  })

  const handleCreate = () => {
    setModalMode('create')
    setSelectedRepresentative(null)
    setIsModalOpen(true)
  }

  const handleUpdate = (representative: RepresentativeI) => {
    setModalMode('update')
    setSelectedRepresentative(representative)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteMutation(id)
  }

  const handleModalSubmit = async (data: Partial<RepresentativeI>) => {
    if (modalMode === 'create') {
      createMutation(data as RepresentativeI)
    } else if (selectedRepresentative) {
      updateMutation({ ...selectedRepresentative, ...data })
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
        <h1>Representantes</h1>
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
            {representatives?.rows?.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell align="center">
                  {row.first_name} {row.first_last_name}
                </TableCell>
                <TableCell align="center">{row.dni}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
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
        count={representatives?.count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, page) => {
          handlePageChange(page)
        }}
        onRowsPerPageChange={(event) => {
          handleRowsPerPageChange(+event.target.value)
        }}
      />

      {/* Reuse Student modal components for now; consider creating Representative-specific modals later */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSubmit={handleModalSubmit}
        initialData={selectedRepresentative || undefined}
      />
    </div>
  )
}
