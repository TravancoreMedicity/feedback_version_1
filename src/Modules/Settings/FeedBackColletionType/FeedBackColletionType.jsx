// @ts-nocheck
import React, { Suspense, lazy, useCallback, useState } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { warningNofity, succesNofity, errorNofity, employeeID } from '../../../Constant/Constant'
import MasterPageLayout from '../../../Components/MasterPageLayout'
// import { commonStatus } from '../../../Constant/Data'
import CommonMenuList from '../../../Components/CommonMenuList'
import { axiosApi } from '../../../Axios/Axios'
import { Box } from '@mui/joy'
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useQuery } from '@tanstack/react-query'
import { allfeedbackcollection } from '../../../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
// import { getDocTypeMasterList } from '../../../api/docTypeMasterApi'


const FeedbackCategoryMasterList = lazy(() => import('../../../Components/CustomTable'));

const FeedBackColletionType = () => {

    // const navigation = useNavigate()
    // const queryClient = useQueryClient();
    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [feedbackcollectiontype, setFeedbackCollectionType] = useState({
        collectiontype: '',
        status: false
    })

    const { collectiontype, status } = feedbackcollectiontype;
    const handleChange = (e) => {
        setFeedbackCollectionType({ ...feedbackcollectiontype, [e.target.name]: e.target.value })
    }
    const { data: allcollectiontype, refetch: allcollectiontyperefetch } = useQuery({
        queryKey: ['allcollectiontype'],
        queryFn: () => allfeedbackcollection(),
    })


    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setFeedbackCollectionType({
                collectiontype: rowData.fb_rateing_name,
                status: rowData.fb_rateing_status
            })
        },
        []
    );
    const handleSubmitUserManagment = useCallback(async () => {

        if (collectiontype === "") return warningNofity("Please enter the collectiontype");
        const insertData = {
            fb_collection_name: collectiontype,
            fb_collection_status: status,
            create_user: employeeID()
        }

        const UpdateinsertingData = {
            fb_collection_slno: updationdetail?.fb_rateing_slno,
            fb_collection_name: collectiontype,
            fb_collection_status: status,
            edit_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/insertcollectiontype", insertData);
                const { success } = result.data;
                if (success === 3) return warningNofity("Feedback Already Occured!")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                allcollectiontyperefetch()
                succesNofity("Successfully Inserted Data..!")
                setFeedbackCollectionType({ collectiontype: '', status: false })
            } catch (error) {
                warningNofity(error)
                setFeedbackCollectionType({ collectiontype: '', status: false })
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatecollectiontype", UpdateinsertingData);
                const { success } = result.data;
                if (success !== 2) return errorNofity("Error in inserting Data!")
                allcollectiontyperefetch()
                succesNofity("Successfully Updated Data..!")
                setUpdateFlag(0)
                setFeedbackCollectionType({ collectiontype: '', status: false })
            } catch (error) {
                warningNofity(error)
                setFeedbackCollectionType({ collectiontype: '', status: false })
            }
        }

    }, [ allcollectiontyperefetch, updationdetail, updateflag, collectiontype, status])

    return (
        <DefaultPageLayout label="Feedback Rating Master" >
            <MasterPageLayout>
                <CustomInputWithLabel
                    values={collectiontype}
                    handleInputChange={(e) => handleChange({ target: { name: 'collectiontype', value: e.target.value } })}
                    placeholder="Type here ..."
                    sx={{}}
                    labelName='Feedback Collection Type'
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
                        allcollectiontype?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.fb_rateing_slno}</td>
                                <td>{item.fb_rateing_name?.toUpperCase()}</td>
                                <td>{item.fb_rateing_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(FeedBackColletionType) 