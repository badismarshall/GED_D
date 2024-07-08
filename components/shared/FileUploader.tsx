'use client'

import { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Upload, BadgeCheck } from 'lucide-react'
import Image from 'next/image'

type FileUploaderProps = {
    file: File[];
    setFile: (files : File[]) => void;
    setFileUrl: (url : string) => void;
    fileUrl: string;
}

const FileUploader = ({setFile, file, setFileUrl, fileUrl}: FileUploaderProps) => {
        // const [file, setFile] = useState<File[]>([]);
        // const [fileUrl, setFileUrl] = useState<string>('');

        const onDrop = useCallback((acceptedFiles : FileWithPath[]) => {
            setFile(acceptedFiles)
            // fieldChange(acceptedFiles)
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
            console.log('file: ', fileUrl)
          }, [file])
        // accept images 
        const {getRootProps, getInputProps} = useDropzone({
            onDrop, 
            accept: {
                'application/pdf' : ['.pdf'],
                'application/msword' : ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : ['.docx'],
                'application/vnd.ms-excel' : ['.xls', '.xlsx'],
                'image/jpeg': ['.jpeg'],
                'image/png': ['.png'],
            }
        })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer transition ease-in-out duration-200'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl ? (
          <>
            <div className='flex flex-col justify-center items-center w-full p-5 lg:p-10 bg-slate-100 rounded-2xl'>
              <BadgeCheck className="h-10 w-10 text-green-500"/>
              <p className='font-inter'>{file[0]?.name}</p>
                <p>
                    Fichier Ajouté avec succès
                </p>
              {/* display file name */}
              <p className='text-slate-600 text-center pt-2'>Cliquez ou faites glisser pour remplacer</p>
            </div>
          </>

        ) : (
            <div className='flex items-center flex-col py-7 bg-slate-100 rounded-2xl'> 
              <Image
                src="/assets/images/uploadDocuments.png"
                alt="fileupload"
                width={100}
                height={100}
                className="h-20 w-20"
              />
              <h3 className='base-meduim text-light-2 mb-2 mt-6'>Faites glisser le fichier ici</h3>
              <p className='text-light-4 small-regular mb-6'>PDF, DOC, DOCX, XLS, JPEG, PNG</p>
              <Upload className="h-4 w-4 opacity-50"/>
            </div>

        )
      }
    </div>
  )
}

export default FileUploader