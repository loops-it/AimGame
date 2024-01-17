/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import MainInput from '../../MainInput'
import MainSelect from '../../MainSelect'
import MainMultipleSelect from '../../MainMultipleSelect'
import { PlusIcon } from '@heroicons/react/24/solid'
import api from '../../../services/api'
import MainStageSelect from '../../StageDataSelect'
import MainRatesSelect from '../../RatesDataSelect'

const designations = [
    { id: 1, name: 'Head of Sales' },
    { id: 2, name: 'Head of Transport' },
    { id: 3, name: 'Head of IT' },
    { id: 3, name: 'Chief Executive officer' },
]

const stages = [
    { id: 1, name: 'Suspect' },
    { id: 2, name: 'Success' },
]

const rates = [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 2, name: 'High' },
]


const funnelState = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 2, name: '3' },
]

const opMappingRoles = [
    { name: "Test1" },
    { name: "Test2" },
    { name: "Test3" },
    { name: "Test4" },
    { name: "Test5" },
]

const teamData = [
    {
        name: "James",
        image: "https://mui.com/static/images/avatar/1.jpg"
    },
    {
        name: "Harry",
        image: "https://mui.com/static/images/avatar/2.jpg"
    },
    {
        name: "Chester",
        image: "https://mui.com/static/images/avatar/3.jpg"
    },
    {
        name: "Chester1",
        image: "https://mui.com/static/images/avatar/3.jpg"
    },
    {
        name: "Chester2",
        image: "https://mui.com/static/images/avatar/3.jpg"
    },
    {
        name: "Chester3",
        image: "https://mui.com/static/images/avatar/3.jpg"
    },
    {
        name: "Chester4",
        image: "https://mui.com/static/images/avatar/3.jpg"
    },
    {
        name: "Chester5",
        image: "https://mui.com/static/images/avatar/3.jpg"
    }
]


const initialState = {
    team: [],
    probability: 0,
    mappingRoles: [],
}

export default function CreateUpdateModal({ show, onClose, data, onPartnerAddClick, onTaskAddClick, onOpMappingAddClick, leadData, partners, teamMembers, clients, allworkspaces, tasks }) {

    const [opportunity, setOpportunity] = useState(initialState)
    const [loading, setLoading] = useState(false)

    console.log("teamMembers : - ", teamMembers)
    console.log("partners : - ", partners)
    console.log("opMappingRoles : - ", opMappingRoles)
    console.log("opMappingRoles : - ", opMappingRoles)
    console.log("tasks : - ", tasks)

    useEffect(() => {
        if (data) {
            setOpportunity(data)
        }
        if (!data) {
            setOpportunity(initialState)
        }
    }, [data])

    async function onCreate() {
        try {
            // console.log("opportunity : ", opportunity)
            const response = await api.post('/api-v1/opportunities', opportunity);

            if (response.status === 201) {
                console.log('Opportunity created successfully');
                onClose();
            } else {
                console.error('Failed to create opportunity:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating opportunity:', error);
        }
    }

    async function onUpdate() {
        console.log("Update data:", opportunity)
        try {
            const response = await api.put(`/api-v1/opportunities/${opportunity._id}`, opportunity);

            if (response.status === 200 || response.status === 201) {
                console.log('Client updated successfully');
                onClose();
            } else {
                console.error('Failed to update client:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating client:', error);
        }
    } function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
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
                        <span>View Opportunity - <span className='text-app-blue-4' >{data?.opportunityName}</span></span>
                        : "Create New Opportunity"}</div>
                    <button disabled={loading} onClick={onClose} className='flex justify-center items-center text-app-gray-3' >
                        <XCircleIcon className='w-7 h-7' />
                    </button>
                </div>
                <div className='max-h-[80vh] h-[80vh] lg:h-fit overflow-scroll no-scrollbar' >
                    <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10' >
                        <MainInput
                            disabled={loading}
                            value={opportunity?.name}
                            onChange={text => setOpportunity({ ...opportunity, name: text })}
                            label={"Opportunity Name"}
                            placeholder={"Enter Opportunity Name"}
                        />
                        <MainInput
                            disabled={loading}
                            value={opportunity?.referenceNumber}
                            onChange={text => setOpportunity({ ...opportunity, referenceNumber: text })}
                            label={"Reference Number"}
                            placeholder={"Enter Reference Number"}
                        />
                        <MainSelect
                            disabled={loading}
                            value={leadData?.find(row => row?.name === opportunity?.leadId)}
                            onChange={value => setOpportunity({
                                ...opportunity,
                                leadId: value?._id || ''
                            })}
                            label={"Opportunity Lead"}
                            placeholder={"Please Select Opportunity Lead"}
                            options={leadData ?? []}
                        />
                        <MainSelect
                            disabled={loading}
                            value={designations?.find(row => row?.name == opportunity?.designation)}
                            onChange={value => setOpportunity({ ...opportunity, designation: value?.name })}
                            label={"Designation"}
                            placeholder={"Please Select Designation"}
                            options={designations ?? []}
                        />
                        <MainInput
                            disabled={loading}
                            value={isValidNumber(opportunity?.probability) ? parseFloat(opportunity?.probability) : ''}
                            min={0}
                            max={100}
                            type={"number"}
                            label={"Probability(%)"}
                        />
                        <MainSelect
                            disabled={loading}
                            value={stages?.find(row => row?.name == opportunity?.stage)}
                            onChange={value => setOpportunity({ ...opportunity, stage: value?.name })}
                            label={"Stage"}
                            placeholder={"Please Select Stage"}
                            options={stages ?? []}
                        />
                        <MainSelect
                            disabled={loading}
                            value={rates?.find(row => row?.name == opportunity?.rate)}
                            onChange={value => setOpportunity({ ...opportunity, rate: value?.name })}
                            label={"Rate"}
                            placeholder={"Please Select Rate"}
                            options={rates ?? []}
                        />
                        {data &&
                            <MainSelect
                                disabled={loading}
                                value={funnelState?.find(row => row?.name == opportunity?.funnelStatus)}
                                onChange={value => setOpportunity({ ...opportunity, funnelStatus: value?.name })}
                                label={"Funnel Status"}
                                placeholder={""}
                                options={funnelState ?? []}
                            />
                        }
                    </div>
                    <div className='px-10 py-5 flex flex-col gap-5' >
                        <MainSelect
                            disabled={loading}
                            value={clients?.find(row => row?.name === opportunity?.clientId)}
                            onChange={value => setOpportunity({
                                ...opportunity,
                                clientId: value?._id || ''
                            })}
                            label={"Clients"}
                            placeholder={"Please Select Client"}
                            options={clients ?? []}
                        />
                        <MainSelect
                            disabled={loading}
                            value={allworkspaces?.find(row => row?.name === opportunity?.workspaceId)}
                            onChange={value => setOpportunity({
                                ...opportunity,
                                workspaceId: value?._id || ''
                            })}
                            label={"Workspace"}
                            placeholder={"Please Select Workspace"}
                            options={allworkspaces ?? []}
                        />
                        <MainMultipleSelect
                            key={JSON.stringify(opportunity.team)}
                            disabled={loading}
                            value={opportunity.team}
                            onChange={value => setOpportunity({ ...opportunity, team: value })}
                            onDeleteItem={index => {
                                let tempData = [...opportunity.team];
                                tempData.splice(index, 1);
                                setOpportunity({ ...opportunity, team: tempData });
                            }}
                            label={"Team Members"}
                            placeholder={""}
                            options={teamMembers.map(member => ({ _id: member._id, name: member.name }))}
                        />
                        <div>

                            <MainMultipleSelect
                                key={JSON.stringify(opportunity.partners)}
                                disabled={loading}
                                value={opportunity.partners}
                                onChange={value => setOpportunity({ ...opportunity, partners: value })}
                                onDeleteItem={index => {
                                    let tempData = [...opportunity.partners];
                                    tempData.splice(index, 1);
                                    setOpportunity({ ...opportunity, partners: tempData });
                                }}
                                label={"Partners"}
                                placeholder={""}
                                options={partners ?? []}
                            />

                            <div className='mt-2 flex justify-end' >
                                <button
                                    onClick={onPartnerAddClick}
                                    className='flex items-center gap-2 text-app-blue text-xs'
                                >
                                    <div className='border border-app-blue' >
                                        <PlusIcon className='w-3 h-3' />
                                    </div>
                                    Add New
                                </button>
                            </div>
                        </div>
                        {data &&
                            <div>
                                <MainMultipleSelect
                                    key={JSON.stringify(opportunity.mappingRoles)}
                                    disabled={loading}
                                    value={opportunity.mappingRoles}
                                    onChange={value => setOpportunity({ ...opportunity, mappingRoles: value })}
                                    onDeleteItem={index => {
                                        let tempData = [...opportunity.mappingRoles];
                                        tempData.splice(index, 1);
                                        setOpportunity({ ...opportunity, mappingRoles: tempData });
                                    }}
                                    label={"OP Mapping Roles"}
                                    placeholder={""}
                                    options={opMappingRoles.map(member => ({ _id: member.name, name: member.name }))}
                                />

                                <div className='mt-2 flex justify-end' >
                                    <button
                                        onClick={onOpMappingAddClick}
                                        className='flex items-center gap-2 text-app-blue text-xs'
                                    >
                                        <div className='border border-app-blue' >
                                            <PlusIcon className='w-3 h-3' />
                                        </div>
                                        Add New
                                    </button>
                                </div>
                            </div>
                        }
                        {data &&
                            <div>
                                <MainMultipleSelect
                                key={JSON.stringify(opportunity.tasks)}
                                    disabled={loading}
                                    value={opportunity.tasks}
                                    onChange={value => setOpportunity({ ...opportunity, tasks: value })}
                                    onDeleteItem={index => {
                                        let tempData = [...opportunity.tasks];
                                        tempData.splice(index, 1);
                                        setOpportunity({ ...opportunity, tasks: tempData });
                                    }}
                                    label={"Tasks"}
                                    placeholder={""}
                                    options={tasks.map(member => ({ _id: member.name, name: member.name }))}
                                />

                                <div className='mt-2 flex justify-end' >
                                    <button
                                        onClick={onTaskAddClick}
                                        className='flex items-center gap-2 text-app-blue text-xs'
                                    >
                                        <div className='border border-app-blue' >
                                            <PlusIcon className='w-3 h-3' />
                                        </div>
                                        Add New
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex justify-center items-center gap-5 mb-5' >
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className='disabled:bg-app-gray disabled:border-app-gray disabled:text-white flex items-center gap-3 border text-app-blue-2 border-app-blue-2 rounded-lg w-fit px-10 py-2' >
                            Cancel
                        </button>
                        {/* <button
                            onClick={onCreate}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white' >
                            {data ? "Save" : "Create"}
                        </button> */}
                        <button
                            onClick={() => {
                                data ? onUpdate() : onCreate();
                            }}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white'
                        >
                            {data ? "Update" : "Create"}
                        </button>
                    </div>
                </div>

            </div>
        </Transition>
    )
}
