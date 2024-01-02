/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import MainInput from '../../MainInput'
import MainSelect from '../../MainSelect'
import MainMultipleSelect from '../../MainMultipleSelect'
import MainImageInput from '../../MainImageInput'
import api from '../../../services/api'

// const industryTypes = [
//     { id: 1, name: 'Transport' },
//     { id: 2, name: 'Logistics' },
//     { id: 3, name: 'ICT' },
//     { id: 4, name: 'Telecommunication' },
// ]

const initialState = {
    industryTypeId: null,
    photo: null
}

export default function CreateUpdateModal({ show, onClose, data, industryTypes, workspaces }) {

    const [client, setClient] = useState(initialState)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (data) {
            setClient(data)
        }
        if (!data) {
            setClient(initialState)
        }
    }, [data])
    // console.log("client : ", client)
    


    // create client
    async function onCreate() {
        try {
          const response = await api.post('/api-v1/clients', client);
      
          if (response.status === 201) {
            console.log('Client created successfully');
            onClose();
          } else {
            console.error('Failed to create client:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating client:', error);
        }
      }
      

    async function onUpdate() {
        console.log("client._id : ", client._id)
        // try {
        //     const response = await fetch(`http://localhost:4065/api-v1/clients/${client._id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(client),
        //     });
    
        //     console.log("client updates: ", JSON.stringify(client));
    
        //     if (response.ok) {
        //         console.log('Client updated successfully');
        //         onClose();
        //     } else {
        //         console.error('Failed to update client:', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Error updating client:', error);
        // }
    }



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
                            onChange={file => setClient({ ...client, photo: file.path })}
                            value={client?.photo}
                        />
                    </div>
                    <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10' >
                        <MainInput
                            disabled={loading}
                            value={client?.name}
                            onChange={text => setClient({ ...client, name: text })}
                            label={"Company Name"}
                            placeholder={"Enter Company Name"}
                        />
                        <MainSelect
                            disabled={loading}
                            value={industryTypes?.find(row => row?.name === client?.industryType)}
                            onChange={value => setClient({
                                ...client,
                                industryTypeId: value?._id || ''
                            })}
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
                            value={client?.phone}
                            onChange={text => setClient({ ...client, phone: text })}
                            label={"Contact Number"}
                            placeholder={"Enter Contact Number"}
                        />
                        
                    </div>
                    <div className='px-10 py-5' >
                    {/* <MainInput
                            disabled={loading}
                            value={client?.workspaceId}
                            onChange={text => setClient({ ...client, workspaceId: text })}
                            label={"workspaceId"}
                            placeholder={"workspaceId"}
                        /> */}
                        <MainSelect
                            disabled={loading}
                            value={workspaces?.find(row => row?.name === client?.workspaceId)}
                            onChange={value => setClient({
                                ...client,
                                workspaceId: value?._id || ''
                            })}
                            label={"Workspaces"}
                            placeholder={"Please Select workspaces"}
                            options={workspaces}
                        />
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
                        {/* <button
                            onClick={() => {
                                data ? onCreate() : onUpdate()
                            }}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white' >
                            {data ? "Save" : "Create"}
                        </button> */}
                        <button
                            onClick={onCreate}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white'
                        >
                            Create
                        </button>

                    </div>
                </div>

            </div>
        </Transition>
    )
}
