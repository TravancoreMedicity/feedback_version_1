//component not  using yet
import { Box } from '@mui/joy'
import React, { useState } from 'react'
import { getallNurseStation, getallNurseStationMaster } from '../../Function/CommonFunction'
import { useQuery } from '@tanstack/react-query'
import CollectionDetail from './CollectionDetail'
import PateintRoomDetail from './PateintRoomDetail'

const Feedbackcollection = () => {

    const [view, setView] = useState(0);
    const [beddetail, setBedDetail] = useState([]);
    const [nsname, setNsName] = useState("");
    const [nscode, setNsCode] = useState('');
    const [allpatientDetail, setAllPatientDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data: getallnursestation } = useQuery({
        queryKey: ['getallnsmaster'],
        queryFn: () => getallNurseStationMaster(),
    });

    const { data: elidernursingstation, } = useQuery({
        queryKey: ['allnursestation'],
        queryFn: () => getallNurseStation(),
    })


    // const { data: currentNSdata } = useQuery({
    //     queryKey: ["currentnsdata", nscode], // Include nscode in queryKey to refetch when it changes
    //     queryFn: () => getCurrentNsData(nscode),
    //     enabled: !!nscode, // Only fetch when nscode is truthy (not null, undefined, or empty)
    // });

    // const FilterdInsertedData = allpatientDetail && allpatientDetail.length > 0
    //     ? allpatientDetail?.filter(item =>
    //         !currentNSdata?.some(val => val === item)
    //     ) : [];


    // const UpdatedCurrentNSData = currentNSdata?.filter(item => 
    //     !FilterdInsertedData.some(val => val === item)
    // ) || [];

    // console.log("allpatientDetail", allpatientDetail);
    // console.log("beddetail", beddetail);
    // console.log("nscode", nscode);


    return (
        <Box sx={{ minHeight: '100vh'}}>
            {
                view === 0 ?
                    <CollectionDetail
                        setBedDetail={setBedDetail}
                        setView={setView}
                        getallnursestation={getallnursestation}
                        elidernursingstation={elidernursingstation}
                        setNsName={setNsName}
                        setNsCode={setNsCode}
                        setLoading={setLoading}
                        loading={loading}
                    // setAllPatientDetail={setAllPatientDetail}
                    /> : <PateintRoomDetail
                        beddetail={beddetail || []}
                        nsname={nsname}
                        view={view}
                        setView={setView}
                        nscode={nscode}
                    />
            }

        </Box>
    )
}

export default Feedbackcollection
