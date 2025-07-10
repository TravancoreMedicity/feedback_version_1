import React, { memo, useCallback } from 'react'
import { format } from 'date-fns';
import { Button } from '@mui/material';
import { Box, Typography } from '@mui/joy'
import { axiosApi } from '../../Axios/Axios';
import { EmpauthId, succesNofity, warningNofity } from '../../Constant/Constant';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import ChipList from '../../Components/ChipList';

const ComplaintCard = ({
    assets,
    bedslno,
    checkcomplaint,
    fetchBedComplaints,
    selectemp,
    department,
    AssetInsert,
    isinitalchecked,
    Beddata }) => {


    const IsExist = assets?.some(asset =>
        checkcomplaint?.some(val => asset.complaint_dept_slno === val.complaint_deptslno)
    );


    const filteredAssets = assets?.filter(asset =>
        !checkcomplaint?.some(complaint =>
            complaint.complaint_desc === asset?.fb_asset_name
        )
    );


    const updatedAssets = filteredAssets?.map(asset => {
        return {
            ...asset,
            complaint_status: 0
        };
    });


    // function to Register Complaints
    const handlecomplaintRegistration = useCallback(async (department) => {

        if (!assets || assets?.length === 0) return warningNofity("No assets to register complaints");

        // Post data for Complaints 
        const postdataforcomplaint = {
            complaint_request_slno: 1,
            compalint_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            cm_location: Beddata?.rm_outlet_slno,
            cm_assets: updatedAssets,
            asset_status: 1,
            create_user: Number(EmpauthId()),
            cm_complaint_location: Beddata?.fb_bdc_no,
            complaint_dept_secslno: Beddata?.rm_outlet_slno,
            fb_ticket: 1
        };
        // post data for Bed Detail
        const postdata = {
            fb_bed_slno: Beddata?.fb_bed_slno,
            fb_bd_code: Beddata?.fb_bd_code,
            fb_bdc_no: Beddata?.fb_bdc_no,
            fb_ns_code: Beddata?.fb_ns_code,
            fb_complaint_postdata: 1,
            data: AssetInsert
        };

        try {
            if (isinitalchecked) {
                const response = await axiosApi.post('/feedback/insertbedremarks', postdata);
                if (response.data.success !== 2) {
                    return warningNofity("Error in Inserting Bed Remarks");
                }
            }
            const complaintResponse = await axiosApi.post('/feedback/complaintregistraion', postdataforcomplaint);
            if (complaintResponse?.data?.success !== 2) {
                return warningNofity("Error in Inserting Complaint");
            }
            succesNofity("Complaint Registered Successfully");
            fetchBedComplaints();
        } catch (error) {
            warningNofity("Error in Inserting Data");
        }
    }, [assets, fetchBedComplaints, updatedAssets, Beddata, isinitalchecked, AssetInsert]);

    const displayItems = IsExist && filteredAssets?.length === 0 ? checkcomplaint : assets;

    return (
        <>
            <Box sx={{
                display: 'flex',
                gap: 1,
                px: 1, mt: 1,
                borderRadius: 5,
                border: 0.03,
                borderColor: "rgba(var(--border-primary))",
            }}>
                <Box sx={{ width: '80%', py: 1 }}>
                    {displayItems?.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    minHeight: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xs: 'block', sm: 'block', md: 'block', lg: 'flex' }
                                    }}>
                                    <Box sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <Box
                                            sx={{
                                                height: 30,
                                                display: 'flex',
                                                alignItems: 'center',
                                                px: { xs: 0, sm: 2 },
                                                gap: 2
                                            }}
                                        >
                                            <Typography sx={{
                                                fontFamily: 'var(--font-varient)',
                                                color: 'rgba(var(--font-primary-white))',
                                                fontWeight: 500,
                                                fontSize: { xs: 10, sm: 13 },
                                            }}>
                                                {
                                                    IsExist &&
                                                        filteredAssets?.length === 0
                                                        ? `${index + 1}. ${item?.complaint_desc?.toUpperCase()} (${item?.complaint_dept_name})`
                                                        : `${index + 1}. ${item?.fb_asset_name?.toUpperCase()} (${item?.complaint_dept_name})`
                                                }
                                            </Typography>

                                            <Box sx={{
                                                position: { xs: 'relative', sm: 'relative', md: 'relative', lg: 'absolute' },
                                                ml: 0.2
                                            }}>
                                                {
                                                    item?.compalint_status === 2 ?
                                                        <DoneAllTwoToneIcon
                                                            color='success'
                                                            sx={{ fontSize: 15 }}
                                                        /> :
                                                        item?.compalint_status === 1 ?
                                                            <DoneAllTwoToneIcon
                                                                color='warning'
                                                                sx={{ fontSize: 15 }}
                                                            /> : ""
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                    {
                                        item?.Registered_user && <ChipList
                                            label="Registered By:"
                                            Icon={VpnKeyTwoToneIcon}
                                            color="success"
                                            list={[item?.Registered_user]}
                                        />
                                    }

                                    {
                                        item?.assigned_employees !== null && item?.assigned_employees !== undefined && <ChipList
                                            label="Assigned By"
                                            Icon={AssignmentIndTwoToneIcon}
                                            color="warning"
                                            list={item?.assigned_employees?.split(',')}
                                        />
                                    }
                                    {
                                        item?.rectified_employees !== null && item?.rectified_employees !== undefined && <ChipList
                                            label="Rectified By"
                                            Icon={AssignmentTurnedInTwoToneIcon}
                                            color="danger"
                                            list={item?.rectified_employees?.split(',')}
                                        />
                                    }
                                </Box>
                            </Box>
                        )
                    })}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'end', width: '40%', }}>
                    <Box sx={{
                        px: 1,
                        width: { xs: '100%', sm: '90%' },
                        height: 35,
                        my: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                    }}>
                        <Button
                            disabled={IsExist && filteredAssets?.length === 0}
                            onClick={handlecomplaintRegistration}
                            variant="outlined"
                            sx={{
                                fontSize: { xs: 8, sm: 11 },
                                fontWeight: 900,
                                height: { xs: 25, sm: 35 },
                                border: '1px solid rgb(216, 75, 154, 1)',
                                color: 'rgb(216, 75, 154, 1)',
                                bgcolor: '#fff0f3',
                                borderRadius: 2,
                                '&:hover': {
                                    boxShadow: 'none',
                                    color: 'rgb(216, 75, 154, 1)',
                                },
                            }}>
                            {
                                IsExist &&
                                    filteredAssets?.length === 0 ?
                                    'Registered' : 'Register'
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default memo(ComplaintCard)




