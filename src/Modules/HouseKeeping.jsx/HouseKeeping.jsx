import React, { memo } from 'react'
import { Box } from '@mui/joy'
import ChecklistHeaders from '../../Components/ChecklistHeaders';
import { useQuery } from '@tanstack/react-query';
import { getallHouseKeepingBed } from '../../Function/CommonFunction';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';

const HouseKeeping = () => {

    const { data: housekeepingbeds } = useQuery({
        queryKey: ["getallhousekeepingbed"],
        queryFn: () => getallHouseKeepingBed()
    });

    console.log(housekeepingbeds, "housekeepingbeds");


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
                    <ChecklistHeaders icon={<CleaningServicesTwoToneIcon sx={{
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 28,
                        fontWeight: 700,
                        mt: 2
                    }} />} name={'HOUSE KEEPING'} />
                    <Box
                        sx={{
                            gap: 3,
                            px: 1,
                            width: "100%",
                            mt: 1,
                        }}>
                        {
                            housekeepingbeds?.map((item, index) => {
                                // const matchdata = filterbedwithremarks?.find((remark) => remark.fb_bdc_no === item.fb_bdc_no)
                                // return <Box key={index}>
                                //     <BedList
                                //         getallremarkrefetch={getallremarkrefetch}
                                //         getallBlokedbedRefetch={getallBlokedbedRefetch}
                                //         matchdata={matchdata}
                                //         data={item}
                                //         name={"INFROMATION TECHNOLOGY"}
                                //         icon={<ComputerTwoToneIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} />} />
                                // </Box>
                            })}


                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default memo(HouseKeeping)