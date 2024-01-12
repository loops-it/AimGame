/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import Divider from '@mui/material/Divider';
import { ChevronUpDownIcon, PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, ArrowUpRightIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import CreateUpdateModal from '../components/Authenticated/Opportunity/CreateUpdateModal';
import SearchModal from '../components/Authenticated/Opportunity/SearchModal';
import RoleMappingModal from '../components/Authenticated/Opportunity/RoleMappingModal';
import PartnerCreateModal from '../components/Authenticated/Partner/CreateUpdateModal';
import TaskCreateModal from '../components/Authenticated/Task/CreateUpdateModal';
import api from '../services/api';


const tempData = [
    {
        id: "123123",
        startDate: "2025/10/20",
        endDate: "2025/10/25",
        opportunityName: "Sale of office supplies",
        stage: "Suspect",
        probability: "10",
        funnelStatus: "No Task",
        status: "start",
        designation: "Head of Sales",
        team: [
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
            }
        ],
        mappingRoles: [
            { name: "Test1" },
            { name: "Test2" },
        ],
        rate: "Low",
        lead: "James",
    },
    {
        id: "123123",
        startDate: "2025/10/20",
        endDate: "2025/10/25",
        opportunityName: "Sale of office supplies",
        stage: "Suspect",
        probability: "10",
        funnelStatus: "No Task",
        status: "continue",
        designation: "Chief Executive officer",
        team: [
            {
                name: "James",
                image: "https://mui.com/static/images/avatar/4.jpg"
            },
            {
                name: "Harry",
                image: "https://mui.com/static/images/avatar/5.jpg"
            },
            {
                name: "Chester",
                image: "https://mui.com/static/images/avatar/6.jpg"
            },
            {
                name: "James1",
                image: "https://mui.com/static/images/avatar/1.jpg"
            },
            {
                name: "James2",
                image: "https://mui.com/static/images/avatar/2.jpg"
            },
            {
                name: "James3",
                image: "https://mui.com/static/images/avatar/3.jpg"
            },
            {
                name: "James4",
                image: "https://mui.com/static/images/avatar/4.jpg"
            },
        ],
        rate: "Low",
        lead: "James",
    },
]

export default function Opportunities({ title }) {
    document.title = title

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [showSearch, setShowSearch] = useState(false)

    const [roleMappingShow, setRoleMappingShow] = useState(false)
    const [partnerCreateModalShow, setPartnerCreateModalShow] = useState(false)
    const [taskCreateModalShow, setTaskCreateModalShow] = useState(false)
    const [workspaces, setWorkspaces] = useState([]);
    const [partners, setPartners] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const paginatedData = tempData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])

    function getStatusColor(status) {
        if (status == "start") {
            return "#77C486"
        }
        if (status == "continue") {
            return "#F3EF15"
        }
        if (status == "Completed") {
            return "#E91818"
        }
        return "#9c9c9c"
    }


    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await api.get(`/api-v1/workspaces/user/${localStorage.userID}`);
                setWorkspaces(response.data.data);
            } catch (error) {
                console.error('Error fetching workspaces:', error);
            }
        };

        fetchWorkspaces();
    }, []);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await api.get('/api-v1/opportunities');
                setPartners(response.data.data);
            } catch (error) {
                console.error('Error fetching workspaces:', error);
            }
        };

        fetchWorkspaces();
    }, []);

    console.log("opportunities : ", partners)

    return (
        <AuthenticatedLayout>
            <div className='flex flex-col-reverse lg:flex-row  lg:items-center justify-between gap-3' >
                <div className='flex lg:items-center gap-3' >
                    <button className='flex items-center justify-between gap-3 bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                        <div>Period</div>
                        <ChevronUpDownIcon
                            className="h-5 w-5"
                        />
                    </button>
                    <button onClick={() => setShowSearch(true)} className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg' >Search</button>
                </div>
                <button onClick={() => {
                    setShow(true)
                    setSelectedData(null)
                }} className='flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>Create Opportunity</div>
                </button>
            </div>
            <div className='bg-white rounded-lg mt-10' >
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
                <TableProvider
                    currentPage={currentPage}
                    setCurrentPage={page => setCurrentPage(page)}
                    itemsPerPage={itemsPerPage}
                    pagination={true}
                    data={tempData}
                    loading={loading}
                    emptyMessage="No Opportunity Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Start Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                End Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Opportunity Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Stage
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Probability
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Funnel Status
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Status
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Team
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Rate
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Lead
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
                                    <td className="py-5 px-6" >{row?.startDate}</td>
                                    <td className="py-5 px-6" >{row?.endDate}</td>
                                    <td className="py-5 px-6" >{row?.opportunityName}</td>
                                    <td className="py-5 px-6" >{row?.stage}</td>
                                    <td className="py-5 px-6" >{row?.probability}</td>
                                    <td className="py-5 px-6" >{row?.funnelStatus}</td>
                                    <td className="py-5 px-6" >
                                        <Chip
                                            sx={{ borderColor: getStatusColor(row?.status), color: getStatusColor(row?.status), fontWeight: "700", textTransform: "uppercase" }}
                                            icon={<ArrowUpRightIcon style={{ color: getStatusColor(row?.status) }} className='w-5 h-5' />}
                                            label={row?.status}
                                            variant="outlined"
                                        />
                                    </td>
                                    <td className="py-5 px-6" >
                                        <div>
                                            <AvatarGroup
                                                renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
                                                total={row?.team?.length}
                                            >
                                                {row?.team?.slice(0, 4)?.map((teamRow, teamIndex) => {
                                                    return (
                                                        <Avatar key={teamIndex} alt={teamRow?.name} src={teamRow?.image} />
                                                    )
                                                })}
                                            </AvatarGroup>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6" >{row?.rate}</td>
                                    <td className="py-5 px-6" >{row?.lead}</td>
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
                onOpMappingAddClick={() => setRoleMappingShow(true)}
                onPartnerAddClick={() => setPartnerCreateModalShow(true)}
                onTaskAddClick={() => setTaskCreateModalShow(true)}
            />

            <SearchModal
                list={tempData}
                show={showSearch}
                onClose={() => setShowSearch(false)}
            />

            <RoleMappingModal
                data={selectedData}
                show={roleMappingShow}
                onClose={() => setRoleMappingShow(false)}
            />

            <PartnerCreateModal
                data={null}
                worspaces={workspaces}
                show={partnerCreateModalShow}
                onClose={() => setPartnerCreateModalShow(false)}
            />
            <TaskCreateModal
                data={null}
                show={taskCreateModalShow}
                onClose={() => setTaskCreateModalShow(false)}
            />

        </AuthenticatedLayout>
    )
}
