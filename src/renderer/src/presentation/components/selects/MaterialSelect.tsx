import { FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { type SelectProps } from '@mui/material/Select'

// interface Props extends SelectProps {
//   data: { label: string; value: string | number }[]
// }

type Props = SelectProps & {
  data: { label: string; value: string | number }[]
}

export const MaterialSelect = ({ data, ...props }: Props) => {
  return (
    <FormControl style={{ minWidth: 180 }} size="small" variant="standard">
      <InputLabel>{props.label}</InputLabel>
      <Select
        // onChange={(e) => setSelectedStudent(e.target.value as number)}
        {...props}
      >
        {data?.map((s) => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
