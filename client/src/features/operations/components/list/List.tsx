import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { Card, CardContent, Divider, Container, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { removeOperation, setOperations } from '../../../../store/slices/operations/operationsSlice';
import { useEffect } from 'react';
import { IOperationData } from '../../../../interfaces';
import operationsService from '../../../../services/operationsService';


export const List = () => {

  const { allOperations } = useAppSelector((state) => state.operations)
  const { allMarketers } = useAppSelector((state) => state.marketers)

  const dispatch = useAppDispatch()

  useEffect(() => {

    getOperations();

  }, []);

  const getOperations = async () => {
    const operations: IOperationData[] | undefined = await operationsService.getAll();
    
    if (operations) dispatch(setOperations(operations));
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align='center'>
        Lista de operaciones
      </Typography>

      {allOperations.map((operation) => (
        console.log(operation),

        <Card key={operation.id} sx={{ margin: '10px 0' }}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>
                Nombre: {operation.name}
              </span>
              <IconButton
                onClick={() => dispatch(removeOperation(operation))}
              >
                <DeleteIcon />
              </IconButton>
            </Typography>
            <Divider sx={{ margin: '5px 0' }} />
            <Typography variant="body2">
              Descripción: {operation.description}
            </Typography>
            <Typography variant="body2">
              Descripción: {allMarketers.find(marketer => marketer.id === operation.marketer_id)?.name}
            </Typography>
            <Typography variant="body2">
              Descripción: {allMarketers.find(marketer => marketer.id === operation.client_id)?.name}
            </Typography>
          </CardContent>
        </Card>

      ))}

    </Container>
  )
}
