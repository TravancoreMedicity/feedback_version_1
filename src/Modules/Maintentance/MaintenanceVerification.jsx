import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import { getDepartmentEmployee, getLoggedEmpDetail } from '../../Function/CommonFunction';
import { EmpauthId } from '../../Constant/Constant';
import { useQuery } from '@tanstack/react-query';
import CustomDateTimePicker from '../../Components/CustomDateTimePicker ';
import { format } from 'date-fns';
import MultipleSelect from '../../Components/MultipleSelect';

const MaintenanceVerification = ({
    remark,
    time,
    empid,
    setEmpid,
    verificationdetail,
    setVerificationDetail
}) => {
    const id = EmpauthId()
    const [error, setError] = useState("")

    const { data: getlogempdetail } = useQuery({
        queryKey: ["loggedempdetail", id],
        queryFn: () => getLoggedEmpDetail(id)
    });
    const departmentSection = useMemo(() => getlogempdetail?.[0]?.em_dept_section, [getlogempdetail]);

    const { data: departmentemp } = useQuery({
        queryKey: ['fetchalldepemployee', departmentSection],
        queryFn: () => getDepartmentEmployee(departmentSection),
        enabled: !!departmentSection,
    })
    const handleChange = useCallback((e) => {
        setVerificationDetail({ ...verificationdetail, [e.target.name]: e.target.value })
    }, [verificationdetail, setVerificationDetail]);


    const hanldmultiplechange = useCallback((e, val) => {
        setEmpid(val); // Update the selected emp IDs
    },[setEmpid]);

    const handleTimeChange = useCallback((e) => {
        const selectedTime = e.target.value;
        const currentTime = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
        if (selectedTime > currentTime) {
            setError("Selected time cannot be in the future!")
            return
        } else {
            handleChange(e);
            setError("")
        }
    }, [setError, handleChange]);



    return (
        <Box sx={{
            p: 1,
            backgroundColor: "rgba(var(--bg-card))",
            borderRadius: 5,
            mt: 1
        }}>
            <Box sx={{ border: 0, borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))", borderBottomColor: 'divider', borderWidth: 2, display: 'flex', alignItems: 'center', width: '100%', pb: 0.4 }} >
                <VerifiedUserTwoToneIcon sx={{
                    color: 'rgba(var(--icon-primary))',
                    fontSize: 26,
                    fontWeight: 700
                }} />
                <Typography
                    level='body-sm'
                    fontWeight={'md'}
                    sx={{
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: 18,
                        fontWeight: 700
                    }}>
                    VERIFICATION PENDING
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    mt: 1,
                }}>
                <Typography level='body-sm'
                    sx={{
                        fontWeight: 600,
                        fontFamily: "var(--font-varient)",
                        opacity: 0.8,
                        paddingLeft: "0.26rem",
                        lineHeight: "1.0rem",
                        fontSize: "0.81rem",
                        color: 'rgba(var(--font-primary-white))',
                        paddingY: "0.26rem",
                    }}
                    fontSize='0.7rem'
                >Select Employee</Typography>
                <MultipleSelect
                    data={departmentemp ? departmentemp : []}
                    onchange={hanldmultiplechange}
                    value={empid}
                />
                <Typography level='body-sm'
                    sx={{
                        fontWeight: 600,
                        fontFamily: "var(--font-varient)",
                        opacity: 0.8,
                        paddingLeft: "0.26rem",
                        lineHeight: "1.0rem",
                        fontSize: "0.81rem",
                        color: 'rgba(var(--font-primary-white))',
                        paddingY: "0.26rem",
                    }}
                    fontSize='0.7rem'
                >Remarks</Typography>
                <textarea
                    onChange={(e) => handleChange({ target: { name: 'remark', value: e.target.value } })}
                    value={remark}
                    placeholder={` Remarks`}
                    style={{
                        width: '100%',
                        minHeight: '70px',
                        fontFamily: "var(--font-varient)",
                        // color: 'rgba(var(--font-primary-white))',
                        fontSize: "14px",
                        borderWidth: '2.8px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(var(--input-bg-color))',
                        borderColor: 'rgba(var(--input-border-color))',
                        color: 'rgba(var(--input-font-color))',
                        padding: '4px',
                        outline: 'none',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(var(--input-border-color))';
                        e.target.style.outline = 'none';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(var(--border-primary))';
                    }}
                />
                {/* <CustomDateTimePicker /> */}
                <Typography level='body-sm'
                    sx={{
                        fontWeight: 600,
                        fontFamily: "var(--font-varient)",
                        opacity: 0.8,
                        paddingLeft: "0.26rem",
                        lineHeight: "1.0rem",
                        fontSize: "0.81rem",
                        color: 'rgba(var(--font-primary-white))',
                        paddingY: "0.26rem",
                    }}
                    fontSize='0.7rem'
                > Select Time</Typography>
                <CustomDateTimePicker
                    type="datetime-local"
                    name="time"
                    value={time || ''}  // Ensure value is not undefined
                    slotProps={{
                        input: {
                            max: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm'), // Current date and time
                        },
                    }}
                    onchange={handleTimeChange}
                />
                {
                    error !== "" && <Typography level='body-sm'
                        sx={{
                            fontWeight: 600,
                            fontFamily: "var(--font-varient)",
                            opacity: 0.8,
                            paddingLeft: "0.26rem",
                            lineHeight: "1.0rem",
                            fontSize: "0.81rem",
                            color: error ? "red" : 'rgba(var(--font-primary-white))',
                            paddingY: "0.26rem",
                        }}
                        fontSize='0.7rem'
                    >  {error ? error : "Select Time"}</Typography>
                }

            </Box>
        </Box>
    )
}

export default memo(MaintenanceVerification)