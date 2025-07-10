import React, { memo, useCallback, useMemo, useState } from 'react'
import BedListModal from './BedListModal';
import { Box, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import InitialCheckComplited from '../../Components/InitialCheckComplited';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import { getAllComplaintDetail, getallRoomAssetData, getBedRemarkDetails } from '../../Function/CommonFunction';


const BedList = ({ data, name, icon, matchdata, getallremarkrefetch, getallBlokedbedRefetch }) => {


    const [open, setOpen] = useState(false)
    const [condition, setCondtion] = useState({})
    const [isinitalchecked, setIsInitialChecked] = useState(false)
    const [totaldetail, setTotalDetail] = useState({
        ovarallconditon: null,
        activeButton: null,
        remarks: "",
        overallremarks: ""
    });


    // Fetcing  the Room asset detail
    const { data: getroomassetData } = useQuery({
        queryKey: ["roomassetdata", data?.fb_rm_room_slno],
        queryFn: () => getallRoomAssetData(data?.fb_rm_room_slno),
        enabled: !!open,
        staleTime: Infinity
    });

    // Grouping the fetched asset to theri corresponding dapartments
    const groupedByDepid = getroomassetData?.reduce((acc, item) => {
        acc[item?.fb_complaint_dep] = [...(acc[item?.fb_complaint_dep] || []), item];
        return acc;
    }, {});


    // fetching the complaintt department
    const { data: complaintDep } = useQuery({
        queryKey: ["complaintdetail"],
        queryFn: () => getAllComplaintDetail(),
        enabled: !!open,
        staleTime: Infinity
    });



    //Combining Asset with their Corresponding Department
    const combinedData = useMemo(() => {
        if (!complaintDep || !groupedByDepid) {
            return [];
        }
        return complaintDep?.map(department => {
            const departmentSlno = department?.complaint_dept_slno;
            const matchingAssets = groupedByDepid[departmentSlno] || [];
            return {
                ...department,
                assets: matchingAssets,
            };
        })?.filter(department => department?.assets?.length > 0)
    }, [complaintDep, groupedByDepid]);



    //FETCHING BEDREMARKS TO DYNAMICALLY UPDATEIJNG CHECKLIST
    const { data: bedremarks, refetch: getbedremarkRefetch } = useQuery({
        queryKey: ['fetchbedremarkdetail', data?.fb_bed_slno],
        queryFn: () => getBedRemarkDetails(data?.fb_bed_slno),
        enabled: !!open,
    });



    //dynamic state updations
    const handleSetCondition = useCallback(async () => {
        // fetchBedComplaints()
        const { data } = await getbedremarkRefetch();
        if (!data) return;
        const transformedData = data?.reduce((acc, item) => {
            acc[item?.fb_asset_name] = item?.fb_asset_status;
            return acc;
        }, {});

        setTotalDetail((prev) => ({
            ...prev,
            ovarallconditon: data?.[0]?.fb_overall_condition || null,
            activeButton:
                data?.[0]?.fb_bed_service_status === 1 ? "OnHold" :
                    data?.[0]?.fb_bed_service_status === 2 ? "Renovation" : null,
            remarks: data?.[0]?.fb_bed_remark || "",
            overallremarks: data?.[0]?.fb_overall_remarks || "",
        }));
        setIsInitialChecked(data?.[0]?.fb_initail_checked === 'Y' ? true : false)
        setCondtion(transformedData);
    }, [getbedremarkRefetch, setTotalDetail]);


    //modal open and close
    const HandleCheckList = useCallback(async (val) => {
        await handleSetCondition()
        setOpen(true)
    }, [setOpen, handleSetCondition])


    const handleChecklistClick = useCallback(() => {
        HandleCheckList(data?.fb_bdc_no)
    }, [HandleCheckList, data?.fb_bdc_no])

    return (
        <>
            {open && (
                <BedListModal
                    getallremarkrefetch={getallremarkrefetch}
                    getallBlokedbedRefetch={getallBlokedbedRefetch}
                    icon={icon}
                    name={name}
                    open={open}
                    setOpen={setOpen}
                    complaintdepartment={complaintDep}
                    combinedata={combinedData}
                    assetData={getroomassetData}
                    data={data}
                    condition={condition}
                    setCondtion={setCondtion}
                    setTotalDetail={setTotalDetail}
                    totaldetail={totaldetail}
                    beddetails={bedremarks}
                    isinitalchecked={isinitalchecked}
                    setIsInitialChecked={setIsInitialChecked}
                    getbedremarkRefetch={getbedremarkRefetch}
                />
            )}

            <Box
                sx={{
                    backgroundColor: 'rgba(var(--bg-card))',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    my: 2,
                    position: 'relative'
                }}>
                <div style={{
                    height: { xs: 80, sm: 120 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    backgroundColor: 'rgba(var(--bg-common))',
                    borderWidth: 1.5,
                    borderRadius: 5,
                    paddingRight: '10px',
                    borderColor: 'rgba(var(--border-primary))',
                }}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: "column",
                            fontSize: { xs: 10, sm: 14 },
                            lineHeight: 1,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                            bgcolor: matchdata?.fb_bed_service_status === 2 ? "#da344d"
                                : matchdata?.fb_bed_service_status === 1 ? '#ff4d6d' : "#ef3c2d",
                            px: 1.5,
                            py: 0.4,
                            fontFamily: 'var(--font-varient)',
                            color: 'White',
                            fontWeight: 900,
                            height: { xs: 80, sm: 120 },
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            mr: 1
                        }}>
                            {data?.fb_bdc_no && data?.fb_bdc_no?.split('')?.map((char, index) => (
                                <Box key={index} sx={{ p: 0, m: 0, lineHeight: 1 }}>
                                    {char}
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{
                            width: { xs: 80, sm: 150 },
                            borderRadius: 5
                        }}>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 14 },
                                    fontWeight: 900,
                                    textAlign: 'center',
                                    mt: 1
                                }} >
                                {data?.fb_bdc_no}
                            </Typography>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 14 },

                                    fontWeight: 900,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_rtc_desc}
                            </Typography>
                            <Typography level='body-sm' fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: { xs: 9, sm: 14 },

                                    fontWeight: 600,
                                    textAlign: 'center',
                                }} >
                                {data?.fb_ns_name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>{
                            matchdata?.fb_bed_service_status === 2 ?
                                <HandymanTwoToneIcon sx={{
                                    width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 },
                                    color: "#ff4d6d",
                                }}
                                /> : matchdata?.fb_bed_service_status === 1 ? <PauseCircleFilledTwoToneIcon sx={{
                                    width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 },
                                    color: "#ff4d6d",

                                }} /> : <CampaignTwoToneIcon
                                    sx={{
                                        width: { xs: 20, sm: 30 }, height: { xs: 20, sm: 30 },
                                        color: "#ef3c2d",
                                    }}
                                />
                        }
                        <Typography sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 700,
                            fontSize: { xs: 9, sm: 14 },
                        }}>
                            {matchdata && matchdata !== undefined ? (matchdata?.fb_bed_service_status === 2 ? "RENOVATION" : matchdata?.fb_bed_service_status === 1 ? 'ONHOLD' : "NOT READY") : data?.fb_bdc_occup === "N" ? "NOT READY" : ""}
                        </Typography>
                        {
                            matchdata?.fb_initail_checked === "Y" &&
                            <InitialCheckComplited
                                color={
                                    matchdata?.fb_bed_service_status === 2 ?
                                        "#c42348" : matchdata?.fb_bed_service_status === 1 ?
                                            '#ff4d6d' : "#ef3c2d"
                                } />
                        }
                    </Box>
                    <Box
                        onClick={handleChecklistClick}
                        sx={{
                            width: { xs: 90, sm: 130 },
                            height: { xs: 30, sm: 40 },
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(var(--bg-common))',
                            fontFamily: 'var(--font-varient)',
                            borderWidth: 1,
                            borderColor: matchdata?.fb_bed_service_status === 2 ? "#c42348" : matchdata?.fb_bed_service_status === 1 ? '#ff4d6d' : "#ef3c2d",
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: { xs: 10, sm: 14 },
                            ':hover': {
                                transition: 'none',
                                backgroundColor: 'rgba(var(--input-hover-bg-color))',
                                borderColor: 'rgba(var(--input-hover-border-color))',
                                color: 'rgba(var(--input-hover-font-color))',
                                '.iconColor': {
                                    color: 'rgba(var(--icon-green))',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'rgba(var(--icon-green))',
                                }
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'rgba(var(--icon-primary))',
                            },
                        }}>
                        Check List
                    </Box>
                </div>
            </Box >
        </>
    )
}

export default memo(BedList)
