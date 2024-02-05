import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

import { useAppSelector } from '../../../../../hooks';

interface ISelectComponent {
  handleSelectChange: (event: SelectChangeEvent<number>) => void,
  inputId: number,
  label: string,
  name: string
}

export const SelectComponent = ({ handleSelectChange, inputId, label, name }: ISelectComponent) => {
  const { allMarketers } = useAppSelector((state) => state.marketers)

  return (
    <FormControl fullWidth sx={{ marginBottom: '8px' }}>
      <InputLabel
      >{label}</InputLabel>
      <Select
        name={name}
        required
        value={inputId !== 0 ? inputId : ""}
        label="label"
        onChange={handleSelectChange}
      >
        {allMarketers.map(({ id, name }) => (
          <MenuItem key={id} value={id} >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
