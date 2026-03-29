"use client";

import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Drop() {
    const [preview, setPreview] = useState<string | null>(null);

    function handleFile(file: File) {
        if (!file.type.startsWith("image/")) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
    }
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": []
        },
        onDrop: (files) => {
            const file = files[0];
            handleFile(file);
        }
    });

    function DefaultDropState() {
        return (
            <>
                <div className="size-12 border border-foreground rounded-md flex items-center justify-center">
                    <Upload className="text-foreground size-6"/>
                </div>

                <div className="text-lg">
                    {isDragActive ? (
                        <p>Drop file here...</p>
                    ) : (
                        <p>Drag & drop or click to upload</p>
                    )}
                </div>
            </>
        );
    } 

    return (
        <Card
          {...getRootProps()}
          className="p-6 border-dashed cursor-pointer text-center border-muted-foreground min-h-128 h-fit w-96 items-center justify-center flex gap-4"
        >
            <input {...getInputProps()} />
            {preview 
            ? <Image src={preview} alt="preview" width={384} height={512} /> 
            : <DefaultDropState />
            }

        </Card>
    );
}