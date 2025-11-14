// import React from 'react'
// import {
//   CAvatar,
//   CBadge,
//   CDropdown,
//   CDropdownDivider,
//   CDropdownHeader,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
// } from '@coreui/react'
// import {
//   cilBell,
//   cilCreditCard,
//   cilCommentSquare,
//   cilEnvelopeOpen,
//   cilFile,
//   cilLockLocked,
//   cilSettings,
//   cilTask,
//   cilUser,
// } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'
// import { NavLink } from 'react-router-dom'

// const AppHeaderDropdown = () => {
//   return (
//     <CDropdown variant="nav-item">
//       <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
//         <CAvatar src={avatar8} size="md" />
//       </CDropdownToggle>
//       <CDropdownMenu className="pt-0" placement="bottom-end">
//         <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
//         <CDropdownItem href="#">
//           <NavLink className="text-dark" to="/profile">Profile</NavLink>
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilSettings} className="me-2" />
//           Settings
//         </CDropdownItem>
//         <CDropdownDivider />
//       </CDropdownMenu>
//     </CDropdown>
//   )
// }

// export default AppHeaderDropdown


import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { NavLink, useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.avatar) {
        setProfilePic(parsedUser.avatar)
      }
    }
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('token')   // clear saved token
    navigate('/login')                 // redirect to login page
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={profilePic || 'https://via.placeholder.com/150'} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* Profile */}
        <CDropdownItem as={NavLink} to="/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        {/* Settings */}
        <CDropdownItem as={NavLink} to="/settings">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>

        <CDropdownDivider />

        {/* Logout */}
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
