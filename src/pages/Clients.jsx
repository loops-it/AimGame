import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import { PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CreateUpdateModal from '../components/Authenticated/Client/CreateUpdateModal';


const tempData = [
    {
        id: "2123123",
        companyName: "Dialog PVT",
        createdAt: "2025/10/12",
        image: "https://fastly.picsum.photos/id/655/536/354.jpg?hmac=yks7pBLyZAstY3Khhmjee0_AcrlFgbVV6VpCAwNx1EU",
        industryType: "Telecommunication",
        email: "test@dialog.lk",
        contact: "+94312222344",
        address: "No 123 test rd, test",
    },
    {
        id: "1213123",
        companyName: "Dialog 1",
        createdAt: "2025/10/14",
        image: "https://fastly.picsum.photos/id/655/536/354.jpg?hmac=yks7pBLyZAstY3Khhmjee0_AcrlFgbVV6VpCAwNx1EU",
        industryType: "Telecommunication",
        email: "test@dialog.lk",
        contact: "+94312222344",
        address: "No 123 test rd, test",
    },
]

export default function Clients({ title }) {
    document.title = title

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [showSearch, setShowSearch] = useState(false)


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
            <div className='flex flex-col-reverse lg:flex-row  lg:items-center justify-between gap-3'  >
                <div className='flex lg:items-center gap-3' >
                    <button onClick={() => setShowSearch(true)} className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg' >Search</button>
                </div>
                <button onClick={() => {
                    setShow(true)
                    setSelectedData(null)
                }} className='flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>Create Client</div>
                </button>
            </div>
            <div className='bg-white rounded-lg mt-10' >
                <div className='flex items-center justify-between h-20 p-5' >
                    <div className='flex items-center gap-5' >
                        <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Clients</div>
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
                    emptyMessage="No Clients Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Logo
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Created Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Company Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Industry Type
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Business Address
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Contact
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Business Email
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
                                    <td className="py-5 px-6" >
                                        <Avatar
                                            alt={row?.companyName}
                                            src={row?.image}
                                            sx={{ border: "0.5px solid #ABB3BB" }}
                                        />
                                    </td>
                                    <td className="py-5 px-6" >{row?.createdAt}</td>
                                    <td className="py-5 px-6" >{row?.companyName}</td>
                                    <td className="py-5 px-6" >{row?.industryType}</td>
                                    <td className="py-5 px-6" >{row?.address}</td>
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
