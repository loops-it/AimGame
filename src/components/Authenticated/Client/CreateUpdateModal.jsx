import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import MainInput from '../../MainInput'
import MainSelect from '../../MainSelect'
import MainMultipleSelect from '../../MainMultipleSelect'
import MainImageInput from '../../MainImageInput'

// const industryTypes = [
//     { id: 1, name: 'Transport' },
//     { id: 2, name: 'Logistics' },
//     { id: 3, name: 'ICT' },
//     { id: 4, name: 'Telecommunication' },
// ]

const initialState = {
    industryType: null,
    image: null
}

export default function CreateUpdateModal({ show, onClose, data }) {

    const [client, setClient] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [industryTypes, setIndustryTypes] = useState([]);
    

    useEffect(() => {
        if (data) {
            setClient(data)
        }
        if (!data) {
            setClient(initialState)
        }
    }, [data])

    async function onCreate() {
        onClose()
    }

    async function onUpdate() {
        onClose()
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:4065/api-v1/industryTypes');
            const data = await response.json();
            setIndustryTypes(data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      console.log("industryTypes data : ",industryTypes);

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={'w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#0000006d]'}
        >
            <div className='bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]' >
                <div className='bg-[#C5C5C533] h-14 flex justify-between items-center px-10' >
                    <div className='font-semibold' >{data ?
                        <span>View Client - <span className='text-app-blue-4' >{data?.companyName}</span></span>
                        : "Create New Client"}</div>
                    <button disabled={loading} onClick={onClose} className='flex justify-center items-center text-app-gray-3' >
                        <XCircleIcon className='w-7 h-7' />
                    </button>
                </div>
                <div className='max-h-[80vh] h-[80vh] lg:h-fit overflow-scroll no-scrollbar' >
                    <div className='flex justify-center items-center mt-5' >
                        <MainImageInput
                            type="client"
                            onChange={file => setClient({ ...client, image: file })}
                            value={client?.image}
                        />
                    </div>
                    <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10' >
                        <MainInput
                            disabled={loading}
                            value={client?.companyName}
                            onChange={text => setClient({ ...client, companyName: text })}
                            label={"Company Name"}
                            placeholder={"Enter Company Name"}
                        />
                        <MainSelect
                            disabled={loading}
                            value={industryTypes?.find(row => row?.name == client?.industryType)}
                            onChange={value => setClient({ ...client, industryType: value?.name })}
                            label={"Industry Type"}
                            placeholder={"Please Select Industry Type"}
                            options={industryTypes}
                        />
                        <MainInput
                            disabled={loading}
                            value={client?.email}
                            onChange={text => setClient({ ...client, email: text })}
                            label={"Business Email"}
                            placeholder={"Enter Business Email"}
                        />
                        <MainInput
                            disabled={loading}
                            value={client?.contact}
                            onChange={text => setClient({ ...client, contact: text })}
                            label={"Contact Number"}
                            placeholder={"Enter Contact Number"}
                        />
                    </div>
                    <div className='px-10 py-5' >
                        <MainInput
                            disabled={loading}
                            value={client?.address}
                            onChange={text => setClient({ ...client, address: text })}
                            label={"Business Address"}
                            placeholder={"Enter Business Address"}
                        />
                    </div>
                    <div className='flex justify-center items-center gap-5 mb-5' >
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className='disabled:bg-app-gray disabled:border-app-gray disabled:text-white flex items-center gap-3 border text-app-blue-2 border-app-blue-2 rounded-lg w-fit px-10 py-2' >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                data ? onCreate() : onUpdate()
                            }}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white' >
                            {data ? "Save" : "Create"}
                        </button>
                    </div>
                </div>

            </div>
        </Transition>
    )
}
