import { Box, Typography } from '@mui/joy';
import React, { lazy, memo, Suspense, useCallback } from 'react';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const CustomeChip = lazy(() => import('../../Components/CustomeChip'))

const BedListCard = ({ assets, setCondtion, condition, exists, checkcomplaint }) => {

    const checkIfLabelIncludesZero = useCallback((data, label, valueToCheck) => {
        return data?.some(item => item[label] === valueToCheck);
    }, []);

    const CheckIfComplaintInclude = useCallback((data, label, valueToCheck) => {
        return data?.some(item => item[label] === valueToCheck);
    }, []);

    const handleCheckboxChange = useCallback((label, value) => {
        const ispresent = checkIfLabelIncludesZero(exists, "fb_asset_name", label);
        const iscomplaint = CheckIfComplaintInclude(checkcomplaint, "complaint_desc", label);
        if (iscomplaint) return;
        if (ispresent) return;
        setCondtion((prevState) => ({
            ...prevState,
            [label]: value
        }));
    }, [checkcomplaint, exists, setCondtion, checkIfLabelIncludesZero, CheckIfComplaintInclude]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, mt: 1 }}>
            {assets?.map((item, index) => {
                let combine = item?.fb_asset_name;
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            py: 1,
                            borderRadius: 5,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                        <Box sx={{ width: { xs: '100%', sm: '45%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        fontFamily: 'var(--font-varient)',
                                        color: 'rgba(var(--font-primary-white))',
                                        fontWeight: 600,
                                        fontSize: { xs: 11, sm: 14 },
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        textWrap: 'wrap',
                                        ml: 1,
                                        mb: { xs: 1, sm: 0 }
                                    }}>
                                    <DriveFileRenameOutlineIcon sx={{
                                        color: 'rgba(var(--icon-primary))',
                                        fontSize: { xs: 15, sm: 26 },
                                        display: { xs: 'inline-block', sm: 'none' }
                                    }} />
                                    {item?.fb_asset_name?.toUpperCase()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: { xs: '100%', sm: '45%' },
                            display: 'flex',
                            justifyContent: { xs: 'space-around', sm: 'space-between' },
                            pr: { xs: 0, sm: 2 }
                        }}>
                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                <CustomeChip
                                    check={condition?.[combine] === 1}
                                    onClick={() => handleCheckboxChange(combine, 1)}
                                    label={'GOOD CONDITION'}
                                    color={condition?.[combine] === 1 ? "rgba(23, 128, 27, 0.83)" : ''}
                                />
                            </Suspense>
                            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                <CustomeChip
                                    check={condition?.[combine] === 2}
                                    onClick={() => handleCheckboxChange(combine, 2)}
                                    label={'POOR CONDITION'}
                                    color={condition?.[combine] === 2 ? "rgba(213, 40, 40, 0.83)" : ''}
                                />
                            </Suspense>
                        </Box>
                    </Box>
                )
            }
            )}
        </Box>
    );
};

export default memo(BedListCard);
