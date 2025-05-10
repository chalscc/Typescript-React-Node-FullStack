import { Navigate, Route, Routes } from "react-router-dom"
import { OperationsPage, MarketersPage } from "../features"
import { Navbar } from "../components/ui/Navbar"
// This is an edited comment using git rebase
export const AppRouter = () => {
  console.log('Test in router')
  console.log('Test 2')
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
