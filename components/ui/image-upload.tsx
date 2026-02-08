'use client'

import { useEffect, useState } from "react";

interface imageUploadProps {
    disabled?: boolean;
    onChange:(value: string) => void;
    onRemove:(value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<imageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const  [isMounted, setIsMounted] = useState(false);

    useEffect (() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if(!isMounted){
        return null;
    }

    return (
        <div>
            <div>

            </div>
        </div>
    )
};

export default ImageUpload;