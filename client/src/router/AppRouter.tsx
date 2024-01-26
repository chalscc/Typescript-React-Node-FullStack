import { Navigate, Route, Routes } from "react-router-dom"
import OperationsPage from "../features/operations/OperationsPage"
import MarketersPage from "../features/marketers/MarketersPage"
import { Navbar } from "../components/ui/Navbar"

export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="operations" element={<OperationsPage />} />
        <Route path="marketers" element={<MarketersPage />} />

        <Route path="/" element={<Navigate to="operations" />} />
      </Routes>
    </>
  )
}