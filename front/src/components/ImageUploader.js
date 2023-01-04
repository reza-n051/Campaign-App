import { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useMutation } from 'react-query';
import upload from '../api/upload';
import { toast } from 'react-toastify';
export default function ImageUploader({ setImgPathInServer }) {
    const [file, setFile] = useState();
    const [path, setPath] = useState("");
    const { mutate } = useMutation(upload, {
        onSuccess: (data) => {
            setImgPathInServer(data.path);
            toast.success("uploaded !!!");
        },
        onError: () => {
            toast.warn("Error. Please Try Again");
        }
    });
    const handleDrop = useCallback((files) => {
        const imgFile = files[0];
        setFile(imgFile);
        setPath(URL.createObjectURL(imgFile));
        // mutate(imgFile);
    }, []);
    return (
        <div className='flex flex-col mb-2'>
            <Dropzone onDrop={handleDrop} maxFiles={1}>
                {({ getRootProps, getInputProps }) => (
                    <section {...getRootProps()} className="border-blue-300 border-2 w-96 h-40 mx-auto cursor-pointer text-xs text-red-500 flex">
                        <input {...getInputProps()} />
                        <p className='m-auto text-xl font-serif'>Avatar: Drag or Click to Select</p>
                    </section>
                )}
            </Dropzone>
            <div className='avatar'>
                <div className='w-24 h-24 bg-gray-300 mask mask-hexagon mx-auto mt-4 flex'>
                    {path !== "" ?
                        <img
                            onLoad={() => URL.revokeObjectURL(file)}
                            src={path}
                            alt="Avatar"
                        /> : null
                    }
                </div>
            </div>
        </div>
    )
}