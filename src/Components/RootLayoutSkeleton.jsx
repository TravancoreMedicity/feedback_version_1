import { Grid } from '@mui/joy';
import { Box, Skeleton } from '@mui/material';
import React, { memo } from 'react'

const RootLayoutSkeleton = () => {
    return (

        <Grid
            container
            alignItems="stretch"
            justifyContent="center"
            sx={{
                width: '100vw',
                height: '100vh',

            }}>
            <Grid>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    paddingTop: { xs: 10 },
                    alignItems: 'center',
                    justifyContent: { xs: "none", sm: 'center', md: 'center', lg: 'center' },
                    width: '100vw',

                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            gap: 1
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            width={80}
                            height={80}
                            sx={{
                                background: 'linear-gradient(45deg,rgba(123, 31, 162, 0.59),rgba(194, 24, 92, 0.6),rgba(25, 118, 210, 0.62))'
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            borderRadius: 2,
                            // boxShadow: { xs: 0, sm: 3, lg: 3, xl: 3 },
                            width: { lg: '450px', md: '450px', sm: '450px', xs: '90%' },
                            height: '320px',
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Skeleton
                            variant="text"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                width: { xs: '80%', sm: '70%' },
                                height: { xs: 20, sm: 24 },
                                marginBottom: 2,
                            }}
                        />
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                width: { xs: '100%', sm: '90%' },
                                height: 40,
                                marginTop: { xs: 3, sm: 2 },
                                marginBottom: 2,
                            }}
                        />
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                width: { xs: '100%', sm: '90%' },
                                height: 40,
                                marginTop: { xs: 3, sm: 2 },
                                marginBottom: 2,
                            }}
                        />
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                marginTop: { xs: 4, sm: 2 },
                                width: { xs: '99%', sm: '90%' },
                                height: { lg: 40, sm: 40, xs: 40 },
                                borderRadius: { xs: 10, sm: 3 },
                            }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{
                                display: { xs: 'block', sm: 'block' },
                                width: { xs: '60%', sm: '50%' },
                                height: { xs: 16, sm: 20 },
                                marginTop: 1,
                            }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{
                                width: { xs: '50%', sm: '30%' },
                                height: { xs: 16, sm: 20 },
                                marginTop: 1,
                            }}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default memo(RootLayoutSkeleton)