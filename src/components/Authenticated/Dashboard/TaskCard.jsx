import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import TableProvider from '../../TableProvider'


const tempData = [
    {
        taskName: "Meeting",
        OPName: "Server room Upgrade",
        dueDate: "Mar 23,2023",
        status: "Pending",
        priority: "High",
    },
]

export default function TaskCard() {
    const [loading, setLoading] = useState(false)
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://13.126.15.131:4065/api-v1/tasks', {
              headers: {
                Authorization: `Bearer ${localStorage.accessToken}`,
              },
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            setTempData(result.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])
    return (
        <div className='bg-white rounded-lg min-h-[25rem]' >
            <div className='flex items-center justify-between h-20 p-5' >
                <div className='flex items-center gap-5' >
                    <div className="text-lg lg:text-2xl text-app-blue font-semibold" >My Open Task</div>
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
            <TableProvider data={tempData} loading={loading} emptyMessage="No Open Tasks Found" >
                <thead className="text-xs text-app-blue uppercase bg-white">
                    <tr>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Task Name
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            OP Name
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Due Date
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Status
                        </th>
                        <th scope="col" className="py-3 px-6 border-b">
                            Priority
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tempData?.map((row, index) => {
                        return (
                            <tr key={index} className="bg-white border-b text-gray-900 ">
                                <td className="py-3 px-6" >{row?.name}</td>
                                <td className="py-3 px-6" >{row?.opportunityId ? row.opportunityId.name : "-"}</td>
                                <td className="py-3 px-6" >{row?.date}</td>
                                <td className="py-3 px-6" >{row?.status}</td>
                                <td className="py-3 px-6" >{row?.priority}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableProvider>
        </div>
    )
}
