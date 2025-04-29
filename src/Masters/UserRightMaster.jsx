// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'
import MasterPageLayout from '../Components/MasterPageLayout'
import CommonMenuList from '../Components/CommonMenuList'
import { axiosApi } from '../Axios/Axios'
import { Box } from '@mui/joy'
import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getallemployeeright, getDepartmentEmployee, getDepartmentSection } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
import SelectUserGroupMaster from '../Components/SelectUserGroupMaster'
import SelectDepartmentMaster from '../Components/SelectDepartmentMaster'
import SelectDepartmentSec from '../Components/SelectDepartmentSec'
import SelectEmployee from '../Components/SelectEmployee'
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const UserRightMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [rightsitem, setRightsItems] = useState({
        usrgrpid: 0,
        deptid: 0,
        secid: 0,
        empid: 0,
        status: false
    });

    const { usrgrpid, deptid, secid, empid, status } = rightsitem;
    const handleChange = (e) => {
        setRightsItems({ ...rightsitem, [e.target.name]: e.target.value })
    };

    const { data: allemployeerights, refetch: fetchallemployeeright } = useQuery({
        queryKey: ['getallempright'],
        queryFn: () => getallemployeeright(),
    })


    const { data: departmentsect, isLoading: depsectloading, error: depsecerror } = useQuery({
        queryKey: ['fetchalldepartmentsec', deptid],
        queryFn: () => getDepartmentSection(deptid),
        enabled: !!deptid,
    })


    const { data: departmentemp, isLoading: emploading, error: emperror } = useQuery({
        queryKey: ['fetchalldepemployee', secid],
        queryFn: () => getDepartmentEmployee(secid),
        enabled: !!secid,
    })
    

    const handleSubmitUserManagment = useCallback(async () => {
        if (usrgrpid === 0) return warningNofity("Select the User Group");
        if (deptid === 0) return warningNofity("Select the Department Name");
        if (secid === 0) return warningNofity("Select the Section Name");
        if (empid === 0) return warningNofity("Select the Employee Name");
        const insert_data = {
            fb_grp_slno: usrgrpid,
            fb_depid: deptid,
            fb_secid: secid,
            fb_empid: empid,
            fb_usrright_status: status,
            create_user: employeeID()
        }
        const update_data = {
            fb_employee_right_slno: updationdetail.fb_employee_right_slno,
            fb_grp_slno: usrgrpid,
            fb_depid: deptid,
            fb_secid: secid,
            fb_empid: empid,
            fb_usrright_status: status,
            edit_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/employeerightinsert", insert_data);
                const { success } = result.data;
                if (success === 3) return warningNofity("Item Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("Inserted successfully")
                fetchallemployeeright()
                setRightsItems({ usrgrpid: 0, deptid: 0, secid: 0, empid: 0, status: false })
            } catch (error) {
                setRightsItems({ usrgrpid: 0, deptid: 0, secid: 0, empid: 0, status: false })
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/employeerightupdate", update_data);
                const { success } = result.data;
                if (success === 3) return warningNofity("Item Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("updated successfully")
                fetchallemployeeright()
                setUpdateFlag(0)
                setRightsItems({ usrgrpid: 0, deptid: 0, secid: 0, empid: 0, status: false })
            } catch (error) {
                setRightsItems({ usrgrpid: 0, deptid: 0, secid: 0, empid: 0, status: false })
                warningNofity(error)
            }
        }
    }, [fetchallemployeeright, usrgrpid, deptid, secid, empid, status, updateflag, updationdetail])

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setRightsItems({
                usrgrpid: rowData.fb_grp_slno,
                deptid: rowData.fb_depid,
                secid: rowData.fb_secid,
                empid: rowData.fb_empid,
                status: rowData.fb_usrright_status === 1 ? true : false
            })
        },
        []
    );


    return (
        <DefaultPageLayout label="User Group Rights Master" >
            <MasterPageLayout>
                <SelectDepartmentMaster
                    label={'Select the Department'}
                    value={deptid}
                    handleChange={(e, val) => handleChange({ target: { name: 'deptid', value: val } })} />
                <SelectDepartmentSec
                    isLoading={depsectloading}
                    error={depsecerror ? depsecerror : ''}
                    data={departmentsect ? departmentsect : []}
                    label={'Select Department Section '}
                    value={secid ? secid : 0}
                    handleChange={(e, val) => handleChange({ target: { name: 'secid', value: val } })}
                />
                <SelectEmployee
                    isLoading={emploading}
                    error={emperror ? emperror : ''}
                    data={departmentemp ? departmentemp : []}
                    label={'Select Employee'}
                    value={empid ? empid : 0}
                    handleChange={(e, val) => handleChange({ target: { name: 'empid', value: val } })}

                />
                <SelectUserGroupMaster
                    label={'Group Master'}
                    value={usrgrpid}
                    handleChange={(e, val) => handleChange({ target: { name: 'usrgrpid', value: val } })}
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Department Name', 'Section Name', 'Employee Name', 'Group Name', 'Stats', "Action"]} >
                    {
                        allemployeerights?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.slno}</td>
                                <td>{item.dept_name?.toUpperCase()}</td>
                                <td>{item.sec_name?.toUpperCase()}</td>
                                <td>{item.em_name?.toUpperCase()}</td>
                                <td>{item.fb_usrgrp_name?.toUpperCase()}</td>
                                <td>{item.fb_usrright_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
                                <td><Tooltip title={"Edit"} placement="top">
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
export default memo(UserRightMaster) 