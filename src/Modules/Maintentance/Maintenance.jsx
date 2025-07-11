import React, { lazy, memo, Suspense, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import { getBedRemarkStatus, FetchAllCheckListBed } from '../../Function/CommonFunction'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import ErrorFallback from '../../Components/ErrorFallback ';
import NoAssignedBed from '../HouseKeeping.jsx/NoAssignedBed ';


const BedList = lazy(() => import('./BedList'));
const ChecklistHeaders = lazy(() => import('../../Components/ChecklistHeaders'));
const nobedDetail = require('../../assets/NoBed.png');

const Maintenance = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectfilter, setSelectedFilter] = useState(0);

    // getting bed for checklist
    const {
        data: getAllCheckListBed,
        refetch: getallBlokedbedRefetch,
        isLoading: isChecKListBedLoading,
        isError: isCheckListBedError,
        error: checklisterror,
        isSuccess: isCheckListBedSuccess
    } = useQuery({
        queryKey: ["getallchecklistbed"],
        queryFn: () => FetchAllCheckListBed()
    });


    //get bed status based on the remarks and verification
    const {
        data: getallremarkstatus,
        refetch: getallremarkrefetch,
        isLoading: isRemarkStatusLoading,
        isError: isRemarkError,
        error: remarkerror,
        isSuccess: isRemarkStatusSuccess
    } = useQuery({
        queryKey: ["getbedremarkstatus"],
        queryFn: () => getBedRemarkStatus() // check this part
    })

    // Beds that are blocked and  marked as Cleaned (fb_bed_status !== 1)
    const filteredBlockedBeds = useMemo(() => {
        return getAllCheckListBed?.filter((blockedBed) => {
            const remarkStatus = getallremarkstatus?.find((remark) => remark?.fb_bdc_no === blockedBed?.fb_bdc_no);
            return !(remarkStatus && remarkStatus?.fb_bed_status === 1);
        });
    }, [getAllCheckListBed, getallremarkstatus]);

    // Beds with both a checklist and a remark entry
    const filterbedwithremarks = useMemo(() => {
        return getallremarkstatus?.filter((blockedBed) => {
            const remarkStatus = getAllCheckListBed?.find((remark) => remark?.fb_bdc_no === blockedBed?.fb_bdc_no);
            return remarkStatus; //check this part later
        });
    }, [getAllCheckListBed, getallremarkstatus]);


    // Sorting Bed based on the OnHold and Renovation processing
    const SortedBed = useMemo(() => {
        if (selectfilter === 0) return filteredBlockedBeds;
        return filteredBlockedBeds?.filter((item) =>
            filterbedwithremarks?.some(
                (val) =>
                    val.fb_bd_code === item?.fb_bd_code &&
                    selectfilter === val.fb_bed_service_status
            )
        );
    }, [selectfilter, filterbedwithremarks, filteredBlockedBeds]);





    // Filtering Bed Based on the Search Result :)
    const FilterBedSearch = useMemo(() => {
        if (!searchQuery) return SortedBed;
        return SortedBed?.filter(bed =>
            bed?.fb_bdc_no?.includes(searchQuery)
        )
    }, [searchQuery, SortedBed]);


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
                                setSelectedFilter={setSelectedFilter}
                                searchvalue={searchQuery}
                                value={2}
                                // Today={Today}
                                name={'CHECKLIST'}
                            />
                        </Suspense>
                        <Box
                            sx={{
                                gap: 3,
                                px: 1,
                                width: "100%",
                                mt: 1,
                            }}>
                            {/* showing loading screen when loading Housekkeping Assigned Beds */}
                            {
                                (isChecKListBedLoading || isRemarkStatusLoading) && <CustomBackDropWithOutState message={"Checklist Loading..."} />
                            }

                            {/* this will trigger if in the case of Error in the Fetching Assinged Bed Usequery  */}
                            {isCheckListBedError && (
                                <ErrorFallback
                                    message="Failed to fetch assigned beds"
                                    error={checklisterror}
                                    onRetry={() => getallBlokedbedRefetch()}
                                />
                            )}
                            {isRemarkError && (
                                <ErrorFallback
                                    message="Failed to fetch assigned beds"
                                    error={remarkerror}
                                    onRetry={() => getBedRemarkStatus()}
                                />
                            )}

                            {/* only show this if the usquery is success and there is no checklist bed  */}
                            {
                                isRemarkStatusSuccess && isCheckListBedSuccess && getAllCheckListBed?.length === 0 &&
                                <NoAssignedBed img={nobedDetail} name={"No CheckList Bed Found"} />
                            }

                            <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                                {
                                    FilterBedSearch?.length > 0 ? FilterBedSearch?.map((item, index) => {
                                        const matchdata = filterbedwithremarks?.find((remark) => remark?.fb_bdc_no === item?.fb_bdc_no)
                                        return <Box key={index}>
                                            <BedList
                                                getallremarkrefetch={getallremarkrefetch}
                                                getallBlokedbedRefetch={getallBlokedbedRefetch}
                                                matchdata={matchdata} data={item}
                                                name={"MAINTENACE"}
                                                icon={<EngineeringTwoToneIcon className='hoverClass'
                                                    sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))' }} />}
                                            />
                                        </Box>
                                    })
                                        :
                                        <NoAssignedBed img={nobedDetail} name={"No Bed Found"} />

                                }
                            </Suspense>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default memo(Maintenance)
