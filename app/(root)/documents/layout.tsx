import SideBar from '@/components/shared/SideBar'
import React from 'react'

const sidebarNavItems = [
    {
      title: "Ajouter",
      href: "/documents/",
    },
    {
      title: "Supprimer",
      href: "/documents/delete",
    },
    {
      title: "Modifer",
      href: "/documents/update",
    },
    {
      title: "Naviguer",
      href: "/documents/navigate",
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
          title='Documents'
          description='Gérez les paramètres de vos Documents et définissez vos préférences de messagerie.'
          >
            {children}
        </SideBar> 
        
    </div>
  )
}

export default layout