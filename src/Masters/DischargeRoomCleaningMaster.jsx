// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import { Box } from '@mui/joy'
import { axiosApi } from '../Axios/Axios'
import { EditPencil } from "iconoir-react";
import { IconButton, Tooltip } from "@mui/joy";
import { useQuery } from '@tanstack/react-query'
import MasterPageLayout from '../Components/MasterPageLayout'
import { getallhkroomitems } from '../Function/CommonFunction'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'


const CommonMenuList = lazy(() => import('../Components/CommonMenuList'));
const CustomInputWithLabel = lazy(() => import('../Components/CustomInputWithLabel'));
const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const DischargeRoomCleaningMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [itemdetail, setItemDetail] = useState({
        item_name: '',
        status: false
    });


    const { item_name, status } = itemdetail;
    const handleChange = (e) => {
        setItemDetail({ ...itemdetail, [e.target.name]: e.target.value })
    }

    const { data: getallhkchecklistItems, refetch: fetchallChecklitsItems } = useQuery({
        queryKey: ['hkroomchecklistitem'],
        queryFn: () => getallhkroomitems(),
    });

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setItemDetail({
                item_name: rowData.fb_hk_rm_cklist_name,
                status: rowData.fb_hk_rm_cklist_status
            })
        },
        []
    );

    const handleSubmitUserManagment = useCallback(async () => {
        if (item_name === "") return warningNofity("Please enter the Asset Name");
        const insertData = {
            fb_hk_item_name: item_name?.toUpperCase(),
            fb_hk_item_status: status ? 1 : 0,
            create_user: Number(employeeID())
        }
        const UpdateinsertingData = {
            fb_hk_item_slno: updationdetail.fb_hk_rm_cklist_slno,
            fb_hk_item_name: item_name?.toUpperCase(),
            fb_hk_item_status: status,
            edit_user: Number(employeeID())
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/inserthkitem", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Module Already Exists!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallChecklitsItems()
                succesNofity("Successfully Inserted Data..!")
                setItemDetail({ item_name: '', status: false })
            } catch (error) {
                warningNofity(error)
                setItemDetail({ item_name: '', status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatehkitem", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallChecklitsItems()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setItemDetail({ item_name: '', status: false })
            } catch (error) {
                warningNofity(error)
                setItemDetail({ item_name: '', status: false })
            }
        }

    }, [item_name, fetchallChecklitsItems, status, updateflag, updationdetail]);

    return (
        <DefaultPageLayout label="Discharge Room Cleaning Master" >
            <MasterPageLayout>
                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <CustomInputWithLabel
                        values={item_name}
                        handleInputChange={(e) => handleChange({ target: { name: 'item_name', value: e.target.value } })}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Checklist Name'
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Asset Name', 'Module Status', 'Action']} >
                    {
                        getallhkchecklistItems?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_hk_rm_cklist_slno}</td>
                                <td>{item.fb_hk_rm_cklist_name?.toUpperCase()}</td>
                                <td>{item.fb_hk_rm_cklist_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(DischargeRoomCleaningMaster)

