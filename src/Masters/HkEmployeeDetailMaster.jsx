// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import { Box } from '@mui/joy'
import { axiosApi } from '../Axios/Axios'
import { EditPencil } from "iconoir-react";
import { IconButton, Tooltip } from "@mui/joy";
import { useQuery } from '@tanstack/react-query'
import MasterPageLayout from '../Components/MasterPageLayout'
import DefaultPageLayout from '../Components/DefaultPageLayout'
import { getallHkEmployeeDetail } from '../Function/CommonFunction'
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../Constant/Constant'



const CustomInputWithLabel = lazy(() => import('../Components/CustomInputWithLabel'));
const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));
const CommonMenuList = lazy(() => import('../Components/CommonMenuList'));
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));
const CustomeCheckBox = lazy(() => import('../Components/CustomeCheckBox'));

const HkEmployeeDetailMaster = () => {


    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [emplyeedetail, setEmployeeDetail] = useState({
        employee_name: '',
        emp_id: '',
        isSupervisor: 0,
        status: false
    })

    const { employee_name, status, isSupervisor, emp_id } = emplyeedetail;
    const handleChange = (e) => {
        setEmployeeDetail({ ...emplyeedetail, [e.target.name]: e.target.value })
    }
    const { data: allhkempdtl, refetch: fetallhkempdetail } = useQuery({
        queryKey: ['getallhkempdtl'],
        queryFn: () => getallHkEmployeeDetail(),
    });


    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setEmployeeDetail({
                employee_name: rowData.fb_hk_emp_name,
                emp_id: rowData.fb_hk_empid,
                isSupervisor: rowData.fb_hk_issupevisor,
                status: rowData.fb_emp_status === 1 ? true : false
            })
        },
        []
    );
    
    const handleSubmitUserManagment = useCallback(async () => {
        if (employee_name === "") return warningNofity("Please enter the Module Name");
        const insertData = {
            fb_hk_emp_name: employee_name,
            fb_hk_empid: Number(emp_id),
            fb_hk_issupevisor: isSupervisor,
            fb_emp_status: !status ? 0 : 1,
            create_user: employeeID()
        }
        const UpdateinsertingData = {
            fb_hkemp_slno: updationdetail.fb_hkemp_slno,
            fb_hk_emp_name: employee_name,
            fb_hk_empid: Number(emp_id),
            fb_hk_issupevisor: isSupervisor,
            fb_emp_status: !status ? 0 : 1,
            edit_user: employeeID()
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/inserthkempdtl", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Module Already Exists!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetallhkempdetail()
                succesNofity("Successfully Inserted Data..!")
                setEmployeeDetail({ employee_name: '', isSupervisor: 0, status: false, emp_id: '' })
            } catch (error) {
                warningNofity(error)
                setEmployeeDetail({ employee_name: '', isSupervisor: 0, status: false, emp_id: '' })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatehkempdtl", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetallhkempdetail()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setEmployeeDetail({ employee_name: '', isSupervisor: 0, status: false, emp_id: '' })
            } catch (error) {
                warningNofity(error)
                setEmployeeDetail({ employee_name: '', isSupervisor: 0, status: false, emp_id: '' })

            }
        }

    }, [employee_name, fetallhkempdetail, status, updateflag, updationdetail, isSupervisor, emp_id])

    return (
        <DefaultPageLayout label="Module Master" >
            <MasterPageLayout>
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                    <CustomInputWithLabel
                        values={employee_name}
                        handleInputChange={(e) => handleChange({ target: { name: 'employee_name', value: e.target.value } })}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Module Name'
                        type="text"
                    />
                </Suspense>
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                    <CustomInputWithLabel
                        values={emp_id}
                        handleInputChange={(e) => handleChange({ target: { name: 'emp_id', value: e.target.value } })}
                        placeholder="Type here ..."
                        sx={{}}
                        labelName='Employee Id'
                        type="text"
                    />
                </Suspense>
                <Box className="flex flex-row gap-2 mt-2" >
                    <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                        <CustomeCheckBox
                            values={isSupervisor === 0 ? false : true}
                            color={'danger'}
                            lable={'Is supervisor'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'isSupervisor', value: e.target.checked ? 1 : 0 }
                            })}
                        />
                    </Suspense>
                </Box>
                <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                    <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', ' Employye Name', 'Employee Id', 'Designation', 'Status', 'Action']} >
                    {
                        allhkempdtl?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_hkemp_slno}</td>
                                <td>{item.fb_hk_emp_name?.toUpperCase()}</td>
                                <td>{item.fb_hk_empid}</td>
                                <td>{item.fb_hk_issupevisor === 1 ? "SUPERVISOR" : "EMPLOYEE"}</td>
                                <td>{item.fb_emp_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(HkEmployeeDetailMaster)

