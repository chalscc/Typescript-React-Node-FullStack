import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

// Metodos `useDispatch` y `useSelector` tipados
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()