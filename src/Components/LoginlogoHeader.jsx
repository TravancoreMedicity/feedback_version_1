import { Box } from '@mui/joy';
import React, { memo } from 'react';
import { Skeleton } from '@mui/material';
import TmcLogo from '../assets/images/FeedbackLogo.png';
import kmcLogo from '../assets/images/FeedbackLogo2.png';
import { fetchCurrentCompany } from '../Function/CommonFunction';
import { useQuery } from "@tanstack/react-query";

const LoginlogoHeader = () => {

    // GETTING THE CURRENT COMPANY KMC OR TMC
    const { data: getCurrentCompany, isLoading, isSuccess } = useQuery({
        queryKey: ['getcurrentcompany'],
        queryFn: fetchCurrentCompany,
        staleTime: Infinity
    });

    // GETTING THE COMPANY SLNO
    const CurrentCompany = isSuccess && getCurrentCompany?.length > 0 ? getCurrentCompany?.[0]?.company_slno : 1;


    // CONDITION RENDERING OF LOGO
    const logoSrc = CurrentCompany === 1 ? TmcLogo : kmcLogo;

    return (
        <Box
            className="flex items-center justify-start w-40 h-40 border-1 rounded-full"
            sx={{ filter: 'drop-shadow(5px 5px 20px rgba(224, 171, 196, 0.61))' }}
        >
            <Box
                sx={{
                    width: { xs: 120, sm: 120 },
                    height: { xs: 120, sm: 120 },
                    position: 'relative',
                }}>
                {isLoading || !CurrentCompany || !isSuccess ? (
                    <Skeleton
                        variant="circular"
                        width={100}
                        height={100}
                        sx={{
                            background: 'linear-gradient(45deg, rgba(123, 31, 162, 0.59), rgba(194, 24, 92, 0.6), rgba(25, 118, 210, 0.62))',
                            position: 'absolute',
                            top: 60,
                            left: 30,
                        }}
                    />
                ) : (
                    <img
                        src={logoSrc}
                        alt="Feedback Logo"
                        style={{
                            width: '100%',
                            height: '100%',
                            // borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default memo(LoginlogoHeader);
