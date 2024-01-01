import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import TableProvider from '../../TableProvider'

const tempData = [
    {
        opportunityName: "Sale of office supplies",
        stage: "Suspect",
        probability: "10%",
        funnelStatus: "No Task",
        rate: "Law",
        lead: "James",
    },
    {
        opportunityName: "New Sale of office supplies",
        stage: "Suspect",
        probability: "40%",
        funnelStatus: "Proposal Submission",
        rate: "Law",
        lead: "James",
    },
]

export default function OpportunityCard() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])
    return (
        <div className='bg-white rounded-lg min-h-[25rem]' >
            <div className='flex items-center justify-between h-20 p-5' >
                <div className='flex items-center gap-5' >
                    <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Opportunities</div>
                    <button
                        onClick={() => {
                            setLoading(true)
                        }}
                    >
                        <ArrowPathIcon className={`${loading ? "animate-spin" : ""} w-6 h-6`} />
                    </button>
                </div>
                <button>
                    <EllipsisVerticalIcon className='w-8 h-8' />
                </button>
            </div>
            <Divider />
            <TableProvider data={tempData} loading={loading} emptyMessage="No Opportunity Found" >
                <thead className="text-xs text-app-blue uppercase bg-white">
                    <tr>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Opportunity Name
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Stage
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Probability
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Funnel Status
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Rate
                        </th>
                        <th scope="col" className="py-3 px-6 border-b">
                            Lead
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tempData?.map((row, index) => {
                        return (
                            <tr key={index} className="bg-white border-b text-gray-900 ">
                                <td className="py-3 px-6" >{row?.opportunityName}</td>
                                <td className="py-3 px-6" >{row?.stage}</td>
                                <td className="py-3 px-6" >{row?.probability}</td>
                                <td className="py-3 px-6" >{row?.funnelStatus}</td>
                                <td className="py-3 px-6" >{row?.rate}</td>
                                <td className="py-3 px-6" >{row?.lead}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableProvider>
        </div>
    )
}
