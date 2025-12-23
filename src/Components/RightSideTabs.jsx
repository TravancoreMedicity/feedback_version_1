import { Box, Typography } from '@mui/joy';
import BedIcon from '@mui/icons-material/Bed';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { memo } from 'react';

const tabs = [
    { key: 'BED', label: 'Bed', icon: <BedIcon fontSize="small" /> },
    { key: 'DISCHARGE', label: 'Discharge', icon: <ExitToAppIcon fontSize="small" /> },
];

const RightSideTabs = ({ activeTab, setActiveTab }) => {
    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 170 },
                height: 48,
                position: 'absolute',
                right: 25,
                top: 8,
                display: 'flex',
                justifyContent: 'space-between',
                px: 1,
                backgroundColor: 'rgba(var(--bg-card))',
                borderRadius: '10px',
            }}
        >
            {tabs.map((tab) => {
                const active = activeTab === tab.key;

                return (
                    <Box
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        sx={{
                            width: 100,
                            height: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0.4,
                            px: 2,
                            cursor: 'pointer',

                            color: active
                                ? '#ff4d6d'
                                : 'rgba(var(--font-primary-white))',
                            // boxShadow: active
                            //     ? 'inset 0 0 6px rgba(0,0,0,0.35)'
                            //     : 'none',

                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            ml: 1
                        }}
                    >

                        {/* {active && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 5,
                                    right: 6,
                                    height: 3,
                                    backgroundColor: '#ff4d6d',
                                    borderRadius: '0 0 4px 4px',
                                    width: activeTab === "DISCHARGE" ? 90 : 70,
                                }}
                            />
                        )} */}


                        {active && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: activeTab === "DISCHARGE" ? 95 : 72,
                                    width: 3,
                                    height: 22,
                                    backgroundColor: '#ff4d6d',
                                    borderRadius: '4px',

                                }}
                            />
                        )}

                        {tab.icon}

                        <Typography
                            level="body-xs"
                            sx={{
                                fontFamily: 'var(--font-varient)',
                                fontWeight: active ? 600 : 500,
                                color: 'inherit',
                                lineHeight: 1,
                            }}
                        >
                            {tab.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default memo(RightSideTabs);
