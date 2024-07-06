import SideBar from '@/components/shared/SideBar'
import React from 'react'

const sidebarNavItems = [
    {
      title: "Profile",
      href: "/forms",
    },
    {
      title: "Account",
      href: "dashboard/account",
    },
    {
      title: "Appearance",
      href: "/forms/appearance",
    },
    {
      title: "Notifications",
      href: "/forms/notifications",
    },
    {
      title: "Display",
      href: "/forms/display",
    },
  ]

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        {/* we need to passsidebarNavItems to the SideBar component */}
        <SideBar 
          sidebarNavItems={sidebarNavItems}
          title='Tableau de board'
          description='Manage your account settings and set e-mail preferences.'
        >
            { children }
        </SideBar> 
        
    </div>
  )
}

export default layout