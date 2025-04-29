// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import { axiosApi } from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getassetItemMaster } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";





const CommonMenuList = lazy(() => import('../Components/CommonMenuList'));
const CustomInputWithLabel = lazy(() => import('../Components/CustomInputWithLabel'));
const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));
const SelectAssetDepartment = lazy(() => import('../Components/SelectAssetDepartment'));

const AssetIemMaster = () => {


    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [assetDetail, setAssetDetail] = useState({
        asset_name: '',
        dep_id: 0,
        status: false
    });


    const { asset_name, dep_id, status } = assetDetail;
    const handleChange = (e) => {
        setAssetDetail({ ...assetDetail, [e.target.name]: e.target.value })
    }

    const { data: allassetitems, refetch: fetchallassetItems } = useQuery({
        queryKey: ['getallitemmaster'],
        queryFn: () => getassetItemMaster(),
    })

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setAssetDetail({
                asset_name: rowData.fb_asset_name,
                dep_id: rowData.fb_dep_id,
                status: rowData.fb_asset_status
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {
        if (asset_name === "") return warningNofity("Please enter the Asset Name");
        if (dep_id === "") return warningNofity("Please select the Deparment");
        const insertData = {
            fb_asset_name: asset_name?.toLowerCase(),
            fb_dep_id: dep_id,
            fb_asset_status: status ? 1 : 0,
            create_user: Number(employeeID())
        }
        const UpdateinsertingData = {
            fb_assets_slno: updationdetail.fb_asset_slno,
            fb_asset_name: asset_name?.toLowerCase(),
            fb_dep_id: dep_id,
            fb_asset_status: status,
            edit_user: Number(employeeID())
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertassetitem", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Module Already Exists!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallassetItems()
                succesNofity("Successfully Inserted Data..!")
                setAssetDetail({ asset_name: '', dep_id: 0, status: false })
            } catch (error) {
                warningNofity(error)
                setAssetDetail({ asset_name: '', dep_id: 0, status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updateassetitem", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallassetItems()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setAssetDetail({ asset_name: '', dep_id: 0, status: false })
            } catch (error) {
                warningNofity(error)
                setAssetDetail({ asset_name: '', dep_id: 0, status: false })
            }
        }

    }, [asset_name, fetchallassetItems, status, updateflag, updationdetail, dep_id])

    return (
        <DefaultPageLayout label="Asset Item Master" >
            <MasterPageLayout>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <SelectAssetDepartment
                        label={'Select the Department'}
                        value={dep_id}
                        handleChange={(e, val) => handleChange({ target: { name: 'dep_id', value: val } })} />
                </Suspense>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <CustomInputWithLabel
                        values={asset_name}
                        handleInputChange={(e) => handleChange({ target: { name: 'asset_name', value: e.target.value } })}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Asset Name'
                        type="text"
                    />
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
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <CommonMenuList
                        handleSubmitButtonFun={handleSubmitUserManagment}
                        handleViewButtonFun={() => { }}
                    />
                </Suspense>
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Deparment Name', 'Asset Name', 'Module Status', 'Action']} >
                    {
                        allassetitems?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_asset_slno}</td>
                                <td>{item.complaint_dept_name?.toUpperCase()}</td>
                                <td>{item.fb_asset_name?.toUpperCase()}</td>
                                <td>{item.fb_asset_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(AssetIemMaster)

