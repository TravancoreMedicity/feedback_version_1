import { Box, Typography } from '@mui/joy';
import React, { memo, } from 'react';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import BedListCard from './BedListCard';

const BedListOtherDep = ({ name, selectedItems, setSelectedItems, status, dep, current }) => {
    const selectmaintenance = selectedItems ? Object.values(selectedItems).filter(value => value === true).length : 0;
    const totallength = selectedItems ? Object.values(selectedItems).length : 0;
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
                    {name} {status === 1 && (totallength === selectmaintenance) ? "VERIFIED" : 'CHECKLIST'}
                </Typography>
            </Box>
            <BedListCard
                dep={dep}
                current={current}
                status={status}
                totallength={totallength}
                trueitemlength={selectmaintenance}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems} />
        </Box>
    );
};

export default memo(BedListOtherDep);
