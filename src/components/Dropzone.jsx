import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import {  XMarkIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Dropzone() {
  const [files, setFiles] = useState([])
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles)
      setOpen(prev=>!prev)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
   
    }
  }, [])

 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  })

  
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])
  
  
  
  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
    if(files.length === 1){
      setFiles([])
      setOpen(false)
    }
  }
  

  const handleSubmit = async e => {
    e.preventDefault()
    setOpen(prev=>!prev)
  }
  
  const uploadtoS3 = async (files) => {
    console.log(files)
    // S3 logic here
    setTimeout(() => {
     
      setFiles([])
    }, 3000);

  }
 
  const uploadFiles = () => {
    
    setLoading(true)
    uploadtoS3(files).then(() => {
      setLoading(false)
      setOpen(false)
    }).catch((e) => {
      console.log(e)
      alert('Error uploading file')
    })
    
  };

  const cancelUpload = () => {
    
    setFiles([]);
    setOpen(prev=>!prev)

    
  };


  return (
    <form onSubmit={handleSubmit} className="absolute h-10 w-10 z-1  bottom-4">
      <div {...getRootProps(
          {className:'h-full w-full'}
      )}>
        <input {...getInputProps()} />
   
      </div>

      { (<Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {files.map((file) => (
                <div key={file.name} className="relative">
                  <button
                    type="button"
                    onClick={() => removeFile(file.name)}
                    className="absolute top-0 right-0 bg-gray-100 outline outline-1 outline-red-400 translate-x-1 -translate-y-1 rounded-full  hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100"
                  >
                    <XMarkIcon className="h-5 w-5 text-red-500" />
                  </button>
                  <img
                    src={file.preview}
                    alt={file.name}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                  <p>{file.name}</p>
                </div>
              ))}

              <div className="mt-4">
                <button
                  type="button"
                  onClick={uploadFiles}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  {loading ? <AiOutlineLoading3Quarters  /> : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={cancelUpload}
                  className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>)
      }

    </form>
  )
}

export default Dropzone
