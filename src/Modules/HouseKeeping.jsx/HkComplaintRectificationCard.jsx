import { Suspense } from 'react';
import { format } from 'date-fns';
import { Box, Typography } from '@mui/joy';
import { axiosApi } from '../../Axios/Axios';
import React, { lazy, memo, useCallback } from 'react';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import { EmpauthId, employeeID, succesNofity, warningNofity } from '../../Constant/Constant';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';


const CustomeChip = lazy(() => import('../../Components/CustomeChip'));

const HkComplaintRectificationCard = ({ name, checkcomplaint, RefetchComplaint, selectemp }) => {


    const id = EmpauthId();



    const HanldeComplaintRectification = useCallback(async (value, slno, status, AssignedUser, RegisterUser) => {


        if (status && status === 1 && id !== parseInt(AssignedUser)) {
            warningNofity(`Item already assigned By  ${RegisterUser}`)
            return
        };



        const postData = {
            complaint_slno: slno,
            status: value,
            create_user: employeeID(),
            compalint_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            assign_rect_status: 1,
            assign_status: 1,
            assigned_user: [parseInt(id)]
        }
        try {
            const response = await axiosApi.post('feedback/rectifycom', postData)
            const { success } = response?.data;
            if (success !== 2) return warningNofity("Error in Rectifying complaints")
            succesNofity(value === 2 ? "Complaint Rectified" : 'Complaint Not Rectified')
            RefetchComplaint()
        } catch (error) {
            warningNofity("Error in Rectifing Complaint");
        }

    }, [selectemp, RefetchComplaint]);




    return (
        <Box sx={{ p: 1, backgroundColor: "rgba(var(--bg-card))", borderRadius: 5, mt: 1 }}>
            <Box sx={{
                borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))",
                display: 'flex', alignItems: 'center', width: '100%', pb: 0.4
            }}>
                <ReceiptLongTwoToneIcon sx={{ color: 'rgba(var(--icon-primary))', fontSize: { xs: 20, sm: 26 }, fontWeight: 700 }} />
                <Typography level="body-sm" fontWeight="md" sx={{
                    fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))', fontSize: { xs: 14, sm: 18 }, fontWeight: 700, ml: 1
                }}>
                    {name}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, mt: 1 }}>
                {checkcomplaint?.map((item, index) => {
                    return (
                        <Box key={index}
                            sx={{
                                borderRadius: 5,
                                border: 0.03,
                                borderColor: "rgba(var(--border-primary))",
                                display: 'flex',
                                py: 0.2,
                                pr: 0.4,
                                height: { xs: 65, sm: 36 },
                                flexDirection: { xs: 'column', sm: "row" }
                            }}>
                            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                <Box sx={{ minHeight: 20, }}>
                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                        <Box sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <Box sx={{
                                                height: 30, display: 'flex', alignItems: 'center', px: 2, justifyContent: 'space-between'
                                            }}>
                                                <Typography sx={{
                                                    fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))',
                                                    fontWeight: 500,
                                                    fontSize: { xs: 10, sm: 13 },
                                                }}>

                                                    {index + 1}. {item?.complaint_desc?.toUpperCase()} ({item?.complaint_dept_name})
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                width: { xs: '100%', sm: '50%' },
                                display: 'flex',
                                justifyContent: { xs: 'space-around', sm: 'space-between' },
                                alignItems: 'center'
                            }}>
                                <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                                    <CustomeChip
                                        check={item?.compalint_status === 2}
                                        onClick={() => HanldeComplaintRectification(2, item?.complaint_slno, item?.compalint_status, item?.assigned_employee_ids, item?.assigned_employees)}
                                        label={'RECTIFIED'}
                                        color={item?.compalint_status === 2 ? "rgba(23, 128, 27, 0.83)" : ''}
                                    />
                                </Suspense>
                                <Suspense fallback={<CustomBackDropWithOutState message={"loading"} />}>
                                    <CustomeChip
                                        check={item?.compalint_status !== 2}
                                        onClick={() => HanldeComplaintRectification(1, item?.complaint_slno, item?.compalint_status, item?.assigned_employee_ids, item?.assigned_employees)}
                                        label={'NOT RECTIFIED'}
                                        color={item?.compalint_status !== 2 ? "rgba(213, 40, 40, 0.83)" : ''}
                                    />
                                </Suspense>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    );
}
export default memo(HkComplaintRectificationCard);




