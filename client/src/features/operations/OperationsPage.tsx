import { OperationsLayout } from './layout/OperationsLayout'
import { Form } from './components/form/Form'
import { List } from './components/list/List'

export function OperationsPage() {
  
  return (

    <OperationsLayout>
      <List />
      <Form />
    </OperationsLayout>

  )
}
