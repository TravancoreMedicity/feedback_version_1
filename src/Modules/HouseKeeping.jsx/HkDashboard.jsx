import React, { lazy, memo, useMemo } from 'react';
import { Box } from '@mui/joy';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';



const HkDashboardCards = lazy(() => import('./HkDashboardCards'));
const HouseKeeping = lazy(() => import('./HouseKeeping'));

const HkDashboard = ({ getllBlockedBed, setAssignedBed, assingedbed,HandleBedAssign }) => {
    const groupedBeds = useMemo(() => {
        if (!getllBlockedBed) return {};
        // Filter out beds that are already assigned
        const filteredBeds = getllBlockedBed?.filter(
            bed => !assingedbed?.includes(bed?.fb_bdc_no)
        );
        // Group the remaining beds by fb_ns_name
        return filteredBeds?.reduce((acc, bed) => {
            const key = bed?.fb_ns_name || 'Unknown';
            acc[key] = acc[key] ? [...acc[key], bed] : [bed];
            return acc;
        }, {});
    }, [getllBlockedBed, assingedbed]);

    const AllBeds = useMemo(() => getllBlockedBed?.length, [getllBlockedBed]);


    return (
        <Box
            className="flex flex-col rounded-xl py-1 w-full"
            sx={{
                backgroundColor: 'rgba(var(--bg-card))',
                height: 'calc(100% - 50px)',
                cursor: 'pointer',
            }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                {[
                    { name: 'ALL', code: AllBeds, icon: <ReceiptLongIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                    { name: 'PENDING', code: 25, icon: <PendingActionsIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                    { name: 'COMPLETED', code: 35, icon: <AssignmentTurnedInIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                    { name: 'PROCESSING', code: 40, icon: <PlaylistAddIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                ].map((item) => (
                    <HkDashboardCards
                        key={item?.code}
                        count={item?.code}
                        data={[]} // You might want to pass actual data here later
                        name={item?.name}
                        icon={item?.icon}
                    />
                ))}
                <HouseKeeping
                    setAssignedBed={setAssignedBed}
                    groupedBeds={groupedBeds}
                    HandleBedAssign={HandleBedAssign}
                />
            </Box>
        </Box>
    );
};

export default memo(HkDashboard);
