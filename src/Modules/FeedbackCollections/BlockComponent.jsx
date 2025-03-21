import { Box, Typography } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { axiosApi, axiosellider } from '../../Axios/Axios';
import { errorNofity, warningNofity } from '../../Constant/Constant';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';

const BlockComponent = ({
    stationname,
    ispresent,
    code,
    setBedDetail,
    setView,
    setNsName,
    setNsCode,
    setLoading,
    loading
}) => {

    const InsertPatientDetailMeliora = useCallback(async (data) => {
        const insertData = {
            ptdetail: data
        };
        try {
            setLoading(true)
            const response = await axiosApi.post("/feedback/insertptdetailmlora", insertData);
            const { success, message } = response.data;
            if (success !== 2) return warningNofity("Error in inserting Patinet Details");
            setLoading(false)
        } catch (error) {
            setLoading(false)
            warningNofity("Error in inserting Patinet infromation");
        }
    }, []);


    const GetallPatientDetail = useCallback(async () => {
        try {
            // setAllPatientDetail([]);
            setLoading(true)
            const response = await axiosellider.post('/melioraEllider/ip', {
                NS_CODE: code,
            })
            const { success, data } = response.data;
            if (success === 0) return errorNofity("Error in fetching Data");
            // setAllPatientDetail(data ? data : [])
            await InsertPatientDetailMeliora(data ? data : [])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            warningNofity("Error in Fetching Data...?")
        }
    }, [code])

    const InsertBedDetailMeliora = useCallback(async (data) => {
        const insertData = {
            bedinfo: data
        };
        try {
            setLoading(true)
            const response = await axiosApi.post("/feedback/insertbddetail", insertData);
            const { success } = response.data;
            if (success !== 2) return warningNofity("Error in inserting Bed Details");
            setLoading(false)
        } catch (error) {
            warningNofity("Error in inserting Bed infromation");
            setLoading(false)
        }
    }, [])

    const HandleBedFetchFromMeliora = useCallback(async () => {
        const insertData = {
            NS_CODE: code
        }
        try {
            setLoading(true)
            const response = await axiosApi.post('/feedback/getbed', insertData)
            const { success, data } = response.data;
            if (success === 1) return warningNofity("No Bed Available")
            if (success !== 2) return warningNofity("Error in fetching In Paient Detail :)")
            setBedDetail(data ? data : {})
            setView(1)
            setLoading(false)
        } catch (error) {
            console.log(error);
            warningNofity("Error in Api")
            setView(0)
            setLoading(false)
        }
    }, []);

    const HandlebedFetching = useCallback(async (code) => {
        GetallPatientDetail()//fetching all inpatient detail in the Nursing Station
        const insertData = {
            NS_CODE: code
        }
        try {
            setLoading(true)
            const response = await axiosellider.post('/melioraEllider/getbed', insertData)
            const { success, data } = response.data;
            if (success === 1) return warningNofity("No Bed Available")
            if (success !== 2) return warningNofity("Error in fetching In Paient Detail :)")
            await InsertBedDetailMeliora(data ? data : [])
            await HandleBedFetchFromMeliora()
            setNsName(stationname)
            setNsCode(code)
            setLoading(false)
        } catch (error) {
            warningNofity("Error in Api")
            setView(0)
            setLoading(false)
        }
    }, [setBedDetail, setNsName, setNsCode, setView, stationname]);




    return (
        <Box
            onClick={() => HandlebedFetching(code)}
            sx={{
                width: 190,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,

            }}>
            {loading ? <CustomBackDropWithOutState message={"Loading..."} /> : null}
            <Box
                sx={{
                    width: '100%',
                    height: 90,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    display: 'flex',
                    borderRadius: 8,
                    p: 2,
                    "&:hover": {
                        filter: ispresent === "N" ? `drop-shadow(0px 0px 15px rgba(252, 138, 191, 0.46))` : '',
                    },

                }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
                    {/* <HouseRooms style={{ fontSize: 18, color: 'rgba(var(--icon-primary))' }} /> */}
                    <FontAwesomeIcon icon={faUserNurse} style={{ fontSize: 26, color: 'rgba(var(--icon-primary))' }} />
                    <Typography level='body-sm' fontWeight={'md'}
                        sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: 11,
                            fontWeight: 900,
                            textAlign: 'center',
                            mt: 1
                        }} >
                        {stationname}
                    </Typography>
                </Box>

            </Box>
        </Box >
    )
}

export default memo(BlockComponent)