import React, { memo, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllBlockedBed, getBedRemarkStatus } from '../../Function/CommonFunction'
import { Box, } from '@mui/joy'
import BedList from '../Maintentance/BedList';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import ChecklistHeaders from '../../Components/ChecklistHeaders';

const InfromationTechnology = () => {

    const { data: getllBlockedBed, refetch: getallBlokedbedRefetch } = useQuery({
        queryKey: ["getallblockedbed"],
        queryFn: () => getAllBlockedBed()
    })

    //get bed status based on the remarks and verification
    const { data: getallremarkstatus, refetch: getallremarkrefetch } = useQuery({
        queryKey: ["getbedremarkstatus"],
        queryFn: () => getBedRemarkStatus()
    })

    const filteredBlockedBeds = useMemo(() => {
        return getllBlockedBed?.filter((blockedBed) => {
            const remarkStatus = getallremarkstatus?.find((remark) => remark.fb_bdc_no === blockedBed.fb_bdc_no);
            return !(remarkStatus && remarkStatus.fb_bed_status === 0);
        });
    }, [getllBlockedBed, getallremarkstatus]);


    const filterbedwithremarks = useMemo(() => {
        return getallremarkstatus?.filter((blockedBed) => {
            const remarkStatus = getllBlockedBed?.find((remark) => remark.fb_bdc_no === blockedBed.fb_bdc_no);
            return remarkStatus && remarkStatus.fb_bed_status === 1;
        });
    }, [getllBlockedBed, getallremarkstatus]);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Box
                className="flex flex-col rounded-xl p-1 w-full"
                sx={{
                    backgroundColor: "rgba(var(--bg-card))",
                    height: "calc(100% - 50px)",
                    cursor: 'pointer'
                }}>
                <Box sx={{
                    mb: 2,
                    p: 1,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    borderRadius: 5
                }}>
                    <ChecklistHeaders icon={<ComputerTwoToneIcon sx={{
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 28,
                        fontWeight: 700,
                        mt: 2
                    }} />} name={'INFORMATION TECHNOLOGY'} />
                    <Box
                        sx={{
                            gap: 3,
                            px: 1,
                            width: "100%",
                            mt: 1,
                        }}>
                        {
                            filteredBlockedBeds?.map((item, index) => {
                                const matchdata = filterbedwithremarks?.find((remark) => remark.fb_bdc_no === item.fb_bdc_no)
                                return <Box key={index}>
                                    <BedList
                                        getallremarkrefetch={getallremarkrefetch}
                                        getallBlokedbedRefetch={getallBlokedbedRefetch}
                                        matchdata={matchdata}
                                        data={item}
                                        name={"INFROMATION TECHNOLOGY"}
                                        icon={<ComputerTwoToneIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} />} />
                                </Box>
                            })}
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default memo(InfromationTechnology)