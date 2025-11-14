import  { useEffect, useState, useRef } from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilArrowBottom, cilArrowTop } from '@coreui/icons'
import { getStyle } from '@coreui/utils'
import axios from 'axios'

const WidgetsDropdown = (props) => {
  const [counts, setCounts] = useState({
    categories: 0,
    subcategories: 0,
    products: 0,
    invests: 0,
  })

  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, subRes, prodRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/category`),
          axios.get(`${import.meta.env.VITE_API_URL}/subCategory`),
          axios.get(`${import.meta.env.VITE_API_URL}/product`),
        ])

        const categories = catRes.data.category?.length || 0
        const subcategories = subRes.data.records?.length || 0
        const productsData = prodRes.data.records || []
        const products = productsData.length
        const invests = productsData.reduce((acc, item) => acc + (Number(item.p_price) || 0), 0)
        setCounts({ categories, subcategories, products, invests })
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {/* Total Categories */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={<>{counts.categories}</>}
          title="Total Categories"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Refresh</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Categories',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [10, 20, 30, 40, 50, 60, counts.categories],
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
              }}
            />
          }
        />
      </CCol>

      {/* Total Subcategories */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={<>{counts.subcategories}</>}
          title="Total Subcategories"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Refresh</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Subcategories',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [5, 15, 25, 35, 45, 55, counts.subcategories],
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
              }}
            />
          }
        />
      </CCol>

      {/* Total Products */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={<>{counts.products}</>}
          title="Total Products"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Refresh</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Products',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [15, 25, 35, 45, 55, 65, counts.products],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
              }}
            />
          }
        />
      </CCol>

      {/* Total Price */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={<>₹ {counts.invests}</>}
          title="Total Products Price"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Refresh</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Total Price',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [100, 200, 300, 400, 500, 600, counts.invests],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
