'use client'

import React, { useMemo, useState } from 'react'
import { DataTable } from '../table/data-table'
import { EmployeeCol, EmployeeTablecolumns } from '@/types/employeColumnTypes'
import { PaginationState } from '@tanstack/react-table'

const exampleData : EmployeeCol[] = [
  {
    id: '1',
    name: "John Doe",
    phone: "1234567890",
    rank: "Rank",
    registrationNumber: "123456",
    job: "Job",
    portrait: "/assets/images/OussamaIa.webp"
  },
  {
    id: '2',
    name: "John Doe",
    phone: "1234567890",
    rank: "Rank",
    registrationNumber: "123456",
    job: "Designer",
    portrait: "/assets/images/OussamaIa.webp"
  }

]
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
            columns={EmployeeTablecolumns}
            data={exampleData}
            pagination={pagination}
            PaginationChange={setPagination}
            pages={2}
        />   
    </>
  )
}

export default Navigatedocument