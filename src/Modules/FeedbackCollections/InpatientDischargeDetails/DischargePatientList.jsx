import React, { memo, useMemo } from 'react'
import PatientInfoCard from './PatientInfoCard'
import { Box } from '@mui/joy'
import NoDischargedPatient from './NoDischargedPatient';
import PatientInfoCardSkeleton from './PatientInfoCardSkeleton';



const DischargePatientList = ({
    dischargePatient, loadingDischargePatient
}) => {


    // Group Patient Based on the Feedback Id
    const groupedPatients = useMemo(() =>
        Object.values(
            dischargePatient?.reduce((acc, curr) => ({
                ...acc,
                [curr.fb_ip_no]: {
                    ...(acc[curr.fb_ip_no] || curr),
                    feedbacks: [
                        ...(acc[curr.fb_ip_no]?.feedbacks || []),
                        ...(curr.fb_transact_slno ? [{
                            fb_transact_slno: curr.fb_transact_slno,
                            fdmast_slno: curr.fdmast_slno
                        }] : [])
                    ]
                }
            }), {})
        ), [dischargePatient]);


    /**
     * Memoizing the Discharge Patient Before mapting 
     * 

    const FinalDischargePatient = useMemo(() => {
        return dischargePatient || []
    }, [dischargePatient]);
    * 
     */
    const FinalDischargePatient = groupedPatients ?? [];

    return (
        <Box sx={{ mt: 5 }}>
            {
                loadingDischargePatient &&
                Array.from({ length: 10 }).map((_, i) => (
                    <Box key={i}>
                        <PatientInfoCardSkeleton />
                    </Box>
                ))
            }

            {
                !loadingDischargePatient &&
                FinalDischargePatient?.length === 0 &&
                <NoDischargedPatient
                    message="No discharge records available"
                />
            }


            {
                FinalDischargePatient?.map((item, inx) => {
                    return (
                        <Box key={`dischargePat-${inx}`} sx={{ mb: 0.5 }}>
                            <PatientInfoCard
                                patientdata={item}
                                submittedFeedback={item?.feedbacks || []}
                                data={{
                                    ip: item?.fb_ip_no,
                                    patientId: item?.fb_pt_no,
                                    patientName: item?.fb_ptc_name,
                                    ageGender: item?.fb_ptd_dob,
                                    address: item?.fb_ptc_loadd1,
                                    room: item?.fb_bdc_no,
                                    doctor: item?.fb_doc_name,
                                    mobile: item?.fb_ptc_mobile,
                                    status: item?.fb_ipc_curstatus,
                                }}
                            />
                        </Box>
                    )
                })
            }

        </Box>

    )
}

export default memo(DischargePatientList);