import { Navigate, Route, Routes } from "react-router-dom"
import { OperationsPage, MarketersPage } from "../features"
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