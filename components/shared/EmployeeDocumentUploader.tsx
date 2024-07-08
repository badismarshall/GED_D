'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize)


type EmployeeDocumentUploaderProps = {
    files: any[];
    setFiles: (files: any[]) => void;
    bucketPath: string;
    
}
function EmployeeDocumentUploader({ files, setFiles,bucketPath }: EmployeeDocumentUploaderProps) { {

    const [access_token, setAccessToken] = useState('')

        useEffect(() => {
          const supabase = createClient()
          const getUserSession = async () => {
            const session = await supabase.auth.getSession()
            if (session.data.session?.access_token) {
              const tokenString = session.data.session.access_token.toString();
              setAccessToken(tokenString);
            }
          }
           getUserSession()
        },[])
  return (
    <>
            <FilePond
                files={ files }
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={10}
                maxParallelUploads={3}
                allowFileTypeValidation={true}
                labelFileTypeNotAllowed="Type de fichier invalide"
                fileValidateTypeLabelExpectedTypes="Seulement PDF, DOC, DOCX, XLS, JPEG, PNG"
                maxFileSize="50MB"
                stylePanelLayout='compact'
                stylePanelAspectRatio='0.1'
                acceptedFileTypes={
                    [
                        'application/pdf', 
                        'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                        'application/vnd.ms-excel', 
                        'image/jpeg',
                        'image/png'
                    ]
                }
                server={ 
                    {process: async (
                        fieldName, file, metadata, load, error, progress, abort, transfer, options
                      ) => {
                        const formData = new FormData();
                        formData.append(fieldName, file, file.name);
                        const request = new XMLHttpRequest();
                    
                        request.open(
                          "POST",
                          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/employeefiles/${bucketPath}/${Date.now()}_${file.name}`
                        );
                    
                        request.setRequestHeader(
                          "Authorization",
                          // make sure to change and enforce your policy
                          "Bearer " +
                            access_token
                        );
                        request.setRequestHeader(
                            'Apikey',
                            '' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                        )
                    
                        request.upload.onprogress = (e) => {
                          progress(e.lengthComputable, e.loaded, e.total);
                        };
                        
                        request.onload = function () {
                          if (request.status >= 200 && request.status < 300) {
                            load(request.responseText);
                          } else {
                            error("oh no");
                          }
                        };
                    
                        request.send(formData);
                    
                        return {
                          abort: () => {
                            request.abort();
                            abort();
                          },
                        };
                      },
                      remove: async (fileId, load) => {
                        // implementation here
                        console.log('call remove file')
                    
                      },
                      revert: (source, load, error) => {
                        // implementation here
                      },
                      load: async (source, load, error) => {
                        // implementation here
                      },
                 }}
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle="<br> Glissez-déposez vos fichiers ou <span class='filepond--label-action'>parcourez</span> <br> PDF, DOC, DOCX, XLS, JPEG, PNG <br> Ajouter jusqu'à 10 fichiers <br> Taille maximale du fichier: 50MB"
                credits={false}
              />
    </>
  )
}
}
export default EmployeeDocumentUploader