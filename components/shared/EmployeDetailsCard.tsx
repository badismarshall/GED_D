import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
  
const EmployeDetailsCard = ({ id }: { id: string }) => {
    return (
        <div className='min-w-[250px]'>
            <Card className='w-full px-4'>
                <CardHeader className='flex items-center flex-col '>
                        <div className='w-[100px] h-[100px] rounded-full'>
                            <Image
                                src="/assets/images/OussamaIA.webp"
                                alt="employe"
                                width={100}
                                height={100}
                                className='rounded-full'
                            />
                        </div>
                        <div className='text-lg font-medium'>BadisMarshall</div>
                    <CardDescription>Colonel</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col items-start gap-2'>
                        <div className='flex gap-2 justify-center items-center'>
                            <Image
                                src="/assets/icons/phoneicon.png"
                                alt="phone"
                                width={20}
                                height={20}
                            />
                            <h2>0555172014</h2>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src="/assets/icons/registrationnumbericon.png"
                                alt="registrationnumber"
                                width={20}
                                height={20}
                                className='opacity-50'
                            />
                            <h2>201716001482</h2>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src="/assets/icons/provinceicon.png"
                                alt="province"
                                width={20}
                                height={20}
                                className='opacity-40' 
                            />
                            <h2>Alger</h2>
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-sm text-muted-foreground'>Fontion</h2>
                        <h2>CTRNSI</h2>
                    </div>  
                </CardFooter>
            </Card>

        </div>
    )
}

export default EmployeDetailsCard