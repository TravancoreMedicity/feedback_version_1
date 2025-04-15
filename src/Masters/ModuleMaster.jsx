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
import { getallmoudleMaster } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";


// import CustomInputWithLabel from '../Components/CustomInputWithLabel'
// import CustomCheckBoxWithLabel from '../Components/CustomCheckBoxWithLabel'
// import CommonMenuList from '../Components/CommonMenuList'

const CustomInputWithLabel = lazy(() => import('../Components/CustomInputWithLabel'));
const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));
const CommonMenuList = lazy(() => import('../Components/CommonMenuList'));
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const ModuleMaster = () => {


    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [modulename, setModuleName] = useState({
        module_name: '',
        status: false
    })

    const { module_name, status } = modulename;
    const handleChange = (e) => {
        setModuleName({ ...modulename, [e.target.name]: e.target.value })
    }
    const { data: allmodulemaster, refetch: fetchallmodulemaster } = useQuery({
        queryKey: ['getallmodulemaster'],
        queryFn: () => getallmoudleMaster(),
    })

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setModuleName({
                module_name: rowData.fb_module_name,
                status: rowData.fb_module_status === 1 ? true : false
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {
        if (module_name === "") return warningNofity("Please enter the Module Name");
        const insertData = {
            fb_module_name: module_name,
            fb_module_status: !status ? 0 : 1,
            create_user: employeeID()
        }
        const UpdateinsertingData = {
            fb_module_slno: updationdetail.fb_module_slno,
            fb_module_name: module_name,
            fb_module_status: !status ? 0 : 1,
            edit_user: employeeID()
        }
        console.log(UpdateinsertingData, "data");

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertmodulemaster", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Module Already Exists!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallmodulemaster()
                succesNofity("Successfully Inserted Data..!")
                setModuleName({ module_name: '', status: false })
            } catch (error) {
                warningNofity(error)
                setModuleName({ module_name: '', status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatemodulemaster", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                fetchallmodulemaster()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setModuleName({ module_name: '', status: false })
            } catch (error) {
                warningNofity(error)
                setModuleName({ module_name: '', status: false })
            }
        }

    }, [module_name, fetchallmodulemaster, status, updateflag, updationdetail])

    return (
        <DefaultPageLayout label="Module Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    values={module_name}
                    handleInputChange={(e) => handleChange({ target: { name: 'module_name', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Module Name'
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Module Name', 'Module Status', 'Action']} >
                    {
                        allmodulemaster?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_module_slno}</td>
                                <td>{item.fb_module_name?.toUpperCase()}</td>
                                <td>{item.fb_module_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(ModuleMaster)

