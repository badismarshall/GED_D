import SideBar from '@/components/shared/SideBar'
import React from 'react'

const sidebarNavItems = [
    {
      title: "Ajouter",
      href: "/employees",
    },
    {
      title: "Naviguer",
      href: "/employees/navigate",
    },
  ]


const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        <SideBar 
          sidebarNavItems={sidebarNavItems}
          title='Employés'
          description='Gérez votre employé.'
          >
            {children}
        </SideBar> 
        
    </div>
  )
}

export default layout