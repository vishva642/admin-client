import { CCard } from '@coreui/react'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
   return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
      </CCard>
      <WidgetsBrand className="mb-4" withCharts />
    </>
  )
}

export default Dashboard
