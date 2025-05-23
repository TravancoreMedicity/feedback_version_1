import React, { lazy, memo, Suspense, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { useQuery } from '@tanstack/react-query';
import { getDischargeEntryBed, getProcheckedbedDetail } from '../../Function/CommonFunction';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';

const ProBedlist = lazy(() => import('./ProBedlist'));
const ChecklistHeaders = lazy(() => import('../../Components/ChecklistHeaders'));

const Prochecklist = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: getdischargeentrybed } = useQuery({
        queryKey: ['getdischargebed'],
        queryFn: () => getDischargeEntryBed(),
    });

    const UniqueDischargeBed = useMemo(() => {
        return getdischargeentrybed?.filter(
            (item, index, self) =>
                index === self?.findIndex(t => t?.fb_bed_slno === item?.fb_bed_slno)
        );
    }, [getdischargeentrybed]);

    const { data: getproCheckBed, refetch: fetchProcheckdetail } = useQuery({
        queryKey: ['getprocheckbed'],
        queryFn: () => getProcheckedbedDetail(),
    })

    const FilteredBeds = useMemo(() => {
        if (!searchQuery) return UniqueDischargeBed;
        return UniqueDischargeBed?.filter(bed => bed?.fb_bdc_no?.includes(searchQuery)
        );
    }, [searchQuery, UniqueDischargeBed]);



    return (
        <Box sx={{ minHeight: '100vh', width: '100%' }}>
            <Box
                className="flex flex-col rounded-xl p-1 w-full"
                sx={{
                    width: '100%',
                    backgroundColor: "rgba(var(--bg-card))",
                    height: "calc(100% - 50px)",
                    cursor: 'pointer',
                    minHeight: '90vh'
                }}>
                <Box sx={{
                    mb: 2,
                    p: 1,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    borderRadius: 5,
                    width: '100%',
                }}>
                    <ChecklistHeaders
                        icon={<BookTwoToneIcon sx={{
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: { xs: 22, sm: 28 },
                            fontWeight: 700,
                            mt: 2
                        }} />}
                        setValue={setSearchQuery}
                        searchvalue={searchQuery}
                        value={2}
                        name={'PRO CHECKLIST'}
                    />
                    <Box
                        sx={{
                            gap: 3,
                            px: 1,
                            width: "100%",
                            mt: 1,
                        }}>
                        {
                            FilteredBeds?.map((item, index) => {
                                const matchdata = getproCheckBed?.find((bed) => bed?.fb_bdc_no === item?.fb_bdc_no)
                                return <Box key={index} >
                                    <Suspense fallback={<CustomBackDropWithOutState message={'loading...!'} />}>
                                        <ProBedlist
                                            fetchProcheckdetail={fetchProcheckdetail}
                                            matchdata={matchdata}
                                            data={item}
                                        />
                                    </Suspense>
                                </Box>
                            })}
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default memo(Prochecklist)