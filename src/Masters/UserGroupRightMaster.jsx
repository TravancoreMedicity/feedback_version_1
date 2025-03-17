// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import CommonMenuList from '../Components/CommonMenuList'
import { axiosApi } from '../Axios/Axios'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { IconButton, Tooltip } from "@mui/joy";
import { PlusCircleSolid, PlusCircle } from "iconoir-react";
import SelectModuleMaster from '../Components/SelectModuleMaster'
import SelectUserGroupMaster from '../Components/SelectUserGroupMaster'



const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const UserGroupRightMaster = () => {

    const [menuitems, setMenuItems] = useState([])
    const [rightsitem, setRightsItems] = useState({
        usrgrpid: 0,
        moduleid: 0,
    });



    const { usrgrpid, moduleid } = rightsitem;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "usrgrpid") {
            setRightsItems({
                ...rightsitem,
                usrgrpid: value,
                moduleid: 0,
            });
            setMenuItems([]);
        }
        if (name === "usrgrpid" || name === "moduleid") {
            setMenuItems([]);
        }
        setRightsItems({ ...rightsitem, [e.target.name]: e.target.value })
    };

    const handleSubmitUserManagment = useCallback(async () => {
        if (usrgrpid === 0) return warningNofity("Select the User Group");
        if (moduleid === 0) return warningNofity("Select the Module Nam");
        const searchdata = {
            groupid: usrgrpid,
            moduleid: moduleid,
        }
        try {
            const result = await axiosApi.post("/feedback/getallmodulemenu", searchdata);
            const { success, data } = result.data;
            if (success === 3) return warningNofity("Item Already Exists")
            if (success !== 2) return errorNofity("Error in inserting Data!")
            setMenuItems(data ? data : [])
        } catch (error) {
            setRightsItems({ usrgrpid: 0, moduleid: 0 })
            warningNofity(error)
        }
    }, [setMenuItems, usrgrpid, moduleid])

    const HanldeUserInsetion = useCallback(async (rowData) => {
        console.log("inserting");
        const { fb_menu_slno } = rowData;
        if (fb_menu_slno === 0) return warningNofity("Error in Selecting Menu")
        const insert_data = {
            fb_usr_right_slno: rowData.fb_usr_right_slno,
            fb_usrgrp_slno: usrgrpid,
            fb_module_slno: moduleid,
            fb_menu_slno: fb_menu_slno,
            fb_menu_view: 1,
            create_user: employeeID()
        }
        try {
            const result = await axiosApi.post("/feedback/insertuserright", insert_data);
            const { success, message } = result.data;
            if (success !== 2) return errorNofity("Error in inserting Data!")
            succesNofity(message)
            handleSubmitUserManagment()
        } catch (error) {
            setRightsItems({ usrgrpid: 0, moduleid: 0 })
            warningNofity(error)
        }
    },
        [usrgrpid, moduleid, handleSubmitUserManagment]
    );

    const HandleUserUpdation = useCallback(async (rowData) => {
        console.log("updating");
        const updation_data = {
            fb_usr_right_slno: rowData.fb_usr_right_slno,
            fb_menu_view: 0,
            edit_user: employeeID()
        }
        try {
            const result = await axiosApi.post("/feedback/updateuserright", updation_data);
            const { success, message } = result.data;
            if (success !== 2) return errorNofity("Error in inserting Data!")
            succesNofity(message)
            handleSubmitUserManagment()
        } catch (error) {
            setRightsItems({ usrgrpid: 0, moduleid: 0 })
            warningNofity(error)
        }
    }, [handleSubmitUserManagment])

    return (
        <DefaultPageLayout label="User Group Rights Master" >
            <MasterPageLayout>
                <SelectUserGroupMaster
                    label={'Group Master'}
                    value={usrgrpid}
                    handleChange={(e, val) => handleChange({ target: { name: 'usrgrpid', value: val } })}
                />
                <SelectModuleMaster
                    label={'Select the Module'}
                    value={moduleid}
                    handleChange={(e, val) => handleChange({ target: { name: 'moduleid', value: val } })}
                />
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitUserManagment}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>
            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Menu Name', 'Action']} >
                    {
                        menuitems?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_menu_slno}</td>
                                <td>{item.fb_menu_name?.toUpperCase()}</td>
                                <td><Tooltip title={item.fb_menu_view === 1 && item.fb_menu_view !== null ? "Update" : "Add"} placement="top">
                                    <IconButton
                                        variant="outlined"
                                        size="sm"
                                        onClick={item?.fb_menu_view === 1 && item?.fb_menu_view !== null ? () => HandleUserUpdation(item) : () => HanldeUserInsetion(item)}
                                        sx={{
                                            ":hover": {
                                                backgroundColor: "transparent",
                                                border: "0.03px solid rgba(var(--color-pink))",
                                            },
                                        }}
                                    >
                                        {item?.fb_menu_view === 1 && item?.fb_menu_view !== null ?
                                            <PlusCircleSolid
                                                height={18}
                                                width={18}
                                                color="rgba(var(--icon-primary))"
                                                cursor={"pointer"}
                                            /> : <PlusCircle
                                                height={18}
                                                width={18}
                                                color="rgba(var(--icon-primary))"
                                                cursor={"pointer"}
                                            />}

                                    </IconButton>
                                </Tooltip></td>
                            </tr>
                        ))
                    }
                </FeedbackCategoryMasterList>
            </Suspense>
        </DefaultPageLayout >
    )
}
export default memo(UserGroupRightMaster) 