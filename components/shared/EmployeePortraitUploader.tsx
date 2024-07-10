'use client'
import React, { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

registerPlugin( 
  FilePondPluginImageExifOrientation, 
  FilePondPluginImagePreview, 
  FilePondPluginFileValidateType, 
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode
)


type EmployeePortraitUploaderProps = {
    files: any[];
    onUpdateFiles: (files: any) => void;
}
function EmployeePortraitUploader({ files, onUpdateFiles}: EmployeePortraitUploaderProps) { {
    const pondref = useRef<FilePond>(null);

    const onPrepare = (file: any, output: any) => { 
      onUpdateFiles(output);
    };
  return (
    <div className='portraituploader'>
            <FilePond
                ref={pondref}
                files={ files }
                allowMultiple={false}
                maxFiles={1}
                maxParallelUploads={1}
                allowFileTypeValidation={true}
                labelFileTypeNotAllowed="Type de fichier invalide"
                fileValidateTypeLabelExpectedTypes="Seulement JPEG, PNG"
                maxFileSize="10MB"
                stylePanelLayout='compact circle'
                allowImagePreview={true}
                imagePreviewHeight={170}
                onpreparefile={ onPrepare }
                styleButtonRemoveItemPosition='center bottom'
                styleLoadIndicatorPosition='center bottom'
                acceptedFileTypes={
                    [
                        'image/jpeg',
                        'image/png'
                    ]
                }
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle="Glissez-déposez votre image ou <span class='filepond--label-action'>parcourez</span> <br> JPEG, PNG <br> Taille maximale du fichier: 10MB"
                credits={false}
              />
    </div>
  )
}
}
export default EmployeePortraitUploader