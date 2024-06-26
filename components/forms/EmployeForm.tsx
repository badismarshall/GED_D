"use client"

import { EmployeValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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
import { format } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { wilayaS } from '@/lib/wilayas'
import FileUploader from '../shared/FileUploader'
import ProfileUploader from '../shared/ImageUploader'


const EmployeForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof EmployeValidation>>({
        resolver: zodResolver(EmployeValidation),
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof EmployeValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // const newmessage = createMessage({
        // ...values,
        // nbattachments: Number(values.nbattachments),
        // number: Number(values.number),
        // arrived: values.arrived === 'true' ? true : false,
        //  })
    }

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
                Le Nom d'employé.
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
                Le Prénom d'employé.
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
                  <Input type="text" className="" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Le Grade d'employé.
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
                  <Input type="text" className="" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  L'emploi d'employé.
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
                Le Matricule d'employé.
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
                <FormLabel className="" >Numéro Tel</FormLabel>
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
                Le numéro de téléphone d'employé.
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
                La date de naissance d'employé.
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
                <FormLabel className="" >Wilaya</FormLabel>
              </div>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectioner la wilaya de naissance " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      wilayaS.map((wilaya, index) => (
                        <SelectItem key={index} value={wilaya.code} className="hover:bg-primary-foreground hover:text-primary" >
                          <div className='flex justify-between gap-16'>
                            {wilaya.code}
                            <span className='ml-2'>{wilaya.ar_name}</span>
                            
                          </div>
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-400">
                La wilaya de naissance d'employé.
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
                L'address d'employé.
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
                Le Matricule civile d'employé.
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
                <FormLabel className="" >Numéro d'assurence</FormLabel>
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
                Le Numéro d'assurence d'employé.
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
                Le Sexe d'employé.
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
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Portrait</FormLabel>
              </div>
              <FormControl>
                <ProfileUploader
                  fieldChange={field.onChange}
                  mediaUrl={field.value?.toString() || ""}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Une image d'employé.
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
                {/* <img 
                  src="/public/assets/icons/banner_title.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="" >Groupe sanguin</FormLabel>
              </div>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectioner le groupe sanguin " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A+" className="hover:bg-primary-foreground hover:text-primary" >
                      A+
                    </SelectItem>
                    <SelectItem value="A-" className="hover:bg-primary-foreground hover:text-primary" >
                      A-
                    </SelectItem>
                    <SelectItem value="AB-" className="hover:bg-primary-foreground hover:text-primary" >
                      AB-
                    </SelectItem>
                    <SelectItem value="AB+" className="hover:bg-primary-foreground hover:text-primary" >
                      AB+
                    </SelectItem>
                    <SelectItem value="B+" className="hover:bg-primary-foreground hover:text-primary" >
                      B+
                    </SelectItem>
                    <SelectItem value="B-" className="hover:bg-primary-foreground hover:text-primary" >
                      B-
                    </SelectItem>
                    <SelectItem value="O+" className="hover:bg-primary-foreground hover:text-primary" >
                      O+
                    </SelectItem>
                    <SelectItem value="O-" className="hover:bg-primary-foreground hover:text-primary" >
                      O+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-400">
                Le Groupe sanguin d'employé.
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className=""
        //   disabled={isLoadingCreate}
        >
          {/* {isLoadingCreate && 'Loading...'} */}
            Ajouter un employé
        </Button>
        </form>
    </Form>
  )
}

export default EmployeForm