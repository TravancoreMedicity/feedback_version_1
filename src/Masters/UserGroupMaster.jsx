// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import CustomInputWithLabel from '../Components/CustomInputWithLabel'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import {axiosApi} from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getallGroupMaster } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
import CommonMenuList from '../Components/CommonMenuList'


const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const UserGroupMaster = () => {


    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [usergroup, setUserGroup] = useState({
        groupname: '',
        status: false
    })

    const { groupname, status } = usergroup;
    const handleChange = (e) => {
        setUserGroup({ ...usergroup, [e.target.name]: e.target.value })
    }
    const { data: allgroupmaster, refetch: fetchallgroupmaster } = useQuery({
        queryKey: ['getallgroupmast'],
        queryFn: () => getallGroupMaster(),
    })

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setUserGroup({
                groupname: rowData.fb_usrgrp_name,
                status: rowData.fb_usrgrp_status === 1 ? true : false
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {
        if (groupname === "") return warningNofity("Please enter the Group Name");
        const insertData = {
            fb_usrgrp_name: groupname,
            fb_usrgrp_status: !status ? 0 : 1,
            create_user: employeeID()
        }
        const UpdateinsertingData = {
            fb_usrgrp_slno: updationdetail.fb_usrgrp_slno,
            fb_usrgrp_name: groupname,
            fb_usrgrp_status: !status ? 0 : 1,
            edit_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertgroupmaster", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Group Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallgroupmaster()
                succesNofity("Successfully Inserted Data..!")
                setUserGroup({ groupname: '', status: false })
            } catch (error) {
                warningNofity(error)
                setUserGroup({ groupname: '', status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updategroupmaster", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallgroupmaster()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setUserGroup({ groupname: '', status: false })
            } catch (error) {
                warningNofity(error)
                setUserGroup({ groupname: '', status: false })
            }
        }

    }, [groupname, fetchallgroupmaster, status, updateflag, updationdetail])

    return (
        <DefaultPageLayout label="User Group Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    values={groupname}
                    handleInputChange={(e) => handleChange({ target: { name: 'groupname', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Group Name'
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Categroy Name', 'Category Status', 'Action']} >
                    {
                        allgroupmaster?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_usrgrp_slno}</td>
                                <td>{item.fb_usrgrp_name?.toUpperCase()}</td>
                                <td>{item.fb_usrgrp_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(UserGroupMaster)

