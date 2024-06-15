import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { format, parseISO } from "date-fns"
import { fr } from 'date-fns/locale';
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions";

type Metadata = {
  mimetype: string;
}

export type PersonalDocument = {
    id: number, /* Identifiant du Document */
    created_at: string, /* Date de création du Document */
    name: string /* Nom du Document */
    metadata: Metadata, /* Type de fichier */
    path_tokens: string[], /* Chemin du fichier */
}

export const EmployeeDocumentsTablecolumns: ColumnDef<PersonalDocument>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "path_tokens",
        header: () => <div className="text-start">Nom</div>,
        cell: ({ row }) =>  { 
          const path_tokens = row.getValue('path_tokens') as string[]
          const fileName = path_tokens[path_tokens.length - 1]
          return (
           <div className="text-start">
            { fileName }
           </div>
        )
      },
    },
    {
        accessorKey:'created_at',
        header: () => <div className="text-center">Date d'ajout</div>,
        cell: ({ row }) => <div className="text-center">{
          format(parseISO(row.getValue('created_at')), "PPPP", {
            locale : fr,
          })
          }</div>,

                // {/* <Link href={`/employee/${row.getValue('id')}`}>
                //     <img
                //     src="/public/assets/icons/edit_icon.png"
                //     alt='edit_icon'
                //     className="w-8 h-8 "
                //     />
                // </Link>
                // <Link href={`/employee/${row.getValue('id')}`}>
                //     <img
                //     src="/public/assets/icons/delete_icon.png"
                //     alt='delete_icon'
                //     className="w-8 h-8 "
                //     />
                // </Link> */}

    },
    {
      accessorKey: 'metadata',
      header: () => <div className="text-center">Type</div>,
      cell: ({ row }) => {
        const metadata = row.getValue('metadata') as any
        const mimetype = metadata.mimetype as string
        return(
        <div className="text-center">
          { mimetype }
        </div>
     )
    },

    },
    {
      // id: 'name',
      accessorKey: 'name',
      header: () => <div></div>,
      cell: ({ row }) => <DataTableRowActions row={row} />,
    }
]
