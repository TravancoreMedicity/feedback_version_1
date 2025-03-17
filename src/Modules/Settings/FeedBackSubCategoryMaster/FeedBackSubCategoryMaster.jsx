// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { sanitizeInput, warningNofity, succesNofity, errorNofity, employeeID } from '../../../Constant/Constant'
import { useNavigate } from 'react-router-dom'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import SelectCmpDocumentMainType from '../../../Components/SelectCmpDocumentMainType'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import {axiosApi} from '../../../Axios/Axios'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import CustomBackDrop from '../../../Components/CustomBackDrop'
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { allfeedbacksubCategory, getallFeedbackCategory } from '../../../Function/CommonFunction'
import SelectCmpCategoryMaster from '../../../Components/SelectCmpCategoryMaster'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
// import { getDocTypeMasterList } from '../api/docTypeMasterApi'


const FeedbackCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const FeedBackSubCategoryMaster = () => {

    const navigation = useNavigate()
    const queryClient = useQueryClient();
    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [feedbacksubcategory, setFeedbackSubCategory] = useState({
        categoryid: 0,
        subcategory: "",
        status: false
    })

    const { categoryid, subcategory, status } = feedbacksubcategory;

    const handleChange = (e) => {
        setFeedbackSubCategory({ ...feedbacksubcategory, [e.target.name]: e.target.value })
    }

    const { data: allfeedbacksubcategory, refetch: allfeedbacksubCategoryrefetch } = useQuery({
        queryKey: ['allfeedbacksubcategory'],
        queryFn: () => allfeedbacksubCategory(),
    })

    const HanldeUpdation = useCallback(
        async (rowData) => {
            // let value = allfeedbackcategory?.filter(item => item.fb_category_name === rowData.fb_category_name)
            // const { fb_category_slno } = value[0];
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setFeedbackSubCategory({
                categoryid: rowData.fb_category_slno,
                subcategory: rowData.fb_subcategory_name,
                status: rowData.fb_subcategory_status
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {

        if (categoryid === 0) return warningNofity("Please enter the catergory");
        if (subcategory === "") return warningNofity("Please Select the subcategroy");

        const insertData = {
            fb_subcategory_name: subcategory,
            fb_category_slno: categoryid,
            fb_subcategory_status: status,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            fb_subcategory_slno: updationdetail.fb_subcategory_slno,
            fb_subcategory_name: subcategory,
            fb_category_slno: categoryid,
            fb_subcategory_status: status,
            edit_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertsubcategory", insertData);
                const { success } = result.data;
                 if (success === 3) return warningNofity("Feedback Already Occured!")
                if (success != 2) return errorNofity("Error in inserting Data!")
                allfeedbacksubCategoryrefetch()
                succesNofity("Successfully Inserted Data..!")
                setFeedbackSubCategory({ categoryid: 0, subcategory: "", status: false })
            } catch (error) {
                setFeedbackSubCategory({ categoryid: 0, subcategory: "", status: false })
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatesubcategory", UpdateinsertingData);
                const { success } = result.data;
                if (success != 2) return errorNofity("Error in inserting Data!")
                allfeedbacksubCategoryrefetch()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setFeedbackSubCategory({ categoryid: 0, subcategory: "", status: false })
            } catch (error) {
                warningNofity(error)
                setFeedbackSubCategory({ categoryid: 0, subcategory: "", status: false })
            }
        }
    }, [feedbacksubcategory])

    return (
        <DefaultPageLayout label="Feedback SubCategory Master" >
            <MasterPageLayout>
                <SelectCmpCategoryMaster
                    label={'Select the Category'}
                    value={categoryid}
                    handleChange={(e, val) => handleChange({ target: { name: 'categoryid', value: val } })} />
                <CustomInputWithLabel
                    values={subcategory}
                    handleInputChange={(e) => handleChange({ target: { name: 'subcategory', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Feedback SubCategory Name'
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
                <FeedbackCategoryMasterList tableHeaderCol={['SlNo', 'Categroy Name', 'SubCategory Name', 'SubCategory Status', 'Action']} >
                    {
                        allfeedbacksubcategory?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_subcategory_slno}</td>
                                <td>{item.fb_category_name?.toUpperCase()}</td>
                                <td>{item.fb_subcategory_name?.toUpperCase()}</td>
                                <td>{item.fb_subcategory_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(FeedBackSubCategoryMaster) 