import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { UserRound } from 'lucide-react'
import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-col flex items-center p-7 justify-center gap-4 bg-slate-100 rounded-2xl">
        {fileUrl ? (
            <>
                <img
                    src={fileUrl || "/assets/icons/userroundicon.png"}
                    alt="image"
                    className="h-24 w-24 rounded-full object-cover object-center"
                />
                <p className="text-slate-600 text-center">
                    Changez la photo de Employé
                </p>
            </>
        ) : (
            <>
                <UserRound  className="h-10 w-10 text-green-500"/>
                <p className="text-slate-600 text-center">
                    Uploader la photo de Employé
                </p>
            </>
        )}
      </div>
    </div>
  );
};

export default ProfileUploader;