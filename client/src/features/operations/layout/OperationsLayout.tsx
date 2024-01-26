import { Box } from '@mui/material'


export const OperationsLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,        
        display: 'flex',
      }}
    >
      {children}
    </Box>
  )
}
