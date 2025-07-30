import { Box, Button, Chip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { EmpauthId, succesNofity, warningNofity } from '../../Constant/Constant'
import { format } from 'date-fns';
import { axiosApi } from '../../Axios/Axios';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ChipList from '../../Components/ChipList';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';


const HkComplaintCard = ({
    DamagedItem,
    BedDetail,
    selectemp,
    Complaints,
    setOpen,
    DepartmentDetail,
    RefetchComplaint
}) => {

    const [cmploading, setCmpLoading] = useState(false);

    // filtering item to insert if the item selected for complaint don't already Checked
    const DamageItemtoInsert = DamagedItem?.filter((item) => item?.isAlreadyChecked === 0);

    // const isAnyComplaintRectified = Complaints?.filter(val => val?.compalint_status === 2);

    // for tracking how many of the Damaged Items are not  Registerd Yet
    const unmatchedItems = DamagedItem?.filter(item =>
        !Complaints?.some(val => val?.complaint_desc === item?.fb_hk_rm_cklist_name)
    );


    // function for regirstering house keeping complaints
    const handlehousekeepingcomplaintregistration = useCallback(async () => {
        setCmpLoading(true)
        try {

            if (unmatchedItems?.length === 0) {
                warningNofity("Select a complaint to register");
                return;
            }

            const postdataforcomplaint = {
                complaint_request_slno: 1,
                compalint_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                cm_location: BedDetail.rm_outlet_slno,
                cm_assets: unmatchedItems,
                complaint_deptslno: DepartmentDetail?.[0]?.complaint_dept_slno,
                asset_status: 1,
                complaint_status: 0,
                cm_complaint_location: BedDetail?.fb_bdc_no,
                complaint_dept_secslno: BedDetail.rm_outlet_slno,
                create_user: Number(EmpauthId()),
                fb_ticket: 2
            };


            const payload = {
                data: DamageItemtoInsert,
                fb_bed_slno: BedDetail?.fb_bed_slno,
                fb_hk_bd_status: (BedDetail?.fb_hk_check_status === null || BedDetail?.fb_hk_check_status === undefined)
                    ? 0 : BedDetail?.fb_hk_check_status,
                fb_hk_emp_assign: selectemp
            };

            if (DamageItemtoInsert?.length > 0) {
                const response = await axiosApi.post('/feedback/inserthkbeddetail', payload);
                const { success } = response.data;
                if (success !== 2) return warningNofity("Error in Inserting Data")
            };

            const complaintResponse = await axiosApi.post('/feedback/hkcmpreg', postdataforcomplaint);
            if (complaintResponse?.data?.success !== 2) {
                return warningNofity("Error in Inserting Complaint");
            };
            succesNofity("Complaint Registered Successfully");
            RefetchComplaint()
        } catch (error) {
            warningNofity("Error in Inserting Data")
        } finally {
            setCmpLoading(false)
        }
    }, [selectemp, BedDetail, DamageItemtoInsert, unmatchedItems, DepartmentDetail, RefetchComplaint]);







    return (
        <>
            <Box sx={{
                display: 'flex',
                gap: 1,
                px: 1, mt: 1,
                borderRadius: 5,
                border: 0.03,
                borderColor: "rgba(var(--border-primary))",
                py: 0.2
            }}>
                <Box sx={{ width: { xs: "80%", sm: '70%' } }}>
                    {DamagedItem?.map((val, index) => {
                        const matcheddata = Complaints?.find(item => item?.complaint_desc === val?.fb_hk_rm_cklist_name);
                        return (
                            <Box key={index} sx={{
                                minHeight: 25,
                                display: { xs: 'block', sm: 'block', md: 'block', lg: 'flex' }

                            }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        mb: 0.2
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
                                                px: 2,
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                                position: 'relative'
                                            }}>
                                            <Typography sx={{
                                                fontFamily: 'var(--font-varient)',
                                                color: 'rgba(var(--font-primary-white))',
                                                fontWeight: 500,
                                                fontSize: { xs: 10, sm: 13 },
                                            }}>
                                                {`${index + 1}. ${val?.fb_hk_rm_cklist_name?.toUpperCase()}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ position: { xs: 'relative', sm: 'relative', md: 'relative', lg: 'absolute' }, ml: 0.2 }}>
                                        {
                                            matcheddata?.compalint_status === 2 ?
                                                <DoneAllTwoToneIcon color='success' sx={{ fontSize: 15 }} /> : matcheddata?.compalint_status === 1 ?
                                                    <DoneAllTwoToneIcon color='warning' sx={{ fontSize: 15 }} /> : ""
                                        }
                                    </Box>
                                </Box>

                                {
                                    matcheddata?.Registered_user && <ChipList
                                        label="Registered By:"
                                        Icon={VpnKeyTwoToneIcon}
                                        color="success"
                                        list={[matcheddata?.Registered_user]}
                                    />
                                }

                                {
                                    matcheddata?.assigned_employees !== null && matcheddata?.assigned_employees !== undefined && <ChipList
                                        label="Assigned By"
                                        Icon={AssignmentIndTwoToneIcon}
                                        color="warning"
                                        list={matcheddata?.assigned_employees?.split(',')}
                                    />
                                }
                                {
                                    matcheddata?.rectified_employees !== null && matcheddata?.rectified_employees !== undefined && <ChipList
                                        label="Rectified By"
                                        Icon={AssignmentTurnedInTwoToneIcon}
                                        color="danger"
                                        list={matcheddata?.rectified_employees?.split(',')}
                                    />
                                }


                            </Box>
                        )
                    }
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'end', width: '40%', }}>
                    <Box sx={{
                        px: 1,
                        width: '90%',
                        height: 35,
                        my: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                    }}>
                        <Button
                            disabled={cmploading || unmatchedItems?.length === 0}
                            onClick={handlehousekeepingcomplaintregistration}
                            variant="outlined"
                            sx={{
                                fontSize: { xs: 7, sm: 11 },
                                fontWeight: 900,
                                height: 35,
                                border: '1px solid rgb(216, 75, 154, 1)',
                                color: 'rgb(216, 75, 154, 1)',
                                bgcolor: '#fff0f3',
                                borderRadius: { xs: 7, sm: 2 },
                                '&:hover': {
                                    boxShadow: 'none',
                                    color: 'rgb(216, 75, 154, 1)',
                                }
                            }}>
                            {
                                cmploading && unmatchedItems?.length === 0 ? ' Registered ' : 'Register'
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default memo(HkComplaintCard)