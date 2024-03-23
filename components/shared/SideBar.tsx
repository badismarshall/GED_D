import Image from 'next/image'
import React from 'react'
import { Separator } from '../ui/separator'
import { SidebarNav } from '../ui/sidebar-nav'

const SideBar = ({
    children,
    sidebarNavItems,
    title,
    description
  }: Readonly<{
    children: React.ReactNode;
    sidebarNavItems: { title: string; href: string}[];
    title: string;
    description: string
  }>) => {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">
              {description}
            </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
                <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1">{children}</div>
        </div>
      </div>
      </>
  )
}

export default SideBar