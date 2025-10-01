// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../../../Constant/Constant'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CommonMenuList from '../../../Components/CommonMenuList'
import { axiosApi } from '../../../Axios/Axios'
import { Box } from '@mui/joy'
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { getallFeedbackCategory } from '../../../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";

const FeedbackCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const FeedBackCategoryMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [feedbackcategory, setFeedbackCategory] = useState({
        category: '',
        status: false
    })

    const { data: allfeedbackcategory, refetch: allcategoriesrefetch } = useQuery({
        queryKey: ['allfeedbackcategory'],
        queryFn: async () => await getallFeedbackCategory(),
    });

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setFeedbackCategory({
                category: rowData.fb_category_name,
                status: rowData.fb_catgory_status
            })
        },
        []
    );

    const handleChange = (e) => {
        setFeedbackCategory({ ...feedbackcategory, [e.target.name]: e.target.value })
    }

    const handleSubmitUserManagment = useCallback(async () => {

        if (feedbackcategory.category === "") return warningNofity("Please enter the catergory");

        const insertData = {
            fb_category_name: feedbackcategory.category,
            fb_catgory_status: feedbackcategory.status,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            fb_category_slno: updationdetail.fb_category_slno,
            fb_category_name: feedbackcategory.category,
            fb_catgory_status: feedbackcategory.status,
            edit_user: employeeID()
        }

        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertcategory", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Feedback Already Occured!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                allcategoriesrefetch()
                setFeedbackCategory({ category: '', status: 0 })
                succesNofity("Successfully Inserted Data..!")

            } catch (error) {
                setFeedbackCategory({ category: '', status: 0 })
                warningNofity(error)

            }

        } else {
            try {
                const result = await axiosApi.post("/feedback/updatecategory", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                allcategoriesrefetch()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setFeedbackCategory({
                    category: '',
                    status: 0
                })
            } catch (error) {
                warningNofity(error)
                setFeedbackCategory({
                    category: '',
                    status: 0
                })
            }
        }

    }, [feedbackcategory, setFeedbackCategory, allcategoriesrefetch, updateflag, updationdetail])

    return (
        <DefaultPageLayout label="Feedback Category Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    values={feedbackcategory.category}
                    handleInputChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Feedback Category Name'
                    type="text"
                />
                <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                    <CustomCheckBoxWithLabel
                        label="Status"
                        checkBoxValue={feedbackcategory.status}
                        handleCheckBoxValue={(e) => handleChange({ target: { name: "status", value: e.target.checked } })}
                    />
                </Box>
                <CommonMenuList
                    handleSubmitButtonFun={handleSubmitUserManagment}
                    handleViewButtonFun={() => { }}
                />
            </MasterPageLayout>



            <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <FeedbackCategoryMasterList tableHeaderCol={['Slno', 'Categroy Name', 'Category Status', 'Action']} >
                    {
                        allfeedbackcategory?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_category_slno}</td>
                                <td>{item.fb_category_name?.toUpperCase()}</td>
                                <td>{item.fb_catgory_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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

export default memo(FeedBackCategoryMaster) 