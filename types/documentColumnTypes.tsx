import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { arSA } from 'date-fns/locale';
import Link from "next/link";

export type MessageCol = {
    fileid: string, /* L'id de ficheir dans la base des données (CMS)*/
    title: string /* Titre du documen*/
    number: number, /* Numéro de document */
    datereceipt: string, /* Date de réception */
    sendingdate: string, /* Date d'envoi */
    nbattachment: number, /* Nombre de pièces jointes */
    messagefile: URL, /* Fichier de message */
  }

  export const DocumentTablecolumns: ColumnDef<MessageCol>[] = [
    {
      accessorKey: "title",
      header: () => <div className="text-start">Titre</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue('title')}</div>,
    },
    {
      accessorKey: "number",
      header: () => <div className="text-center">Numero d'Envoi Message</div>,
      cell: ({ row }) => <div className="text-center">{row.getValue('number')}</div>,
    },
    {
      accessorKey:'datereceipt',
      header: () => <div className="text-center">Date de Réception</div>,
      cell: ({ row }) => <div className="text-center">{
        format(parseISO(row.getValue('datereceipt')), "PPPP", {
          locale : arSA,
        })
        }</div>,
    },
    {
      accessorKey:'sendingdate',
      header: () => <div className="text-center">Date d'Envoi</div>,
      cell: ({ row }) => <div className="text-center">{
        format(parseISO(row.getValue('sendingdate')), "PPPP",{
          locale : arSA,
        })       
        }</div>,
    },
    {
      accessorKey:'nbattachment',
      header: () => <div className="text-center">Nombre d'Attachements</div>,
      cell: ({ row }) => <div className="text-center">{row.getValue('nbattachment')}</div>,
    },
    {
          accessorKey:'fileid',
          header: () => <div className="text-center">Fichier de Message</div>,
          cell: ({ row }) => 
            <div className="flex justify-center">
              <Link href={`/pdf-viewer/${row.getValue('fileid')}`}>
                <img
                  src="/public/assets/icons/filepdf_icon.png"
                  alt='filepdf_icon'
                  className="w-8 h-8 "
                />
              </Link>
            </div>,
    }
  ]
