import React, { lazy, memo, Suspense } from 'react';
import { Box, Grid, Typography } from '@mui/joy';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';

const HkRoomComponent = lazy(() => import('./HkRoomComponent'));
const ChecklistHeaders = lazy(() => import('../../Components/ChecklistHeaders'));

const HouseKeeping = ({ groupedBeds, setAssignedBed, HandleBedAssign }) => {
    return (
        <Box sx={{ p: 0.5, width: '100%' }}>
            <Box sx={{ mb: 2, p: 1, backgroundColor: 'rgba(var(--bg-card))' }}>
                <Box
                    className="flex flex-col rounded-xl p-1 w-full"
                    sx={{ backgroundColor: 'rgba(var(--bg-card))', height: 'calc(100% - 50px)', cursor: 'pointer' }}
                >
                    <Suspense fallback={<CustomBackDropWithOutState message="Loading..." />}>
                        <ChecklistHeaders
                            icon={
                                <CleaningServicesTwoToneIcon
                                    sx={{
                                        color: 'rgba(var(--font-primary-white))',
                                        fontSize: { xs: 24, sm: 28 },
                                        fontWeight: 700,
                                        mt: 2
                                    }}
                                />
                            }
                            name={`PENDING BED`}
                            value={1}
                        />
                    </Suspense>

                    {Object.entries(groupedBeds)?.map(([floorName, beddetail]) => (
                        <Box
                            key={floorName}
                            className="flex flex-col rounded-xl p-1 mt-2 w-full"
                            sx={{ backgroundColor: 'rgba(var(--bg-card))' }}
                        >
                            <Box sx={{ px: 2.5, display: 'flex', alignItems: 'center', borderBottom: 2, borderColor: 'divider' }}>
                                <MeetingRoomTwoToneIcon
                                    sx={{
                                        color: 'rgba(var(--font-primary-white))',
                                        fontSize: { xs: 17, sm: 20 },
                                        fontWeight: 900
                                    }}
                                />
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        fontFamily: 'var(--font-varient)',
                                        color: 'rgba(var(--font-primary-white))',
                                        ontSize: { xs: 13, sm: 17 },
                                        fontWeight: 600,
                                        ml: 1
                                    }}
                                >
                                    {floorName}
                                </Typography>
                            </Box>

                            <Box sx={{ width: '98%', mx: 'auto', mt: 1 }}>
                                <Grid container spacing={1}>
                                    {beddetail?.map((item, index) => (
                                        <Grid xs={6} sm={3} lg={2} xl={1.5} key={item?.fb_bdc_no || index}>
                                            <Suspense fallback={<CustomBackDropWithOutState message="Loading..." />}>
                                                <HkRoomComponent
                                                    data={item}
                                                    setAssignedBed={setAssignedBed}
                                                    roomnumber={item?.fb_bdc_no}
                                                    HandleBedAssign={HandleBedAssign}
                                                />
                                            </Suspense>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default memo(HouseKeeping);
