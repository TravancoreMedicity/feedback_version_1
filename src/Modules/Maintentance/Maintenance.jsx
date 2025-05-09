import React, { lazy, memo, Suspense, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import { getAllBlockedBed, getBedRemarkStatus, getProcheckCompletedBedDetail } from '../../Function/CommonFunction'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';

const BedList = lazy(() => import('./BedList'));
const ChecklistHeaders = lazy(() => import('../../Components/ChecklistHeaders'));

const Maintenance = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: getllBlockedBed, refetch: getallBlokedbedRefetch } = useQuery({
        queryKey: ["getallblockedbed"],
        queryFn: () => getAllBlockedBed()
    });

    // const { data: getProcheckcompleteBed, refetch: fetchProCheckCompleteBed } = useQuery({
    //     queryKey: ['getProcheckBed'],
    //     queryFn: () => getProcheckCompletedBedDetail(),
    // });

    //get bed status based on the remarks and verification
    const { data: getallremarkstatus, refetch: getallremarkrefetch } = useQuery({
        queryKey: ["getbedremarkstatus"],
        queryFn: () => getBedRemarkStatus()
    })

    const filteredBlockedBeds = useMemo(() => {
        return getllBlockedBed?.filter((blockedBed) => {
            const remarkStatus = getallremarkstatus?.find((remark) => remark?.fb_bdc_no === blockedBed?.fb_bdc_no);
            return !(remarkStatus && remarkStatus?.fb_bed_status === 1);
        });
    }, [getllBlockedBed, getallremarkstatus]);


    const filterbedwithremarks = useMemo(() => {
        return getallremarkstatus?.filter((blockedBed) => {
            const remarkStatus = getllBlockedBed?.find((remark) => remark?.fb_bdc_no === blockedBed?.fb_bdc_no);
            return remarkStatus; //check this part later
        });
    }, [getllBlockedBed, getallremarkstatus]);



    const FilterBedSearch = useMemo(() => {
        if (!searchQuery) return filteredBlockedBeds;
        return filteredBlockedBeds?.filter(bed =>
            bed?.fb_bdc_no?.includes(searchQuery)
        )
    }, [searchQuery, filteredBlockedBeds]);




    return (
        <>
            <Box sx={{ minHeight: '100vh' }}>
                <Box
                    className="flex flex-col rounded-xl p-1 w-full"
                    sx={{
                        backgroundColor: "rgba(var(--bg-card))",
                        height: "calc(100% - 50px)",
                        cursor: 'pointer',
                        minHeight: '90vh'
                    }}>
                    <Box sx={{
                        mb: 2,
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        borderRadius: 5
                    }}>
                        <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                            <ChecklistHeaders
                                icon={<EngineeringTwoToneIcon sx={{
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 28,
                                    fontWeight: 700,
                                    mt: 2
                                }} />}
                                setValue={setSearchQuery}
                                searchvalue={searchQuery}
                                value={2}
                                name={'MAINTENACE'}
                            />
                        </Suspense>
                        <Box
                            sx={{
                                gap: 3,
                                px: 1,
                                width: "100%",
                                mt: 1,
                            }}>
                            {
                                FilterBedSearch?.map((item, index) => {
                                    const matchdata = filterbedwithremarks?.find((remark) => remark?.fb_bdc_no === item?.fb_bdc_no)
                                    return <Box key={index}>
                                        <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                                            <BedList
                                                getallremarkrefetch={getallremarkrefetch}
                                                getallBlokedbedRefetch={getallBlokedbedRefetch}
                                                matchdata={matchdata} data={item}
                                                name={"MAINTENACE"}
                                                icon={<EngineeringTwoToneIcon className='hoverClass'
                                                    sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))' }} />}
                                            />
                                        </Suspense>
                                    </Box>
                                })}
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default memo(Maintenance)