import React, { memo, useState } from 'react';
import { Box, Button, Typography, Divider } from '@mui/joy';
import { FaDatabase } from "react-icons/fa";
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import MasterPageLayout from '../../../Components/MasterPageLayout';
import { axiosellider } from '../../../Axios/Axios';
import { succesNofity, warningNofity, errorNofity } from '../../../Constant/Constant';
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import { getNsLastUpdteDate } from '../../../Function/CommonFunction';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const Dataimport = () => {

    const [loading, setLoading] = useState(false);

    const {
        data: lastnsupdatedate,
        isLoading: LoadingaLastUpdateDate,
    } = useQuery({
        queryKey: ['lastupdatedate'],
        queryFn: async () => await getNsLastUpdteDate(),
    });

    //last update 
    const lastUpdateDate = lastnsupdatedate && format(new Date(lastnsupdatedate?.[0]?.last_update_date), 'dd-MMM-yyyy').toUpperCase();

    const handleDataInsert = async () => {
        setLoading(true);
        try {
            const res = await axiosellider.post('/melioraEllider/bed/import', {
                lastUpdteDate: lastUpdateDate
            });
            const { success, message } = res.data;
            if (success === 2) {
                succesNofity(message);
            } else {
                warningNofity("Error in Inserting Master Data...!");
            }
        } catch (error) {
            console.error("Error importing data:", error);
            errorNofity("Failed to import data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {
                (loading || LoadingaLastUpdateDate) &&
                <CustomBackDropWithOutState message={"Please Wait Item Loading..."} />}
            <DefaultPageLayout label="Data Import & Update from Ellider">
                <MasterPageLayout>

                    {/* Import Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2,
                            // height:'40%'
                        }}
                    >
                        <Button
                            onClick={handleDataInsert}
                            variant="solid"
                            color="primary"
                            startDecorator={<FaDatabase />}
                            sx={{
                                background: 'rgba(var(--bg-nav))',
                                // '&:hover': {
                                //     background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                                // },
                            }}>
                            IMPORT MASTER DETAIL
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                            Use the above button to import or update master data from the Ellider system.
                        </Typography>
                    </Box>

                </MasterPageLayout>
            </DefaultPageLayout>
        </>
    );
};

export default memo(Dataimport);
