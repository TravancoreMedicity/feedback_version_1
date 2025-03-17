// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import CustomInputWithLabel from '../Components/CustomInputWithLabel'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import CommonMenuList from '../Components/CommonMenuList'
import {axiosApi} from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import {  getallmenumaster } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
import SelectModuleMaster from '../Components/SelectModuleMaster'
// import { getDocTypeMasterList } from '../api/docTypeMasterApi'

const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const MenuMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [menuitems, setMenuItems] = useState({
        moudleid: 0,
        menu_name: "",
        status: false
    })

    const { moudleid, menu_name, status } = menuitems;

    const handleChange = (e) => {
        setMenuItems({ ...menuitems, [e.target.name]: e.target.value })
    }

    const { data: getallmenuitems, refetch: fetchallmenumaster } = useQuery({
        queryKey: ['getallmenumaster'],
        queryFn: () => getallmenumaster(),
    })

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setMenuItems({
                moudleid: rowData.fb_module_slno,
                menu_name: rowData.fb_menu_name,
                status: rowData.fb_menu_status
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {

        if (moudleid === 0) return warningNofity("Select the Module Name");
        if (menu_name === "") return warningNofity("Enter the Menu name");

        const insertData = {
            menuname: menu_name,
            moduleid: moudleid,
            status: status,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            menuslno: updationdetail.fb_menu_slno,
            menuname: menu_name,
            moduleid: moudleid,
            status: status,
            edit_user: employeeID()
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertmenumaster", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Feedback Already Occured!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallmenumaster()
                succesNofity("Successfully Inserted Data..!")
                setMenuItems({ moudleid: 0, menu_name: "", status: false })
            } catch (error) {
                setMenuItems({ moudleid: 0, menu_name: "", status: false })
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatemenumaster", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallmenumaster()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setMenuItems({ moudleid: 0, menu_name: "", status: false })
            } catch (error) {
                warningNofity(error)
                setMenuItems({ moudleid: 0, menu_name: "", status: false })
            }
        }
    }, [fetchallmenumaster, moudleid, menu_name, status, updationdetail,updateflag])

    return (
        <DefaultPageLayout label="Feedback SubCategory Master" >
            <MasterPageLayout>
                <SelectModuleMaster
                    label={'Select the Module'}
                    value={moudleid}
                    handleChange={(e, val) => handleChange({ target: { name: 'moudleid', value: val } })} />
                <CustomInputWithLabel
                    values={menu_name}
                    handleInputChange={(e) => handleChange({ target: { name: 'menu_name', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Menu Name'
                    type="text"
                />
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Module Name', 'Menu Name', 'Menu Status', 'Action']} >
                    {
                        getallmenuitems?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_menu_slno}</td>
                                <td>{item.fb_module_name?.toUpperCase()}</td>
                                <td>{item.fb_menu_name?.toUpperCase()}</td>
                                <td>{item.fb_menu_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(MenuMaster) 