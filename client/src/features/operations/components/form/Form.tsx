import { useForm } from '../../../../hooks/useForm'
import { OperationData } from './OperationData';

import { TextField, Container, Typography, FormControlLabel, Switch, Button } from '@mui/material';

export const Form = () => {

  const { name, description, isActive, formData, resetState, handleChange } = useForm<OperationData>({
    name: '',
    description: '',
    isActive: false,
    createdAt: new Date()
  });

  const addOperation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      createdAt: new Date(),
    };

    console.log(updatedFormData);
    resetState();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Añadir operación
      </Typography>
      <form onSubmit={addOperation}>
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

        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </form>
    </Container>
  );
}
