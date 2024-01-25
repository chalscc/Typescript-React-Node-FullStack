import { IOperationData, IMarketersData } from '../../../../interfaces';
import { useAppSelector, useAppDispatch, useForm } from '../../../../hooks'
import { addOperation } from '../../../../store/slices/operations/operationsSlice';
import { TextField, Container, Typography, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment, FormControlLabel, RadioGroup, Radio, Box } from '@mui/material';
import { useEffect } from 'react';
import MarketersService from '../../../../services/marketersService';
import { setMarketers } from '../../../../store/slices/marketers/marketersSlice';
import operationsService from '../../../../services/operationsService';

export const Form = () => {

  const { operation, allOperations } = useAppSelector((state) => state.operations)
  const { allMarketers } = useAppSelector((state) => state.marketers)
  const dispatch = useAppDispatch()

  const {
    name,
    description,
    type,
    amount,
    price,
    formData,
    resetState,
    handleInputChange,
    handleRadioChange,
    handleSelectChange
  } = useForm(operation); // operation es el DefaultValue

  useEffect(() => {

    getMarketers();

  }, []);
  
  const submitOperation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveOperation();

    resetState();
  }  


  const saveOperation = async () => { 
    const operation: IOperationData | undefined = await operationsService.addOne(formData);

    console.log(operation)

    if (operation) dispatch(addOperation(operation));
  }

  const getMarketers = async () => {
    const marketers: IMarketersData[] | undefined = await MarketersService.getAll();
    if (marketers) dispatch(setMarketers(marketers));
  }


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


        <TextField
          sx={{ marginBottom: '8px' }}
          required
          fullWidth
          label="Precio"
          name="price"
          value={price}
          type='number'
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                €
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
        />

        <TextField
          sx={{ marginBottom: '8px' }}
          required
          fullWidth
          label="Cantidad"
          name="amount"
          value={amount}
          type='number'
          onChange={handleInputChange}
        />

        <FormControl fullWidth sx={{ marginBottom: '8px' }}>
          <InputLabel id="id-label-marketer">Marketer</InputLabel>
          <Select
            labelId="id-label-marketer"
            id="id-select-marketer"
            required
            value={formData.marketer.id !== 0 ? formData.marketer.id : ""}
            label="Marketer"
            name='marketer'
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
            name='client'
            required
            value={formData.client.id !== 0 ? formData.client.id : ""}
            label="Cliente"
            onChange={handleSelectChange}
          >
            {allMarketers.map(({ id, name }) => (
              <MenuItem key={id} value={id} >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <Typography variant="h6" sx={{ marginBottom: '8px', marginRight: '20px' }}>
            Tipo:
          </Typography>
          <FormControl>
            <RadioGroup value={type} name='type' onChange={handleRadioChange} row>
              <FormControlLabel value="compra" control={<Radio />} label="Compra" />
              <FormControlLabel value="venta" control={<Radio />} label="Venta" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Button type="submit" fullWidth variant="contained">
          Añadir
        </Button>

        <pre>{JSON.stringify(allOperations, null, 2)}</pre>
      </form>
    </Container>
  );
}
