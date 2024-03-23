import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";

export type PersonalDocument = {
    id: string, /* Identifiant du Document Personel */
    name: string /* Nom du Document */
}

export const EmployeeTablecolumns: ColumnDef<PersonalDocument>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-start">Nom</div>,
        cell: ({ row }) => <div className="text-start">{row.getValue('name')}</div>,
    },
    {
        accessorKey:'id',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => 
            <div className="flex justify-center">
            <Link href={`/employee/${row.getValue('id')}`}>
                <img
                src="/public/assets/icons/edit_icon.png"
                alt='edit_icon'
                className="w-8 h-8 "
                />
            </Link>
            <Link href={`/employee/${row.getValue('id')}`}>
                <img
                src="/public/assets/icons/delete_icon.png"
                alt='delete_icon'
                className="w-8 h-8 "
                />
            </Link>
            </div>,
    }
]