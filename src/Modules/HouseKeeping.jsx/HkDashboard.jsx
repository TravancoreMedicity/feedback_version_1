import React, { lazy, memo, useMemo } from 'react';
import { Box } from '@mui/joy';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const HkDashboardCards = lazy(() => import('./HkDashboardCards'));
const HouseKeeping = lazy(() => import('./HouseKeeping'));

const HkDashboard = ({ getllBlockedBed, assingedbed, HandleBedAssign, refetch ,FetchAllBlockedBed}) => {


    const groupedBeds = useMemo(() => {
        if (!getllBlockedBed) return {};
        // Filter out beds that are already assigned
        const assignedBedIds = assingedbed?.map(item => item?.fb_bed_slno);

        const filteredBeds = getllBlockedBed?.filter(
            bed => !assignedBedIds?.includes(bed?.fb_bed_slno)
        );

        // Group the remaining beds by fb_ns_name
        return filteredBeds?.reduce((acc, bed) => {
            const key = bed?.fb_ns_name || 'Unknown';
            acc[key] = acc[key] ? [...acc[key], bed] : [bed];
            return acc;
        }, {});
    }, [getllBlockedBed, assingedbed]);


    // All beds fro cleaning counts
    const AllBeds = useMemo(() => getllBlockedBed?.length, [getllBlockedBed]);
    const AllassignedBeds = useMemo(() => assingedbed?.length, [assingedbed]);
    const TotalPendingBeds = useMemo(() => Object.values(groupedBeds)?.reduce((total, wardBeds) => total + wardBeds?.length, 0), [groupedBeds]);
    const ToatlOnProcessBeds = useMemo(() => assingedbed?.filter(item => [0, 1].includes(item?.fb_hk_check_status))?.length, [assingedbed]);

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
                    { name: 'ASSIGNED', code: AllassignedBeds, icon: <PendingActionsIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                    { name: 'PENDING', code: TotalPendingBeds, icon: <AssignmentTurnedInIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                    { name: 'PROCESSING', code: ToatlOnProcessBeds, icon: <PlaylistAddIcon className='hoverClass' sx={{ width: 30, height: 30, color: 'rgba(var(--icon-primary))', }} /> },
                ].map((item) => (
                    <HkDashboardCards
                        key={item?.name}
                        count={item?.code}
                        data={[]} // You might want to pass actual data here later
                        name={item?.name}
                        icon={item?.icon}
                    />
                ))}
                <HouseKeeping
                    groupedBeds={groupedBeds}
                    HandleBedAssign={HandleBedAssign}
                    refetch={refetch}
                    FetchAllBlockedBed={FetchAllBlockedBed}
                />
            </Box>
        </Box>
    );
};

export default memo(HkDashboard);
