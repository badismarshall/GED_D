import SideBar from '@/components/shared/SideBar'
import React from 'react'

const sidebarNavItems = [
    {
      title: "Intranet",
      href: "network/Intranet",
    },
    {
      title: "Internet",
      href: "network/internet",
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
          title='Réseau'
          description='Gérez vos paramètres réseau et définissez vos préférences de messagerie.'
          >
            {children}
        </SideBar> 
        
    </div>
  )
}

export default layout