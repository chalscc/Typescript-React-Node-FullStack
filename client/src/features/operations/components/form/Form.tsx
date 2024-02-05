import { useEffect } from 'react';

import { TextField, Container, Typography, Button, FormControl, InputAdornment, FormControlLabel, RadioGroup, Radio, Box } from '@mui/material';

import { IOperationData, IMarketersData } from '../../../../interfaces';
import { MarketersService, OperationsService } from '../../../../services';
import { useAppSelector, useAppDispatch, useForm } from '../../../../hooks';
import { setMarketers } from '../../../../store/slices/marketers/marketersSlice';
import { addOperation } from '../../../../store/slices/operations/operationsSlice';
import { SelectComponent } from './components/SelectComponent';

export const Form = () => {

  const { operation, allOperations } = useAppSelector((state) => state.operations)  
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
    const operation: IOperationData | undefined = await OperationsService.addOne(formData);

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
          onKeyDownCapture={(event) => {
            const forbiddenKeys = ['.', ',', 'e', '+', '-'];

            if (forbiddenKeys.includes(event.key)) event.preventDefault();
          }}
        />
       
        <SelectComponent handleSelectChange={handleSelectChange} inputId={formData.marketer.id} name='marketer' label='Marketer' />

        <SelectComponent handleSelectChange={handleSelectChange} inputId={formData.client.id} name='client' label='Cliente' />

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

        <hr />

        <h6> Dejo la siguiente información para que puedas ver los objetos creados de  forma interna.</h6>
        <pre>{JSON.stringify(allOperations, null, 2)}</pre>
      </form>
    </Container>
  );
}
