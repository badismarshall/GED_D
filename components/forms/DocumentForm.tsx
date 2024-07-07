"use client"

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MessageValidation } from "@/lib/validation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { arSA } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FileUploader from "../shared/FileUploader"

const DocumentForm = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()


    // 1. Define your form.
    const form = useForm<z.infer<typeof MessageValidation>>({
        resolver: zodResolver(MessageValidation),
      })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof MessageValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)
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
        <FormField
          control={form.control}
          name="title"
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
                <FormLabel className="" >Titre</FormLabel>
              </div>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le titre du message (ex: Message de la DRNSI)
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="datereceipt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/calendar_icon.png" 
                  alt="title" 
                   className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="">Date de Réception</FormLabel>
             </div> 
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
                    locale={arSA}
                    // dir="rtl"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-gray-400">
                La date de réception du message (ex: 01/01/2021)
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sendingdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/sendingdate_icon.png" 
                  alt="title" 
                  className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="">Date d'Envoi</FormLabel>
              </div>
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
                        format(field.value, "PPPP",{
                          locale : arSA,
                        })
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                  locale={arSA}
                //   dir="rtl"
                  className="!visible"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-gray-400">
                La date d'envoi du message (ex: 01/01/2021)
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/message_number_icon.png" 
                  alt="title" 
                  className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel>Numero d'Envoi Message</FormLabel>
              </div>
              <FormControl>
                <Input type='number' className="shad-input" {...field}/>
              </FormControl>
              <FormDescription className="text-gray-400">
                La Numéro d'envoi du message (ex: 1, 2, 3, etc.)
              </FormDescription>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nbattachments"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/attachmentsnumber_icon.png" 
                  alt="title" 
                  className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel>Nombre d'Attachements</FormLabel>
              </div>
              <FormControl>
                <Input type='number' className="shad-input" {...field}/>
              </FormControl>
              <FormDescription className="text-gray-400">
                Le nombre d'attachements du message (PDF, etc.)
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="expediteur"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center">
                <img 
                  src="/public/assets/icons/sender_icon.png" 
                  alt="title" 
                  className="w-[30px] h-[30px] mr-2"
                />
               <FormLabel>Expéditeur</FormLabel>
              </div>
              <FormControl>
                <Combobox 
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                L'expéditeur du message (établissement, ministère, etc.)
              </FormDescription>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <img 
                  src="/public/assets/icons/filepdf_icon.png" 
                  alt="title" 
                  className="w-[30px] h-[30px] mr-2"
                /> */}
                <FormLabel className="shad-form_label">Le Fichier du message</FormLabel>
              </div>
              <FormControl>
                  <FileUploader 
                      fieldChange={field.onChange}
                  />
              </FormControl>
              <FormDescription className="text-gray-400">
                Le fichier PDF du message (ex: message.pdf)
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrived"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {
                  /* <img 
                    src="/public/assets/icons/messagetype_icon.png" 
                    alt="title" 
                    className="w-[30px] h-[30px] mr-2"
                  /> */
                }
                <FormLabel>Type du message</FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type du message" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="false">Sortant الصادر</SelectItem>
                  <SelectItem value="true">Entrant الوارد</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-gray-400">
                Le type du message (entrant الوارد) ou (sortant الصادر)
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className=""
        //   disabled={isLoadingCreate}
        >
          {/* {isLoadingCreate && 'Loading...'} */}
          Ajouter un message
        </Button>
      </form>
    </Form>
  )
}

export default DocumentForm