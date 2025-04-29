import { Box, Typography } from '@mui/joy';
import React, { lazy, memo } from 'react';

const GoodBadSelector = lazy(() => import('../../Components/GoodBadSelector'));

const HkChecklistCard = ({ item, handleChange }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, }}>
            {item?.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            height: 50,
                            px: 1,
                            borderRadius: 5,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                        }}>
                        <Box sx={{
                            width: '50%',
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center'
                        }} >
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontWeight: 600,
                                    fontSize: {xs:10,sm:14}
                                }}>
                                {item?.fb_hk_rm_cklist_name?.toUpperCase()}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', gap: 1, justifyContent: "center" }} >
                            <GoodBadSelector
                                handleChangeChecked={(value) =>
                                    handleChange(item?.fb_hk_rm_cklist_name, value, 'ispresent')
                                }
                            />
                        </Box>

                    </Box>
                )
            })}
        </Box>
    );
};

export default memo(HkChecklistCard);
