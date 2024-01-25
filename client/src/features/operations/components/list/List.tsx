import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { Card, CardContent, Divider, Container, Typography, IconButton, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { removeOperation, setOperations } from '../../../../store/slices/operations/operationsSlice';
import { useEffect } from 'react';
import { IDeleteResponse, IOperationData } from '../../../../interfaces';
import operationsService from '../../../../services/operationsService';


export const List = () => {

  const { allOperations } = useAppSelector((state) => state.operations)

  const dispatch = useAppDispatch()

  useEffect(() => {

    getOperations();

  }, []);

  const getOperations = async () => {
    const operations: IOperationData[] | undefined = await operationsService.getAll();
    if (operations) dispatch(setOperations(operations));
  }

  const deleteOperation = async (id: number) => {
    const operation: IDeleteResponse | undefined = await operationsService.deleteOne(id);
    if (operation && operation.success) dispatch(removeOperation(operation.id));
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align='center'>
        Lista de operaciones
      </Typography>

      {allOperations.map((operation) => (
        <Card key={operation.id} sx={{ margin: '10px 0' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">
                {operation.name}
              </Typography>
              <IconButton
                onClick={() => deleteOperation(operation.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Divider sx={{ margin: '5px 0' }} />
            <Typography variant="body2" color="text.secondary">
              Descripción: {operation.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Marketer: {operation.marketer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cliente: {operation.client.name}
              </Typography>
            </Box>
            <Divider sx={{ margin: '10px 0' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="primary">
                Tipo: {operation.type}
              </Typography>
              <Typography variant="body2" color="primary">
                Cantidad: {operation.amount}
              </Typography>
              <Typography variant="body2" color="primary">
                Precio: {operation.price}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

    </Container>
  )
}
