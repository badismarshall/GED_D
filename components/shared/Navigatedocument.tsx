'use client'

import React, { useMemo, useState } from 'react'
import { DataTable } from '../table/data-table'
import { DocumentTablecolumns } from '@/types/documentColumnTypes'
import { PaginationState } from '@tanstack/react-table'

const Navigatedocument = () => {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 2,
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

    //   const pages = useMemo(() => {
    //     console.log(MessagesData?.total ? Math.ceil(MessagesData.total / pageSize) : 0)
    //     return MessagesData?.total ? Math.ceil(MessagesData.total / pageSize) : 0;
    //   }, [MessagesData?.total, pageSize]);
  return (
    <>
        <DataTable
            columns={DocumentTablecolumns}
            data={[]}
            pagination={pagination}
            PaginationChange={setPagination}
            pages={2}
        />   
    </>
  )
}

export default Navigatedocument