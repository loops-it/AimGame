/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import api from '../services/api'

export default function Opportunities({ title }) {
    document.title = title

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [showSearch, setShowSearch] = useState(false)

    const [roleMappingShow, setRoleMappingShow] = useState(false)

    const [opportunities, setOpportunities] = useState([]);
    const [opLead, setOpLead] = useState([]);
    const [stage, setStage] = useState([]);
    const [team, setTeam] = useState([]);
    const [workspace, setWorkspace] = useState([]);
    const [clients, setClients] = useState([]);
    const [org, setOrg] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;



    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])

    // // stage data
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await api.get(`/api-v1/workspaces/user/${localStorage.userID}`);
    //             const data = response.data.data;
    //             setWorkspace(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    // // opportunity data
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await api.get('/api-v1/opportunities');
    //             const data = response.data.data;
    //             setOpportunities(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch workspaces first
                const workspacesResponse = await api.get(`/api-v1/workspaces/user/${localStorage.userID}`);
                const workspacesData = workspacesResponse.data.data;
                setWorkspace(workspacesData);
                // Fetch opportunities for each workspace
                const opportunitiesData = [];
                for (const workspace of workspacesData) {
                    console.log('WSID:', workspace._id);
                    const opportunitiesResponse = await api.get(`/api-v1/opportunities/workspace/${workspace._id}`);
                    const opportunitiesForWorkspace = opportunitiesResponse.data.data;
                    opportunitiesData.push(...opportunitiesForWorkspace);
                }
    
                setOpportunities(opportunitiesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    // lead data
    useEffect(() => {
        const fetchLeadData = async () => {
            try {
                const response = await api.get('/api-v1/users');
                const data = response.data.data;
                setOpLead(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLeadData();
    }, []);


    // stage data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api-v1/funnelStatuses');
                const data = response.data.data;
                setStage(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    
    // client organization data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api-v1/client-organizations');
                const data = response.data.data;
                setOrg(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // team data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api-v1/users');
                const data = response.data.data;
                setTeam(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // team data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api-v1/clients');
                const data = response.data.data;
                setClients(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    console.log("opportunity data : ", opportunities);

    const paginatedData = opportunities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                    data={opportunities}
                    loading={loading}
                    emptyMessage="No Opportunity Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Opportunity Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Opportunity Lead
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Designations
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Team Members
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Funnel Status
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Status
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Rate
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Client
                            </th>
                            {/* <th scope="col" className="py-5 px-6 border-b">
                                Rate
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Lead
                            </th> */}
                            <th scope="col" className="py-5 px-6 border-b">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, index) => {
                            return (
                                <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?._id}</td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    <td className="py-5 px-6" >{row?.leadId ? row.leadId.name : "-"}</td>
                                    <td className="py-5 px-6" >{row?.name}</td>
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
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.stage : "-"}</td>
                                    <td className="py-5 px-6" >
                                        <Chip
                                            sx={{ borderColor: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-"), color: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-"), fontWeight: "700", textTransform: "uppercase" }}
                                            icon={<ArrowUpRightIcon style={{ color: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-") }} className='w-5 h-5' />}
                                            label={row?.funnelStatusId ? row.funnelStatusId.status : "-"}
                                            variant="outlined"
                                        />
                                    </td>
                                    {/* <td className="py-5 px-6" >{row?.probability}</td> */}
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.rate : "-"}</td>


                                    <td className="py-5 px-6" >{row?.clientId ? row.clientId.name : "-"}</td>
                                    {/* <td className="py-5 px-6" >{row?.leadId ? row.leadId.name : "-"}</td> */}
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
                opportunityData={selectedData}
                show={show}
                teamData={team}
                stageData={stage}
                leadData={opLead}
                workspaces={workspace}
                clients={clients}
                onClose={() => setShow(false)}
                onOpMappingAddClick={() => setRoleMappingShow(true)}
            />

            <SearchModal
                list={opportunities}
                show={showSearch}
                onClose={() => setShowSearch(false)}
            />

            <RoleMappingModal
                data={selectedData}
                org={org}
                show={roleMappingShow}
                onClose={() => setRoleMappingShow(false)}
            />
        </AuthenticatedLayout>
    )
}
