'use client'
 
import { headerLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'

const NavBar = () => {
    const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4  md:flex">
                <a href="/" className="text-lg font-bold text-primary">Logo</a>
            </div>
            <div className="flex items-center space-x-4 list-none">
                {
                    headerLinks.map((link) => {
                        const isActive = pathname === link.route
                        return (
                            <li key={link.route} className='hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block'>
                                <Link
                                    href={link.route}
                                    >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    }
                    )
                }
            </div>
        </div>
        <Button
        //   href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-2 md:right-8"
          )}
        >
          Déconnecter
        </Button>
    </header>
  )
}

export default NavBar

