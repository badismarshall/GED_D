"use client"

import { EmployeValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from '../ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { arSA } from 'date-fns/locale'
import { Calendar } from '../ui/calendar'
import { CalendarIcon} from 'lucide-react'
import { format, set } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
// import FileUploader from '../shared/FileUploader'
// import ProfileUploader from '../shared/ImageUploader'
import { useToast } from "@/components/ui/use-toast"
import { addEmployee, getAllBloods, getAllJobs, getAllProvinces, getAllRanks } from '@/lib/supabase/api'
import { Icons } from '../ui/icons'
import { IBlood, IJob, IProvince, IRank } from '@/types/typesParam'
import { createClient } from '@/lib/supabase/client'
import EmployeePortraitUploader from '../shared/EmployeePortraitUploader'
import { useUploadEmployeeFile } from '@/lib/react-query/quriesAndmutations'

 function EmployeForm () {
  const initialStateFile: any[] = [];
  const [files, setFiles] = useState(initialStateFile)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [provinces, setProvinces] = useState<IProvince[]>([])
  const [bloods, setBlood] = useState<IBlood[]>([])
  const [ranks, setRanks] = useState<IRank[]>([])
  const [jobs, setJobs] = useState<IJob[]>([])
  const { toast } = useToast()
  const supabase = createClient()

    // 1. Define your form.
    const form = useForm<z.infer<typeof EmployeValidation>>({
        resolver: zodResolver(EmployeValidation),
    })
      // const { mutateAsync: uploadEmployeeFile, isPending : isLoadingUpload } = useUploadEmployeeFile()
    
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof EmployeValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)
        if (files.length > 0) {
          const { data, error } = await supabase.storage
            .from('employeefiles')
            .upload(`private/${values.registrationNumber}/${Date.now()}_${files[0].name}`, files[0])
          if (error) {
            console.error('Error uploading file: ', error)
            toast({
              title: "échec du téléchargement de l'image de profil",
              variant: "destructive",
            })
            return error
          } else {
            const { error } = await supabase.from('employee').insert(
              {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  registrationnumber: values.registrationNumber,
                  phonenumber: values.phoneNumber,
                  dateofbridth: values.dateOfBridth,
                  address: values.address,
                  personalId: values.personalId,
                  healthInsurancenumber: values.healthInsuranceNumber,
                  sex: values.sex == 'M' ? true : false,
                  path_profile_image: data.path,
                  job: values.job,
                  blood: values.blood,
                  province: values.province,
                  rank_id: values.rank,
              })

              if(!error) {
                toast({
                  title: "Employé ajouté avec succès",
                })
              } else {
                toast({
                  title: "Erreur lors de l'ajout d'employé",
                })     
              }
          }
        }
        setIsLoading(false)
      }

    useEffect(() => {
      const getProvinces = async() => {
        const { provinces, error } =  await getAllProvinces()
        provinces && setProvinces(provinces as IProvince[])
      }
      const getBloods = async() => {
        const { bloods, error } = await getAllBloods()
        bloods && setBlood(bloods as IBlood[])
      }
      const getRanks = async() => {
        const { ranks, error } = await getAllRanks()
        ranks && setRanks(ranks as IRank[])
      }
      const getJobs = async() => {
        const { jobs, error } = await getAllJobs()
        jobs && setJobs(jobs as IJob[])
      }
      getRanks()
      getProvinces()
      getJobs()
      getBloods()
    }, [])

    const updateFiles = (file: File) => {
      setFiles([file])
    };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
       <div className='flex w-full justify-start gap-20'>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Nom</FormLabel>
              </div>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Nom d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Prénom</FormLabel>
              </div>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Prénom d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
      </div>
      <div className='flex w-full justify-start gap-20'>
          <FormField
            control={form.control}
            name="rank"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  {/* <img 
                    src="/public/assets/icons/banner_title.png" 
                    alt="title" 
                    className="w-[30px] h-[30px] mr-2"
                  /> */}
                  <FormLabel className="" >Grade</FormLabel>
                </div>
                <FormControl>
                  {/* <Input type="text" className="" {...field} /> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className='text-primary' placeholder="Selectioner le grade d'employé." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      ranks.length > 0 && ranks.map((rank) => (
                        <SelectItem key={ rank.id } value={ rank.id.toString() } className="hover:bg-primary-foreground hover:text-primary" >
                          { rank.lib_fr }
                          {/* <div className='flex justify-between gap-16'>
                              { rank.id }
                              <span className='ml-2 text-primary'>{ rank.lib_fr }</span>
                          </div> */}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                </FormControl>
                <FormDescription className="text-gray-400">
                  Le Grade d&apos;employé.
                </FormDescription>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  {/* <img 
                    src="/public/assets/icons/banner_title.png" 
                    alt="title" 
                    className="w-[30px] h-[30px] mr-2"
                  /> */}
                  <FormLabel className="" >Emploi</FormLabel>
                </div>
                <FormControl>
                  {/* <Input type="text" className="" {...field} /> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className='text-primary' placeholder="Selectioner l'emploi de l'employée." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        jobs.length > 0 && jobs.map((job) => (
                          <SelectItem key={ job.id } value={ job.id.toString() } className="hover:bg-primary-foreground hover:text-primary">
                              {job.lib_fr}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-gray-400">
                  L&apos;emploi d&apos;employé.
                </FormDescription>
                <FormMessage className="" />
              </FormItem>
            )}
          />
      </div>
        <FormField
          control={form.control}
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Matricule</FormLabel>
              </div>
              <FormControl>
                <InputOTP
                  className="w-full"
                  maxLength={12}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0,4).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(4,7).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(7).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    </>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Matricule d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Numéro de téléphone</FormLabel>
              </div>
              <FormControl>
              <InputOTP
                  maxLength={10}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0,2).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(2,4).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(4,6).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(6,8).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(8,10).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    </>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le numéro de téléphone d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBridth"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Date de naissance</FormLabel>
              </div>
              <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal border-0",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPPP", {
                          locale : arSA,
                        })
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                   {/* !!!!!!!!! the  dateOfBridth is -1 day*/}
                  <Calendar
                    captionLayout='dropdown'
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    locale={arSA}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className=''
                  />
                </PopoverContent>
              </Popover>
              </FormControl>
              <FormDescription className="text-gray-400">
                La date de naissance d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Wilaya de naissance</FormLabel>
              </div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectioner la province de naissance " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      provinces.map((province) => (
                        <SelectItem key={ province.id } value={ province.id.toString() } className="hover:bg-primary-foreground hover:text-primary" >
                          <div className='flex justify-between gap-16'>
                              <span className='ml-2'>{ province.ar_name }</span>
                          </div>
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-400">
                La province de naissance d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Address</FormLabel>
              </div>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormDescription className="text-gray-400">
                L&apos;address d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Matricule civile</FormLabel>
              </div>
              <FormControl>
              <InputOTP
                  maxLength={18}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    </>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Matricule civile d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="healthInsuranceNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Numéro d&apos;assurence</FormLabel>
              </div>
              <FormControl>
              <InputOTP
                  maxLength={12}
                  render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Numéro d&apos;assurence d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Sexe</FormLabel>
              </div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectioner le sexe " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M" className="hover:bg-primary-foreground hover:text-primary" >
                      <div className='flex justify-between gap-16'>
                        Homme
                      </div>
                    </SelectItem>
                    <SelectItem value="F" className="hover:bg-primary-foreground hover:text-primary" >
                      <div className='flex justify-between gap-16'>
                        Femme
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Sexe d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portrait"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {
                  /* <img 
                    src="/public/assets/icons/banner_title.png" 
                    alt="title" 
                    className="w-[30px] h-[30px] mr-2"
                  /> */
                }
                <FormLabel className="" >Portrait</FormLabel>
              </div>
              <FormControl>
                {/* <ProfileUploader
                  fieldChange={field.onChange}
                  mediaUrl={field.value?.toString() || ""}
                  setFiles={setFiles}
                /> */}
                <EmployeePortraitUploader
                  files={ files }
                  onUpdateFiles={ updateFiles }
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Une image d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="blood"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {
                  /* <img 
                    src="/public/assets/icons/banner_title.png" 
                    alt="title" 
                    className="w-[30px] h-[30px] mr-2"
                  /> */
                }
                <FormLabel className="">Groupe sanguin</FormLabel>
              </div>
              <FormControl>
              <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectioner le groupe sanguin " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      bloods.map((blood) => (
                        <SelectItem key={ blood.id } value={ blood.id.toString() } className="hover:bg-primary-foreground hover:text-primary" >
                          <div className='flex justify-between gap-16'>
                            {/* { blood.id } */}
                            <span className='ml-2'>{blood.lib_fr}</span>
                          </div>
                        </SelectItem>
                      )) 
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Groupe sanguin d&apos;employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          disabled={isLoading}
          className=""
        >
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
            Ajouter un employé
        </Button>
        </form>
    </Form>
  )
}

export default EmployeForm