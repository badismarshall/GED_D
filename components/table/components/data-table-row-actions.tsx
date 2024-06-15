"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteFileOfEmployee, downloadFileOfEmployee } from "@/lib/supabase/api"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const path_tokens = row.getValue('path_tokens') as string[]
  const fileName = path_tokens[path_tokens.length - 1]

  async function downloadFileFromStorage(action: string) {
    try {
      const data = await downloadFileOfEmployee(row.getValue('name'))
      if(data) {
        const response = await fetch(data.publicUrl)
        if(!response) {
          throw Error('Probleme de réseau')
        }

        const fileName = path_tokens[path_tokens.length - 1]

        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        if(action == 'open') {
          window.open(blobUrl,'_blank')
       }
       else {
          const link = document.createElement('a')

          link.href = blobUrl
          link.setAttribute('download', fileName)
          document.body.append(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(blobUrl)
        }
      }

    } catch (error) {
      console.log(error)
    }
    
  }

  async function deleteFileFromStorage() {
    const data = await deleteFileOfEmployee(row.getValue('name'))
    console.log('delete file', data)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => downloadFileFromStorage('open') }>Consulter</DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadFileFromStorage('download') }>Télécharger</DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
           <Button variant="ghost" className="p-2 flex w-full justify-start">Supprimer</Button>
          </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`Cette action est irréversible. Voulez-vous vraiment supprimer ce fichier ?`}
                  <p className="text-red-400">{`"${fileName}"`}</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ deleteFileFromStorage } 
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Continue
                </AlertDialogAction>
              </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}