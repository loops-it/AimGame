import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import { PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import MainSelect from '../components/MainSelect';
import CreateUpdateModal from '../components/Authenticated/Partner/CreateUpdateModal';

const tempData = [
    {
        id: "12312312",
        name: "Brad",
        company: "DB2",
        accountName: "Account 1",
        designation: "Head of Sales",
        contact: "77234564",
        email: "amal@gmail.com",
        createdAt: "2025-10-20",
        rate: "2",
        role: "Sales",
    },
]

export default function Partners({ title }) {

    document.title = title

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const paginatedData = tempData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])

    return (
        <AuthenticatedLayout>
            <div className='flex flex-col-reverse lg:flex-row  lg:items-center justify-end gap-3'  >
                <button onClick={() => {
                    setShow(true)
                    setSelectedData(null)
                }} className='flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>Create Partner</div>
                </button>
            </div>
            <div className='' >
                <div className='flex flex-col lg:flex-row lg:justify-end my-3' >
                    <MainSelect
                        variant="small"
                        placeholder={"Select Workspace"}
                        options={[
                            { id: 1, name: 'Space A' },
                            { id: 2, name: 'Space B' },
                        ]}
                    />
                </div>
                <div className='flex flex-col lg:flex-row gap-3 lg:gap-5' >
                    <MainSelect
                        variant="small"
                        placeholder={"Select Account"}
                        options={[
                            { id: 1, name: 'Account 1' },
                            { id: 2, name: 'Account 2' },
                        ]}
                    />
                    <MainSelect
                        variant="small"
                        placeholder={"Select Client"}
                        options={[
                            { id: 1, name: 'Client 1' },
                            { id: 2, name: 'Client 2' },
                        ]}
                    />
                    <MainSelect
                        variant="small"
                        placeholder={"Select Company"}
                        options={[
                            { id: 1, name: 'Company 1' },
                            { id: 2, name: 'Company 2' },
                        ]}
                    />
                </div>
            </div>
            <div className='bg-white rounded-lg mt-10' >
                <div className='flex items-center justify-between h-20 p-5' >
                    <div className='flex items-center gap-5' >
                        <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Partners</div>
                        <button
                            onClick={() => setLoading(true)}
                        >
                            <ArrowPathIcon className={`${loading ? "animate-spin" : ""} w-6 h-6`} />
                        </button>
                    </div>
                    <button>
                        <EllipsisVerticalIcon className='w-8 h-8' />
                    </button>
                </div>
                <Divider />
                <TableProvider
                    currentPage={currentPage}
                    setCurrentPage={page => setCurrentPage(page)}
                    itemsPerPage={itemsPerPage}
                    pagination={true}
                    data={tempData}
                    loading={loading}
                    emptyMessage="No Partners Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Company
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Rate
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Account Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Designation
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Role
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Contact
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Email
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, index) => {
                            return (
                                <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?.id}</td>
                                    <td className="py-5 px-6" >{row?.createdAt}</td>
                                    <td className="py-5 px-6" >{row?.company}</td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    <td className="py-5 px-6" >{row?.rate}</td>
                                    <td className="py-5 px-6" >{row?.accountName}</td>
                                    <td className="py-5 px-6" >{row?.designation}</td>
                                    <td className="py-5 px-6" >{row?.role}</td>
                                    <td className="py-5 px-6" >{row?.contact}</td>
                                    <td className="py-5 px-6" >{row?.email}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setShow(true)
                                                setSelectedData(row)
                                            }}
                                        >
                                            <PencilSquareIcon className='w-6 h-6 text-app-blue-2' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableProvider>
            </div>
            <CreateUpdateModal
                data={selectedData}
                show={show}
                onClose={() => setShow(false)}
            />
        </AuthenticatedLayout>
    )
}
