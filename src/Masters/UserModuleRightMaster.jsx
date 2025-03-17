// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import CommonMenuList from '../Components/CommonMenuList'
import {axiosApi} from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getalluserModuleRight } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
import SelectModuleMaster from '../Components/SelectModuleMaster'
import SelectUserGroupMaster from '../Components/SelectUserGroupMaster'
// import { getDocTypeMasterList } from '../api/docTypeMasterApi'


const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const UserModuleRightMaster = () => {


    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [rightsitem, setRightsItems] = useState({
        usrgrpid: 0,
        moduleid: 0,
        status: false
    });

    const { data: allusermoduleright, refetch: fetchallusermoduleright } = useQuery({
        queryKey: ['allmodulerights'],
        queryFn: () => getalluserModuleRight(),
    });

    const { usrgrpid, moduleid, status } = rightsitem;
    const handleChange = (e) => {
        setRightsItems({ ...rightsitem, [e.target.name]: e.target.value })
    };

    const handleSubmitUserManagment = useCallback(async () => {
        if (usrgrpid === 0) return warningNofity("Select the User Group");
        if (moduleid === 0) return warningNofity("Select the Module Nam");
        const insert_data = {
            groupid: usrgrpid,
            moduleid: moduleid,
            status: status,
            create_user: employeeID()
        }
        const update_data = {
            fb_usr_mod_slno: updationdetail.fb_usr_mod_slno,
            groupid: usrgrpid,
            moduleid: moduleid,
            status: status,
            edit_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertusermodulemaster", insert_data);
                const { success } = result.data;
                if (success === 3) return warningNofity("Item Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("Inserted SuccessFully..!")
                fetchallusermoduleright()
                setRightsItems({ usrgrpid: 0, moduleid: 0, status: false })
            } catch (error) {
                setRightsItems({ usrgrpid: 0, moduleid: 0, status: false })
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updateusermodulemaster", update_data);
                const { success } = result.data;
                if (success === 3) return warningNofity("Item Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("Updated SuccessFully..!")
                fetchallusermoduleright()
                setRightsItems({ usrgrpid: 0, moduleid: 0, status: false })
                setUpdateFlag(0)
            } catch (error) {
                setRightsItems({ usrgrpid: 0, moduleid: 0, status: false })
                warningNofity(error)
            }
        }
    }, [fetchallusermoduleright, usrgrpid, moduleid, status, updateflag, updationdetail])


    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setRightsItems({
                usrgrpid: rowData.fb_usrgrp_slno,
                moduleid: rowData.fb_module_slno,
                status: rowData.fb_usr_module_status === 1 ? true : false
            })
        },
        []
    );

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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Group Name', 'Module Name', 'Status', 'Action']} >
                    {
                        allusermoduleright?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.slno}</td>
                                <td>{item.fb_module_name?.toUpperCase()}</td>
                                <td>{item.fb_usrgrp_name?.toUpperCase()}</td>
                                <td>{item.fb_usr_module_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
        </DefaultPageLayout >
    )
}
export default memo(UserModuleRightMaster) 