import React, { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllBlockedBed } from '../../Function/CommonFunction'
import { Box, Grid, Typography } from '@mui/joy'
import ApartmentIcon from '@mui/icons-material/Apartment';
import BedList from '../Maintentance/BedList';


const Biomedical = () => {
    const { data: getllBlockedBed } = useQuery({
        queryKey: ["getallblockedbed"],
        queryFn: () => getAllBlockedBed()
    })
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }} className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
                        <ApartmentIcon sx={{
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: 28,
                            fontWeight: 700,
                            mt: 2
                        }} />
                        <Typography
                            level='body-sm'
                            fontWeight={'md'}
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: 22,
                                fontWeight: 700,
                                mt: 2
                            }}>
                            BIO MEDICAL
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            gap: 3,
                            px: 1,
                            width: "100%",
                            mt: 1,
                        }}>
                        {
                            getllBlockedBed?.map((item, index) => {
                                return <Box key={index}>
                                    <BedList data={item} />
                                </Box>
                            })}
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Biomedical