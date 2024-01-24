import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { Card, CardContent, Divider, Container, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { removeOperation } from '../../../../store/slices/operations/operationsSlice';


export const List = () => {

  const { allOperations } = useAppSelector((state) => state.operations)
  const dispatch = useAppDispatch()


  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align='center'>
        Lista de operaciones
      </Typography>

      {allOperations.map((operation) => (

        <Card key={operation.name} sx={{ margin: '10px 0' }}>
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
              Estado: {operation.isActive ? 'Activa' : 'Inactiva'}
            </Typography>
          </CardContent>
        </Card>

      ))}

    </Container>
  )
}
