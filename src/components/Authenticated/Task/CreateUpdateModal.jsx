import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import MainInput from '../../MainInput'
import MainSelect from '../../MainSelect'


const rates = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 2, name: '3' },
]

const stages = [
    { id: 1, name: 'Suspect' },
    { id: 2, name: 'Success' },
]

const funnelState = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 2, name: '3' },
]
const initialState = {}

export default function CreateUpdateModal({ show, onClose, data }) {
    const [task, setTask] = useState(initialState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setTask(data)
        }
        if (!data) {
            setTask(initialState)
        }
    }, [data])

    async function onCreate() {
        onClose()
    }

    async function onUpdate() {
        onClose()
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
            className={'w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-[#0000006d]'}
        >
            <div className='bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]' >
                <div className='bg-[#C5C5C533] h-14 flex justify-between items-center px-10' >
                    <div className='font-semibold' >{data ?
                        <span>View Task - <span className='text-app-blue-4' >{data?.name}</span></span>
                        : "Create New Task"}</div>
                    <button disabled={loading} onClick={onClose} className='flex justify-center items-center text-app-gray-3' >
                        <XCircleIcon className='w-7 h-7' />
                    </button>
                </div>
                <div className='max-h-[80vh] h-[80vh] lg:h-fit overflow-scroll no-scrollbar' >
                    <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10 pb-5' >
                        <MainInput
                            disabled={loading}
                            value={task?.name}
                            onChange={text => setTask({ ...task, name: text })}
                            label={"Name"}
                            placeholder={"Enter Name"}
                        />
                        <MainSelect
                            disabled={loading}
                            value={rates?.find(row => row?.name == task?.taskOwner)}
                            onChange={value => setTask({ ...task, taskOwner: value?.name })}
                            label={"Task Owner"}
                            placeholder={"Please Select Task Owner"}
                            options={rates} // change to proper data 
                        />
                        <MainInput
                            disabled={loading}
                            value={task?.date}
                            onChange={text => setTask({ ...task, date: text })}
                            label={"Date"}
                            type="date"
                            placeholder={"Enter Date"}
                        />
                        <MainSelect
                            disabled={loading}
                            value={rates?.find(row => row?.name == task?.status)}
                            onChange={value => setTask({ ...task, status: value?.name })}
                            label={"Status"}
                            placeholder={"Please Select Status"}
                            options={rates} // change to proper data 
                        />
                        <MainSelect
                            disabled={loading}
                            value={funnelState?.find(row => row?.name == task?.funnelStatus)}
                            onChange={value => setTask({ ...task, funnelStatus: value?.name })}
                            label={"Funnel Status"}
                            placeholder={"Please Select Funnel Status"}
                            options={funnelState} // change to proper data 
                        />
                        <MainInput
                            disabled={loading}
                            value={task?.probability}
                            onChange={text => setTask({ ...task, probability: text })}
                            label={"Probability(%)"}
                            placeholder={"Enter Probability(%)"}
                            type="number"
                        />
                        <MainSelect
                            disabled={loading}
                            value={stages?.find(row => row?.name == task?.stage)}
                            onChange={value => setTask({ ...opportunity, stage: value?.name })}
                            label={"Stage"}
                            placeholder={"Please Select Stage"}
                            options={stages}
                        />
                        <MainSelect
                            disabled={loading}
                            value={rates?.find(row => row?.name == task?.rate)}
                            onChange={value => setTask({ ...task, rate: value?.name })}
                            label={"Rate"}
                            placeholder={"Please Select Rate"}
                            options={rates}
                        />
                        <MainSelect
                            disabled={loading}
                            value={rates?.find(row => row?.name == task?.priority)}
                            onChange={value => setTask({ ...task, priority: value?.name })}
                            label={"Priority"}
                            placeholder={"Please Select Priority"}
                            options={rates} // change to proper data 
                        />
                        <MainInput
                            disabled={loading}
                            value={task?.reminderDate}
                            onChange={text => setTask({ ...task, reminderDate: text })}
                            label={"Reminder"}
                            type="date"
                            placeholder={"Enter Reminder"}
                        />
                        <MainInput
                            disabled={loading}
                            value={task?.note}
                            onChange={text => setTask({ ...task, note: text })}
                            label={"Note"}
                            placeholder={"Enter Note"}
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
