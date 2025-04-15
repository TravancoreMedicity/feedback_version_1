// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import CommonMenuList from '../Components/CommonMenuList'
import { axiosApi } from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getallNewRoomCreationDetail } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";


// import { getDocTypeMasterList } from '.. /api/docTypeMasterApi'
// import SelectBedMaster from '../Components/SelectBedMaster'
// import SelectRoomMaster from '../Components/SelectRoomMaster'
// import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'

const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));
const SelectRoomMaster = lazy(() => import('../Components/SelectRoomMaster'));
const SelectBedMaster = lazy(() => import('../Components/SelectBedMaster'));
const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));

const RoomMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [roomdeatil, setRoomDetail] = useState({
        roomnumber: 0,
        bednumber: 0,
        status: false
    })

    const { roomnumber, bednumber, status } = roomdeatil;

    const handleChange = useCallback((e) => {
        setRoomDetail({ ...roomdeatil, [e.target.name]: e.target.value })
    },[roomdeatil])

    const { data: getallnewroomdetail, refetch: fetchallroomdetail } = useQuery({
        queryKey: ['getnewroomdetail'],
        queryFn: () => getallNewRoomCreationDetail(),
    });

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setRoomDetail({
                roomnumber: rowData.fb_rm_room_slno,
                bednumber: rowData.fb_rm_bd_code,
                status: rowData.fb_nw_room_status
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {

        if (roomnumber === 0) return warningNofity("Select the Room");
        if (bednumber === 0) return warningNofity("Enter the Bed");

        const insertData = {
            fb_rm_room_slno: roomnumber,
            fb_rm_bd_code: bednumber,
            fb_nw_room_status: status,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            fb_nw_room_slno: updationdetail.fb_nw_room_slno,
            fb_rm_room_slno: roomnumber,
            fb_rm_bd_code: bednumber,
            fb_nw_room_status: status,
            edit_user: employeeID()
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertroommaster", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Room Already Exist!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallroomdetail()
                succesNofity("Successfully Inserted Data..!")
                setRoomDetail({ roomnumber: 0, bednumber: 0, status: false })
            } catch (error) {
                setRoomDetail({ roomnumber: 0, bednumber: 0, status: false })
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updateroommaster", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallroomdetail()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setRoomDetail({ roomnumber: 0, bednumber: 0, status: false })
            } catch (error) {
                warningNofity(error)
                setRoomDetail({ roomnumber: 0, bednumber: 0, status: false })
            }
        }
    }, [fetchallroomdetail, roomnumber, bednumber, status, updationdetail, updateflag]);


    return (
        <DefaultPageLayout label="Room Master" >
            <MasterPageLayout>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <SelectRoomMaster
                        label={'Select the Room '}
                        value={roomnumber}
                        handleChange={(e, val) => handleChange({ target: { name: 'roomnumber', value: val } })} />
                </Suspense>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <SelectBedMaster
                        label={'Select the Bed'}
                        value={bednumber}
                        handleChange={(e, val) => handleChange({ target: { name: 'bednumber', value: val } })} />
                </Suspense>
                <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                    <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                        <CustomCheckBoxWithLabel
                            label="Status"
                            checkBoxValue={status}
                            handleCheckBoxValue={(e) => handleChange({ target: { name: "status", value: e.target.checked } })}
                        />
                    </Suspense>
                </Box>
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitUserManagment}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'RoomNumber', 'BedNumber', 'Room Status', 'Action']} >
                    {
                        getallnewroomdetail?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.slno}</td>
                                <td>{item.rm_room_name?.toUpperCase()}</td>
                                <td>{item.fb_bdc_no?.toUpperCase()}</td>
                                <td>{item.fb_nw_room_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
                                <td><Tooltip title="Edit Data" placement="top">
                                    <IconButton
                                        variant="outlined"
                                        size="sm"
                                        onClick={() => HanldeUpdation(item)}
                                        sx={{
                                            ":hover": {
                                                backgroundColor: "transparent",
                                                border: "0.03px solid rgba(var(--color-pink))",
                                            },
                                        }}
                                    >
                                        <EditPencil
                                            height={18}
                                            width={18}
                                            color="rgba(var(--icon-primary))"
                                            cursor={"pointer"}
                                        />
                                    </IconButton>
                                </Tooltip></td>
                            </tr>
                        ))
                    }
                </FeedbackCategoryMasterList>
            </Suspense>
        </DefaultPageLayout>
    )
}
export default memo(RoomMaster) 