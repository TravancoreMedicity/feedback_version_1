// @ts-nocheck
import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import CustomInputWithLabel from '../Components/CustomInputWithLabel'
import { warningNofity, succesNofity, errorNofity, employeeID, infoNofity } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import { axiosApi } from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getAllComplaintDetail, getallroomassetDetail } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";

// import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'
// import CommonMenuList from '../Components/CommonMenuList'
// import SelectAssetDepartment from '../Components/SelectAssetDepartment'
// import SelectRoomDetailMaster from '../Components/SelectRoomDetailMaster'
// import SelectAssetItemMaster from '../Components/SelectAssetItemMaster'
// import CustomeCheckBox from '../Components/CustomeCheckBox'


const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));
const CommonMenuList = lazy(() => import('../Components/CommonMenuList'));
const SelectAssetDepartment = lazy(() => import('../Components/SelectAssetDepartment'));
const SelectRoomDetailMaster = lazy(() => import('../Components/SelectRoomDetailMaster'));
const SelectAssetItemMaster = lazy(() => import('../Components/SelectAssetItemMaster'));
const CustomeCheckBox = lazy(() => import('../Components/CustomeCheckBox'));
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const AssetMapMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [assetDetail, setAssetDetail] = useState({
        asset_count: '',
        dep_id: 0,
        room_id: 0,
        asset_id: 0,
        ismorethan: "N",
        status: false
    });

    const { asset_count, dep_id, status, room_id, asset_id, ismorethan } = assetDetail;
    const handleChange = (e) => {
        setAssetDetail({ ...assetDetail, [e.target.name]: e.target.value })
    }

    const { data: allroomassetdetail, refetch: fetchallroomassetdetail } = useQuery({
        queryKey: ['getallroomassetdetail'],
        queryFn: () => getallroomassetDetail(),
    })

    const { data: complaintDepartments } = useQuery({
        queryKey: ["complaintdetail"],
        queryFn: () => getAllComplaintDetail(),
        staleTime: Infinity
    });


    const DeparmentSection = useMemo(() => complaintDepartments?.filter(item => item?.complaint_dept_slno === dep_id), [dep_id, complaintDepartments])


    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setAssetDetail({
                asset_count: rowData.fb_asset_count,
                dep_id: rowData.fb_complaint_dep,
                room_id: rowData.fb_rc_roomslno,
                asset_id: rowData.fb_asset_id,
                ismorethan: rowData.fb_ismultiple === 1 ? "Y" : "N",
                status: rowData.fb_asset_map_status,
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {

        if (room_id === "") return warningNofity("Please enter the Asset Name");
        if (dep_id === "") return warningNofity("Please select the Deparment");
        if (asset_id === "") return warningNofity("Please select the Deparment");
        if (ismorethan === "Y" && asset_count === '') return warningNofity("Please enter the Count")

        const insertData = {
            fb_rc_roomslno: room_id,
            fb_dep_id: DeparmentSection?.[0]?.department_slno,
            fb_complaint_dep: dep_id,
            fb_asset_id: asset_id,
            fb_ismultiple: ismorethan === "Y" ? 1 : 0,
            fb_asset_count: ismorethan === "Y" ? Number(asset_count) : 1,
            fb_asset_map_status: status ? 1 : 0,
            create_user: Number(employeeID())
        }
        const UpdateinsertingData = {
            fb_assets_map_slno: updationdetail.fb_assets_map_slno,
            fb_rc_roomslno: room_id,
            fb_dep_id: DeparmentSection?.[0]?.department_slno,
            fb_complaint_dep: dep_id,
            fb_asset_id: asset_id,
            fb_ismultiple: ismorethan === "Y" ? 1 : 0,
            fb_asset_count: ismorethan === "Y" ? Number(asset_count) : 1,
            fb_asset_map_status: status ? 1 : 0,
            edit_user: Number(employeeID())
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertroomassetdetail", insertData);
                const { success } = result.data;
                if (success === 1) return infoNofity("Asset Already Mapped")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallroomassetdetail()
                succesNofity("Successfully Inserted Data..!")
                setAssetDetail({ asset_count: asset_count, dep_id: dep_id, room_id: room_id, asset_id: 0, ismorethan: "N", status: false })
            } catch (error) {
                warningNofity(error)
                setAssetDetail({ asset_count: asset_count, dep_id: dep_id, room_id: room_id, asset_id: 0, ismorethan: "N", status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updateroomassetdetail", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallroomassetdetail()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setAssetDetail({ asset_count: asset_count, dep_id: dep_id, room_id: room_id, asset_id: 0, ismorethan: "N", status: false })
            } catch (error) {
                warningNofity(error)
                setAssetDetail({ asset_count: asset_count, dep_id: dep_id, room_id: room_id, asset_id: 0, ismorethan: "N", status: false })
            }
        }

    }, [asset_count, fetchallroomassetdetail, status, updateflag, updationdetail, dep_id, DeparmentSection, asset_id, room_id, ismorethan])

    return (
        <DefaultPageLayout label="Asset Item Master" >
            <MasterPageLayout>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <SelectRoomDetailMaster
                        label={'Select the Room'}
                        value={room_id}
                        handleChange={(e, val) => handleChange({ target: { name: 'room_id', value: val } })} />
                </Suspense>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <SelectAssetDepartment
                        label={'Select the Department'}
                        value={dep_id}
                        handleChange={(e, val) => handleChange({ target: { name: 'dep_id', value: val } })} />
                </Suspense>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <SelectAssetItemMaster
                        label={'Select the Asset'}
                        value={asset_id}
                        id={dep_id}
                        handleChange={(e, val) => handleChange({ target: { name: 'asset_id', value: val } })} />
                </Suspense>
                <Box className="flex flex-row gap-2 mt-2" >
                    <CustomeCheckBox
                        values={ismorethan === "N" ? false : true}
                        color={'danger'}
                        lable={'more than one'}
                        handleChangeChecked={(e) => handleChange({
                            target: { name: 'ismorethan', value: e.target.checked ? "Y" : "N" }
                        })}
                    />
                </Box>
                {
                    ismorethan === "Y" && <CustomInputWithLabel
                        values={asset_count}
                        handleInputChange={(e) => handleChange({ target: { name: 'asset_count', value: e.target.value } })}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Asset Count'
                        type="text"
                    />
                }

                <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                    <CustomCheckBoxWithLabel
                        label="Status"
                        checkBoxValue={status}
                        handleCheckBoxValue={(e) => handleChange({ target: { name: "status", value: e.target.checked } })}
                    />
                </Box>
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitUserManagment}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Room Name', 'Department Name', 'Asset Name ', 'Multiple', 'Count', 'Status', 'Action']} >
                    {
                        allroomassetdetail?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_assets_map_slno}</td>
                                <td>{item.complaint_dept_name?.toUpperCase()}</td>
                                <td>{item.rm_room_name?.toUpperCase()}</td>
                                <td>{item.fb_asset_name?.toUpperCase()}</td>
                                <td>{item.fb_ismultiple === 1 ? "YES" : "NO"}</td>
                                <td>{item.fb_asset_count}</td>
                                <td>{item.fb_asset_map_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(AssetMapMaster)

