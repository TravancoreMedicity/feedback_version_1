// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import { Box } from '@mui/joy'
import { EditPencil } from "iconoir-react";
import { axiosApi } from '../../../Axios/Axios'
import { IconButton, Tooltip } from "@mui/joy";
import CommonMenuList from '../../../Components/CommonMenuList'
import { useQuery } from '@tanstack/react-query'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import { getallfeedbackMaster } from '../../../Function/CommonFunction'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../../../Constant/Constant'


const FeedbackCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const FeedbackMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [feedbackmastername, setfeedbackMasterName] = useState({
        feedbackName: '',
        status: false
    })

    const { feedbackName, status } = feedbackmastername;

    const handleChange = (e) => {
        setfeedbackMasterName({ ...feedbackmastername, [e.target.name]: e.target.value })
    }

    const { data: allfeedbackNames, refetch: allfeedbackNamesRefectch } = useQuery({
        queryKey: ['allfeedbackname'],
        queryFn: () => getallfeedbackMaster(),
    })

    const HanldeUpdation = useCallback(
        async (rowData) => {
            // let value = allfeedbackcategory?.filter(item => item.fb_category_name === rowData.fb_category_name)
            // const { fb_category_slno } = value[0];
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setfeedbackMasterName({
                feedbackName: rowData.feedback_name,
                status: rowData.feedback_status
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {
        if (feedbackName === "") return warningNofity("Please enter the Feedback Name");
        const insertData = {
            feedback_name: feedbackName,
            fdmast_slno: 0,
            feedback_status: status,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            feedback_slno: updationdetail.fd_slno,
            feedback_name: feedbackName,
            fdmast_slno: 0,
            feedback_status: status,
            update_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertfeedback", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Feedback Already Occured!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                allfeedbackNamesRefectch()
                succesNofity("Successfully Inserted Data..!")
                setfeedbackMasterName({ feedbackName: '', status: false })
            } catch (error) {
                warningNofity(error)
                setfeedbackMasterName({ feedbackName: '', status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatetfeedback", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                allfeedbackNamesRefectch()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setfeedbackMasterName({ feedbackName: '', status: false })
            } catch (error) {
                warningNofity(error)
                setfeedbackMasterName({ feedbackName: '', status: false })
            }
        }

    }, [allfeedbackNamesRefectch, feedbackName, status, updateflag, updationdetail])

    return (
        <DefaultPageLayout label="Feedback  Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    values={feedbackName}
                    handleInputChange={(e) => handleChange({ target: { name: 'feedbackName', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Feedback Name'
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
                        allfeedbackNames?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fd_slno}</td>
                                <td>{item.feedback_name?.toUpperCase()}</td>
                                <td>{item.feedback_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(FeedbackMaster)

