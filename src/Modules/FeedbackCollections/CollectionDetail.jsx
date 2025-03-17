import { Box, Grid, Typography } from '@mui/joy'
import React from 'react'
import BlockComponent from './BlockComponent'
import {
    ViewStructureDown
} from 'iconoir-react'
import ApartmentIcon from '@mui/icons-material/Apartment';

const CollectionDetail = ({
    setBedDetail,
    setView,
    getallnursestation,
    elidernursingstation,
    setNsName,
    setNsCode,
    setLoading,
    loading
}) => {


    const filteredData = elidernursingstation?.flatMap((item) =>
        getallnursestation
            ?.filter((val) => val.fb_ns_code === item.NS_CODE)
            .map((val) => ({
                ...val, // Keep all properties of the matched nursing station
                NSC_DESC: item.NSC_DESC, // Add NSC_DESC from elidernursingstation
            })) || []
    );
    const groupedData = filteredData?.reduce((acc, item) => {
        return {
            ...acc,
            [item.rm_floor_alias]: {
                ...(acc[item.rm_floor_alias] || {}),
                [item.rm_floor_name]: [...(acc[item.rm_floor_alias]?.[item.rm_floor_name] || []), item]
            }
        };
    }, {});



    return (

        <Box
            className="flex flex-col rounded-xl p-1 w-full"
            sx={{
                backgroundColor: "rgba(var(--bg-card))",
                height: "calc(100% - 50px)",
                cursor: 'pointer'
            }}>
            {groupedData &&
                Object.entries(groupedData).map(([alias, floors]) => (
                    <Box key={alias} sx={{
                        bgcolor: 'red',
                        mb: 2,
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                        borderRadius: 5
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
                            <ApartmentIcon sx={{
                                color: 'rgba(var(--font-primary-white))',
                                fontSize: 28,
                                fontWeight: 700,
                                mt: 2
                                // marginTop: 10
                            }} />
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 22,
                                    fontWeight: 700,
                                    mt: 2
                                }}>
                                {alias === "QMT/HB/HB" ? "HOSPITAL BLOCK" : 'SERVICE BLOCK'}
                            </Typography>
                        </Box>
                        {Object.entries(floors).map(([floorName, rooms]) => (
                            <Box
                                key={floorName}
                                className="flex flex-col rounded-xl p-1 w-full"
                                sx={{
                                    backgroundColor: "rgba(var(--bg-card))",
                                    height: "calc(100% - 50px)",
                                    cursor: 'pointer',
                                    mt: 2
                                }}>
                                <Box className="flex flex-col m-0 rounded-xl p-1 pb-2 overflow-scroll w-full"
                                    sx={{ backgroundColor: 'rgba(var(--bg-card))', border: 1, borderColor: 'rgba(var(--border-primary))' }}>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', px: 2.5 }}>
                                        <Box sx={{ border: 0, borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))", borderBottomColor: 'divider', borderWidth: 2, display: 'flex', alignItems: 'center', width: '100%' }} >
                                            <ViewStructureDown style={{
                                                color: 'rgba(var(--font-primary-white))',
                                                fontSize: 14,
                                                fontWeight: 900,
                                                mt: 2,
                                                marginRight: 4
                                            }} />
                                            <Typography

                                                level='body-sm'
                                                fontWeight={'md'}
                                                sx={{
                                                    fontFamily: 'var(--font-varient)',
                                                    color: 'rgba(var(--font-primary-white))',
                                                    fontSize: 17,
                                                    fontWeight: 600,
                                                    my: 1
                                                }}>
                                                {floorName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            mt: 1,
                                        }}>
                                        <Grid container >
                                            {rooms.map((room, index) => (
                                                <Grid xs={5} sm={4} lg={3} xl={3} key={index}>
                                                    <BlockComponent
                                                        setNsName={setNsName}
                                                        stationname={room.NSC_DESC}
                                                        key={room.fb_nurse_stn_slno} // Unique key for each block
                                                        code={room.fb_ns_code}
                                                        setBedDetail={setBedDetail}
                                                        setView={setView}
                                                        setNsCode={setNsCode}
                                                        setLoading={setLoading}
                                                        loading={loading}
                                                    // setAllPatientDetail={setAllPatientDetail}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                        }
                    </Box >
                ))}
        </Box >
    );
}

export default CollectionDetail;
