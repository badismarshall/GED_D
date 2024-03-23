'use client'
import React, { useMemo, useState } from 'react'
import { Separator } from '../ui/separator'
import { PaginationState } from '@tanstack/react-table'
import { EmployeeTablecolumns } from '@/types/personaldocumentClolumnTypes'
import { DataTable } from '../table/data-table'
import FileUploader from './FileUploader'

const EmployeDetailsProfileDocuments = () => {
    const [file, setFile] = useState<File[]>([]);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 0,
    }
    )
    const fetchDataOptions = {
        pageIndex,
        pageSize,
    }

    const pagination = useMemo(
        () => ({
          pageIndex,
          pageSize,
        }),
        [pageIndex, pageSize]
      )

  return (
    <div>
        <h3 className="text-lg font-medium my-2">Ajouter Documents personnelles</h3>
        <Separator className='mb-3'/>
        <FileUploader
          fieldChange={setFile}
        />
        <div>
            <h3 className="text-lg font-medium my-4">Documents Recents</h3>
            <Separator />
            <DataTable
                columns={EmployeeTablecolumns}
                data={[]}
                pagination={pagination}
                PaginationChange={setPagination}
                pages={2}
        />
        </div>
    </div>
  )
}

export default EmployeDetailsProfileDocuments