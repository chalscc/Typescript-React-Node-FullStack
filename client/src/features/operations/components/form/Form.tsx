import { IOperationData } from '../../types/OperationData';
import { useAppSelector, useAppDispatch, useForm } from '../../../../hooks'
import { addOperation } from '../../../../store/slices/operations/operationsSlice';
import { TextField, Container, Typography, FormControlLabel, Switch, Button } from '@mui/material';
import { useEffect } from 'react';
import MarketersService from '../../../../services/marketersService';
import { setMarketers } from '../../../../store/slices/marketers/marketersSlice';
import { IMarketersData } from '../../../marketers/types/MarketersData';

export const Form = () => {

  const { operation, allOperations } = useAppSelector((state) => state.operations)
  const dispatch = useAppDispatch()

  const { name, description, isActive, formData, resetState, handleChange } = useForm<IOperationData>(operation); // operation es el DefaultValue

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
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nombre"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Descripción"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={handleChange}
              name="isActive"
            />
          }
          label="Activa"
        />

        <Button type="submit" fullWidth variant="contained">
          Añadir
        </Button>

        <pre>{JSON.stringify(allOperations, null, 2)}</pre>
      </form>
    </Container>
  );
}
