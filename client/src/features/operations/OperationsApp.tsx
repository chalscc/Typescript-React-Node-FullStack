import { OperationsLayout } from './layout/MarketersLayout'
import { Form } from './components/form/Form'
import { List } from './components/list/List'

import './OperationsApp.css'

function OperationsApp() {
  
  return (

    <OperationsLayout>
      <List />
      <Form />
    </OperationsLayout>

  )
}

export default OperationsApp
