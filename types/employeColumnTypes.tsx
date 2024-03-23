import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import {Eye, Pencil} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions"

export type EmployeeCol = {
    id: string, /* Identifiant */
    name: string, /* Nom */
    phone: string, /* Téléphone */
    rank: string,  /* Grade */
    registrationNumber: string, /* Matricule */
    job: string, /* Emploi ou Poste */
    portrait: string
  }

    export const EmployeeTablecolumns: ColumnDef<EmployeeCol>[] = [
        {
        accessorKey: "name",
        header: () => <div className="text-start">Nom</div>,
        cell: ({ row }) => 
        <div className="text-start">
            <div className="flex gap-2 items-center">
            <Avatar>
                <AvatarImage src={row.original.portrait} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                {row.getValue('name')}
                <h2 className="pl-4 text-xs text-muted-foreground">@DRNSI</h2>
            </div>
            </div>
        </div>,
        },
        {
        accessorKey: "phone",
        header: () => <div className="text-center">Téléphone</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('phone')}</div>,
        },
        {
        accessorKey:'rank',
        header: () => <div className="text-center">Grade</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('rank')}</div>,
        },
        {
        accessorKey:'registrationNumber',
        header: () => <div className="text-center">Matricule</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('registrationNumber')}</div>,
        },
        {
        accessorKey:'job',
        header: () => <div className="text-center">Emploi</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('job')}</div>,
        },
        // {
        // accessorKey:'id',
        // header: () => <div className="text-center">Actions</div>,
        // cell: ({ row }) => 
        //     <div className="flex justify-center items-center gap-4">
        //         <Link href={`/employee/${row.getValue('id')}`}>
        //             <Eye className="ml-auto h-6 w-6 opacity-50" />
        //         </Link>
        //         <Link href={`/employee/${row.getValue('id')}`}>
        //             <Pencil className="ml-auto h-4 w-4 opacity-50"/>
        //         </Link>
        //     </div>,
        // },
        {
            id:"actions",
            cell: ({ row }) => <DataTableRowActions row={row} />,
        }
    ]
