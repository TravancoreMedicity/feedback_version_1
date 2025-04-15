import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, Suspense } from 'react'
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';


const ComplaintCard = lazy(() => import('./ComplaintCard'))

const AssetComplaint = ({ name, data, bedslno, checkcomplaint, fetchBedComplaints, selectemp, department,  AssetInsert, isinitalchecked, Beddata }) => {

    return (
        <Box sx={{
            p: 1,
            backgroundColor: "rgba(var(--bg-card))",
            borderRadius: 5,
            mt: 1
        }}>
            <Box sx={{
                border: 0,
                borderBottom: 1.5,
                borderColor: "rgba(var(--tab-border-color))",
                borderBottomColor: 'divider',
                borderWidth: 2,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                pb: 0.4
            }}>
                <ReceiptLongTwoToneIcon sx={{
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
                    {name}
                </Typography>
            </Box>
            <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                <ComplaintCard
                    assets={data}
                    bedslno={bedslno}
                    checkcomplaint={checkcomplaint}
                    fetchBedComplaints={fetchBedComplaints}
                    selectemp={selectemp}
                    department={department}
                    AssetInsert={AssetInsert}
                    isinitalchecked={isinitalchecked}
                    Beddata={Beddata}
                />
            </Suspense>
        </Box>
    )
}

export default memo(AssetComplaint)