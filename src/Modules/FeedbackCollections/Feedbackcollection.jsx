//component not  using yet
import { Box } from '@mui/joy'
import React, { lazy, memo, Suspense, useState } from 'react'
import { getallNurseStation, getallNurseStationMaster } from '../../Function/CommonFunction'
import { useQuery } from '@tanstack/react-query'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';



// import CollectionDetail from './CollectionDetail'
// import PateintRoomDetail from './PateintRoomDetail'

const CollectionDetail = lazy(() => import('./CollectionDetail'));
const PateintRoomDetail = lazy(() => import('./PateintRoomDetail'));


const Feedbackcollection = () => {

    const [view, setView] = useState(0);
    const [beddetail, setBedDetail] = useState([]);
    const [nsname, setNsName] = useState("");
    const [nscode, setNsCode] = useState('');
    const [loading, setLoading] = useState(false);

    const { data: getallnursestation } = useQuery({
        queryKey: ['getallnsmaster'],
        queryFn: () => getallNurseStationMaster(),
    });

    const { data: elidernursingstation, } = useQuery({
        queryKey: ['allnursestation'],
        queryFn: () => getallNurseStation(),
    })

    return (
        <Box sx={{ minHeight: '100vh' }}>
            {
                view === 0 ?
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                        <CollectionDetail
                            setBedDetail={setBedDetail}
                            setView={setView}
                            getallnursestation={getallnursestation}
                            elidernursingstation={elidernursingstation}
                            setNsName={setNsName}
                            setNsCode={setNsCode}
                            setLoading={setLoading}
                            loading={loading} />
                    </Suspense>
                    :
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                        <PateintRoomDetail
                            beddetail={beddetail || []}
                            nsname={nsname}
                            view={view}
                            setView={setView}
                            nscode={nscode}
                        />
                    </Suspense>
            }

        </Box>
    )
}

export default memo(Feedbackcollection)
