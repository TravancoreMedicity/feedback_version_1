import { Box, Button } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import TextComponentBox from '../../Components/TextComponentBox';
import ScheduleSendTwoToneIcon from '@mui/icons-material/ScheduleSendTwoTone';
import { EmpauthId, succesNofity, warningNofity } from '../../Constant/Constant';
import { axiosApi } from '../../Axios/Axios';

const PatientNotResponding = ({
    respondremark,
    setRespondRemark,
    PatientData,
    setResponding,
    PatientNotRespondingRemark
}) => {

    // Sumbitting Patient Not responding Remark
    const handlePatientNotResponding = useCallback(async () => {
        if (respondremark?.length === 0) return warningNofity("Please Enter the Remarks")
        const insertData = {
            fb_ip_no: PatientData?.fb_ip_no,
            remarks: respondremark,
            create_user: EmpauthId()
        }
        try {
            const result = await axiosApi.post("/feedback/ptnotresponding", insertData);
            const { success } = result.data;
            if (success === 0) return warningNofity("Error in Inserting Data");
            succesNofity("Successfully Inserted Data...!")
            await PatientNotRespondingRemark(PatientData?.fb_ip_no)
        } catch (error) {
            warningNofity("Error in Api ");
        } finally {
            setResponding(false)
            setRespondRemark("")
        }
    }, [PatientData, respondremark, setResponding, PatientNotRespondingRemark, setRespondRemark]);


    return (
        <Box sx={{
            width: '100%',
            minHeight: '100%',
            position: 'relative',
            overflow: 'scroll',
            bgcolor: "rgba(var(--bg-card))",
            borderRadius: 5,
            py: 0.5
            // display: 'flex'
        }}>
            <Box sx={{ width: '100%', p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EditNoteTwoToneIcon sx={{ color: 'rgba(var(--icon-primary))', fontSize: 28 }} />
                    <TextComponentBox name={`Enter Remarks`} size={14} />
                </Box>
                <textarea
                    onChange={(e) => setRespondRemark(e.target.value)}
                    value={respondremark}
                    placeholder={`Patient Remarks`}
                    style={{
                        backgroundColor: "rgba(var(--bg-card))",
                        width: '100%',
                        minHeight: '70px',
                        fontFamily: "var(--font-varient)",
                        color: 'rgba(var(--font-primary-white))',
                        fontSize: "14px",
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'rgba(var(--border-primary))',
                        padding: '4px',
                        outline: 'none'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(var(--border-primary))';
                        e.target.style.outline = 'none';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(var(--border-primary))';
                    }}
                />
            </Box>
            <Button
                onClick={handlePatientNotResponding}
                size='sm'
                variant="outlined"
                sx={{ mx: 1, color: 'rgba(var(--font-primary-white))' }}
                startDecorator={<ScheduleSendTwoToneIcon />}
            >Submit Remark</Button>
        </Box>
    )
}

export default memo(PatientNotResponding)