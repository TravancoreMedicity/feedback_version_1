import { Box, Typography } from '@mui/joy';
import React, { lazy, memo, Suspense, } from 'react';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';



const BedListCard = lazy(() => import('./BedListCard'));

const BedListOtherDep = ({ name, setCondtion, condition, assets, checkcomplaint, exists }) => {

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
                    {name} CHECKLIST
                </Typography>
            </Box>
            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <BedListCard
                    assets={assets}
                    condition={condition}
                    setCondtion={setCondtion}
                    checkcomplaint={checkcomplaint}
                    exists={exists}
                />
            </Suspense>
        </Box>
    );
};

export default memo(BedListOtherDep);
