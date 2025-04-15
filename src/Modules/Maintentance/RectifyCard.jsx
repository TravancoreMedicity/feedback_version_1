import { Box, Typography } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import { axiosApi } from '../../Axios/Axios';
import { employeeID, succesNofity, warningNofity } from '../../Constant/Constant';
import { format } from 'date-fns';

import CustomeChip from '../../Components/CustomeChip';


const RectifyCard = ({ name, checkcomplaint, fetchBedComplaints, selectemp }) => {


    const HanldeComplaintRectification = useCallback(async (value, slno, status) => {

        if (status === 0 && (!selectemp || selectemp?.length === 0)) return warningNofity("Please select the Employee")

        const postData = {
            complaint_slno: slno,
            status: value,
            create_user: employeeID(),
            compalint_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            assigned_user: selectemp
        }
        try {
            const response = await axiosApi.post('feedback/rectifycom', postData)
            const { success } = response?.data;
            if (success !== 2) return warningNofity("Error in Rectifying complaints")
            succesNofity(value === 2 ? "Complaint Rectified" : 'Complaint Not Rectified')
            fetchBedComplaints()
        } catch (error) {
            warningNofity("Error in Rectifing Complaint");
        }
    }, [fetchBedComplaints, selectemp]);


    return (
        <Box sx={{ p: 1, backgroundColor: "rgba(var(--bg-card))", borderRadius: 5, mt: 1 }}>
            <Box sx={{
                borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))",
                display: 'flex', alignItems: 'center', width: '100%', pb: 0.4
            }}>
                <ReceiptLongTwoToneIcon sx={{ color: 'rgba(var(--icon-primary))', fontSize: 26, fontWeight: 700 }} />
                <Typography level="body-sm" fontWeight="md" sx={{
                    fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))', fontSize: 18, fontWeight: 700, ml: 1
                }}>
                    {name}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, mt: 1, }}>
                {checkcomplaint?.map((item, index) => {
                    return (
                        <Box key={index} sx={{ borderRadius: 5, border: 0.03, borderColor: "rgba(var(--border-primary))", display: 'flex', py: 0.2, pr: 0.4, height: 36 }}>
                            <Box sx={{ width: '50%' }}>
                                <Box sx={{ minHeight: 20, }}>
                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                        <Box sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <Box sx={{
                                                height: 30, display: 'flex', alignItems: 'center', px: 2, justifyContent: 'space-between'
                                            }}>
                                                <Typography sx={{
                                                    fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))',
                                                    fontWeight: 500, fontSize: 13
                                                }}>
                                                    {index + 1}. {item?.complaint_desc?.toUpperCase()} ({item?.complaint_dept_name})
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CustomeChip
                                    check={item?.compalint_status === 2}
                                    onClick={() => HanldeComplaintRectification(2, item?.complaint_slno, item?.compalint_status)}
                                    label={'RECTIFIED'}
                                    color={item?.compalint_status === 2 ? "rgba(23, 128, 27, 0.83)" : ''}
                                />
                                <CustomeChip
                                    check={item?.compalint_status !== 2}
                                    onClick={() => HanldeComplaintRectification(1, item?.complaint_slno, item?.compalint_status)}
                                    label={'NOT RECTIFIED'}
                                    color={item?.compalint_status !== 2 ? "rgba(213, 40, 40, 0.83)" : ''}
                                />
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    );
}
export default memo(RectifyCard);

