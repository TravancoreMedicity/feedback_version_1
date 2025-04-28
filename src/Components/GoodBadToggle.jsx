import React, { useState, useCallback, memo } from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box, Typography } from '@mui/joy';
import { infoNofity } from '../Constant/Constant';

const GoodBadToggle = ({ handleChangeChecked, completed, isexist, value = 0 }) => {
    const initial = value === 1 || value === 2 ? value : null;
    const [selected, setSelected] = useState(initial);

    const handleToggle = useCallback(() => {
        if (isexist) return infoNofity("Item Initially Damaged");
        if (completed) return infoNofity("Initial Checklist Completed");

        const nextState = selected === null ? 1 : selected === 1 ? 2 : 1;
        setSelected(nextState);
        if (handleChangeChecked) handleChangeChecked(nextState);
    }, [selected, completed, isexist, handleChangeChecked]);

    const icon = selected === 2
        ? <CheckCircleOutlineOutlinedIcon sx={{ width:  {xs:12,sm:15}, height:  {xs:12,sm:15} }} color="success" />
        : <CancelOutlinedIcon sx={{ width:  {xs:12,sm:15}, height:  {xs:12,sm:15} }} color={selected === 1 ? 'error' : 'rgba(var(--icon-primary))'} />;

    const label = selected === 2 ? "Good" : "Damaged";

    return (
        <List
            orientation="horizontal"
            variant="outlined"
            sx={{
                display: 'flex',
                '--List-radius': '5px',
                height: 40,
                py: 0.6,
                px: 0.7,
                width: '100%',
            }}>
            <ListItem sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pb: 1,
            }}>
                <Checkbox
                    checked={selected !== null}
                    onChange={handleToggle}
                    disableIcon
                    overlay
                    variant={selected !== null ? 'outlined' : 'plain'}
                    color="neutral"
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {icon}
                            <Typography sx={{
                                fontFamily: 'var(--font-varient)',
                                color: '#495057',
                                fontSize: { xs: 7, sm: 10 },
                                fontWeight: 600,
                            }}>{label}</Typography>
                        </Box>
                    }
                    slotProps={{
                        action: ({ checked }) => ({
                            sx: {
                                bgcolor: checked ? 'background.level1' : 'transparent',
                                boxShadow: checked ? 'sm' : 'none',
                                height: 30,
                                px: 1.5,
                                width: '100%'
                            },
                        }),
                    }}
                />
            </ListItem>
        </List>
    );
};

export default memo(GoodBadToggle);
