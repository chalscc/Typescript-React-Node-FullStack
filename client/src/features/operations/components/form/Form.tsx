import { IOperationData, IMarketersData } from '../../../../interfaces';
import { useAppSelector, useAppDispatch, useForm } from '../../../../hooks'
import { addOperation } from '../../../../store/slices/operations/operationsSlice';
import { TextField, Container, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import MarketersService from '../../../../services/marketersService';
import { setMarketers } from '../../../../store/slices/marketers/marketersSlice';

export const Form = () => {

  const { operation, allOperations } = useAppSelector((state) => state.operations)
  const { allMarketers } = useAppSelector((state) => state.marketers)
  const dispatch = useAppDispatch()

  const {
    name,
    description,
    formData,
    resetState,
    handleInputChange,
    handleSelectChange
  } = useForm<IOperationData>(operation); // operation es el DefaultValue

  const submitOperation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addOperation(formData));

    resetState();
  }

  useEffect(() => {

    const getMarketers = async () => {
      const marketers: IMarketersData[] | undefined = await MarketersService.getAll();
      if (marketers) dispatch(setMarketers(marketers));
    }

    getMarketers();
  }, []);


  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align='center'>
        Formulario de operaciones
      </Typography>
      <form onSubmit={submitOperation}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ marginBottom: '8px' }}
          required
          fullWidth
          label="Descripción"
          name="description"
          value={description}
          onChange={handleInputChange}
        />

        <FormControl fullWidth sx={{ marginBottom: '8px' }}>
          <InputLabel id="id-label-marketer">Marketer</InputLabel>
          <Select
            labelId="id-label-marketer"
            id="id-select-marketer"
            required
            value={formData.marketer_id !== 0 ? formData.marketer_id : ""}
            label="Marketer"
            name='marketer_id'
            onChange={handleSelectChange}
          >
            {allMarketers.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '8px' }}>
          <InputLabel id="id-label-client">Cliente</InputLabel>
          <Select
            labelId="id-label-client"
            id="id-select-client"
            name='client_id'
            required
            value={formData.client_id !== 0 ? formData.client_id : ""}
            label="Cliente"
            onChange={handleSelectChange}
          >
            {allMarketers.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>        

        <Button type="submit" fullWidth variant="contained">
          Añadir
        </Button>

        <pre>{JSON.stringify(allOperations, null, 2)}</pre>
      </form>
    </Container>
  );
}
