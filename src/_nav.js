import CIcon from '@coreui/icons-react'
import {  cilPuzzle, cilSpeedometer} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
 
  {
    component: CNavGroup,
    name: 'Category',
    to: '/category',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/category/add',
      },
      {
        component: CNavItem,
        name: 'View',
        to: '/category/about',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Sub Category',
    to: '/subcategory',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/subcategory/add',
      },
      {
        component: CNavItem,
        name: 'View',
        to: '/subcategory/about',
      },
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Product',
    to: '/product',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/product/add',
      },
      {
        component: CNavItem,
        name: 'View',
        to: '/product/about',
      },
      
    ],
  }
]

export default _nav
