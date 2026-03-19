// @ts-nocheck
import React, { Suspense, lazy, useState, useEffect, memo, useCallback } from 'react';
import { Box, IconButton, Tooltip } from '@mui/joy';
import { axiosApi } from '../Axios/Axios';
import { infoNofity, warningNofity, succesNofity, employeeID } from '../Constant/Constant';
import CommonMenuList from '../Components/CommonMenuList';
import { getAllPremTargets } from '../Function/CommonFunction';
import { useQuery } from '@tanstack/react-query';
import { EditPencil } from "iconoir-react";

// Lazy-loaded components
const DefaultPageLayout = lazy(() => import('../Components/DefaultPageLayout'));
const MasterPageLayout = lazy(() => import('../Components/MasterPageLayout'));
const CustomBackDropWithOutState = lazy(() => import('../Components/CustomBackDropWithOutState'));
const SelectPremFeedbacks = lazy(() => import('../Components/SelectPremFeedbacks'));
const CustomInputWithLabel = lazy(() => import('../Components/CustomInputWithLabel'));
const CustomCheckBoxWithLabel = lazy(() => import('../Components/CustomCheckBoxWithLabel'));
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));


const PremTargetMaster = () => {

    const [premtarget, setPremTarget] = useState({
        feedbackid: 0,
        target_count: null,
        status: false
    });
    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdationDetail] = useState({});
    const [premTargets, setPremTargets] = useState([]);
    const [loading, setLoading] = useState(false);

    const { feedbackid, target_count, status } = premtarget;


    const { data: premtargets,
        refetch: fetchAllPremTargets
    } = useQuery({
        queryKey: ['getallpremtarget'],
        queryFn: () => getAllPremTargets(),
    })
    // Handle input changes

    const handleCheckBoxChange = (e) => {
        setPremTarget(prev => ({ ...prev, status: e.target.checked }));
    };

    // Handle edit
    const handleEdit = (item) => {
        setUpdateFlag(true);
        setUpdationDetail(item);
        setPremTarget({
            feedbackid: item.fdmast_slno,
            target_count: item.prem_target,
            status: item.prem_status === 1
        });
    };

    // Handle submit
    const handleSubmitPremTarget = useCallback(async () => {
        if (feedbackid === 0) return warningNofity("Please select Feedback");
        if (!target_count) return warningNofity("Please enter Target Count");

        const payload = {
            fdmast_slno: feedbackid,
            prem_target: target_count,
            prem_status: status ? 1 : 0,
            ...(updateflag === 0
                ? { create_user: employeeID() }
                : {
                    prem_target_slno: updationdetail?.prem_target_slno,
                    edit_user: employeeID()
                })
        };

        const url =
            updateflag === 0
                ? "/feedback/insertpremtarget"
                : "/feedback/updatepremtarget";

        try {
            const result = await axiosApi.post(url, payload);
            const { success, message } = result.data;

            if (success === 3) return warningNofity(message);
            if (success !== 2)
                return warningNofity(
                    updateflag === 0
                        ? "Error in inserting Data!"
                        : "Error in updating Data!"
                );
            succesNofity(
                updateflag === 0
                    ? "Successfully Inserted Data..!"
                    : "Successfully Updated Data..!"
            );

            setUpdateFlag(0);
            setPremTarget({ feedbackid: 0, target_count: null, status: false });
            fetchAllPremTargets()

        } catch (error) {
            warningNofity(error);
            setPremTarget({ feedbackid: 0, target_count: null, status: false });
        }
    }, [
        feedbackid,
        target_count,
        status,
        updateflag,
        updationdetail,
        fetchAllPremTargets
    ]);

    return (
        <Suspense fallback={<div>Loading Page...</div>}>
            <DefaultPageLayout label="Prem Target Master">
                <Suspense fallback={<CustomBackDropWithOutState message="Loading Master Layout..." />}>
                    <MasterPageLayout>
                        {/* Feedback Selector */}
                        <Suspense fallback={<CustomBackDropWithOutState message="Loading Feedback Selector..." />}>
                            <SelectPremFeedbacks
                                label="Select Feedback"
                                value={feedbackid}
                                handleChange={(e, newValue) => setPremTarget(prev => ({ ...prev, feedbackid: newValue }))}
                            />
                        </Suspense>

                        {/* Target Input */}
                        <Suspense fallback={<CustomBackDropWithOutState message="Loading Input..." />}>
                            <CustomInputWithLabel
                                values={target_count ?? ""}
                                placeholder="Enter Target Count"
                                labelName="Target Count"
                                type="number"
                                handleInputChange={(e) =>
                                    setPremTarget(prev => ({
                                        ...prev,
                                        target_count: Number(e.target.value)
                                    }))
                                }
                            />

                        </Suspense>

                        {/* Status Checkbox */}
                        <Box className="flex flex-1 items-center justify-between py-[0.299rem]">
                            <Suspense fallback={<CustomBackDropWithOutState message="Loading Checkbox..." />}>
                                <CustomCheckBoxWithLabel
                                    label="Status"
                                    checkBoxValue={status}
                                    handleCheckBoxValue={handleCheckBoxChange}
                                />
                            </Suspense>
                        </Box>

                        <CommonMenuList
                            handleSubmitButtonFun={handleSubmitPremTarget}
                            handleViewButtonFun={() => { }}
                        />

                        {/* Prem Target Table */}
                        <Suspense fallback={<CustomBackDropWithOutState message="Loading Table..." />}>
                            <FeedbackCategoryMasterList
                                tableHeaderCol={[
                                    'SlNo',
                                    'Feedback Name',
                                    'Target Count',
                                    'Status',
                                    'Action'
                                ]}
                            >
                                {premtargets?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item?.prem_target_slno}</td>
                                        <td>{item?.feedback_name}</td>
                                        <td>{item?.prem_target}</td>
                                        <td>{item?.prem_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
                                        <td>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    onClick={() => handleEdit(item)}
                                                    sx={{
                                                        ":hover": {
                                                            backgroundColor: "transparent",
                                                            border: "0.03px solid rgba(var(--color-pink))"
                                                        }
                                                    }}
                                                >
                                                    <EditPencil
                                                        height={18}
                                                        width={18}
                                                        color="rgba(var(--icon-primary))"
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </FeedbackCategoryMasterList>
                        </Suspense>
                    </MasterPageLayout>
                </Suspense>
            </DefaultPageLayout>
        </Suspense>
    );
};

export default memo(PremTargetMaster);
