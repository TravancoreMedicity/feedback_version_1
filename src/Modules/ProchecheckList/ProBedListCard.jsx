import { Box, Typography } from '@mui/joy';
import React, { lazy, memo, Suspense } from 'react';
import { infoNofity } from '../../Constant/Constant';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import GoodBadToggle from '../../Components/GoodBadToggle';



const CustomeCheckBox = lazy(() => import('../../Components/CustomeCheckBox'));
const GoodBadSelector = lazy(() => import('../../Components/GoodBadSelector'));

const ProBedListCard = ({ item, handleChange, checklistItems, proCheckListDetail }) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, }}>
            {item?.map((item, index) => {
                const foundItem = checklistItems?.find(i => i?.fb_item_name === item?.fb_item_name) || {};
                const ItemCompleteInitial = proCheckListDetail?.some(val => val?.fb_item_name === item?.fb_item_name && val.fb_initial_check === 1);
                const ItemCompleteFinal = proCheckListDetail?.some(val => val?.fb_item_name === item?.fb_item_name && val.fb_final_check === 1);
                const isItemCheckCompleted = proCheckListDetail?.find(val => val?.fb_item_name === item?.fb_item_name);
                const PresentStatus = ItemCompleteInitial ? isItemCheckCompleted?.fb_item_present : foundItem?.ispresent;
                const ConditionStatus = ItemCompleteFinal && isItemCheckCompleted?.fb_item_condition;
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            height: 50,
                            px: 1,
                            borderRadius: 5,
                            border: 0.03,
                            borderColor: "rgba(var(--border-primary))",
                        }}>
                        <Box sx={{
                            width: '30%',
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center'
                        }} >
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontWeight: 600,
                                    fontSize: 14
                                }}>
                                {item?.fb_item_name?.toUpperCase()}
                            </Typography>
                        </Box>
                        <Box sx={{ width: ItemCompleteInitial && PresentStatus === 1 ? '30%' : '35%', display: 'flex', alignItems: 'center', gap: 1, justifyContent: "center" }} >
                            {
                                ItemCompleteInitial && PresentStatus === 1 ? <Box sx={{
                                    width: '100%',
                                    pr: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'end',
                                    gap: 0.5
                                }}>
                                    <ReportGmailerrorredOutlinedIcon sx={{
                                        width: 25,
                                        height: 25,
                                        color: 'rgba(var(--font-primary-white))',
                                    }}
                                    />
                                    <Typography sx={{
                                        fontFamily: 'var(--font-varient)',
                                        color: 'rgba(var(--font-primary-white))',
                                        fontWeight: 400,
                                        fontSize: 15,
                                        fontStyle: 'italic'

                                    }}>   Not Present</Typography>
                                </Box> : <CustomeCheckBox
                                    present={PresentStatus}
                                    values={ItemCompleteInitial ? isItemCheckCompleted?.fb_item_present === 2 : foundItem?.ispresent === 2}
                                    color={PresentStatus === 2 ? 'success' : 'danger'}
                                    handleChangeChecked={isItemCheckCompleted?.fb_initial_check !== 1 ? (e) =>
                                        handleChange(item.fb_item_name, e.target.checked ? 2 : 1, 'ispresent') : () => {
                                            infoNofity("Initial checklist completed")
                                        }
                                    }
                                />
                            }
                            {
                                PresentStatus === 2 &&

                                <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                                    <GoodBadSelector
                                        completed={isItemCheckCompleted?.fb_initial_check === 1}
                                        value={isItemCheckCompleted?.fb_present_condition}
                                        handleChangeChecked={(value) =>
                                            handleChange(item.fb_item_name, value, 'ispresentcondition')
                                        }
                                    />
                                </Suspense>

                            }
                        </Box>
                        <Box sx={{ width: !ItemCompleteInitial ? '33%' : '30%', display: 'flex', alignItems: 'center', px: 1 }} >
                            {

                                !ItemCompleteInitial ?
                                    <Box sx={{
                                        width: '100%',
                                        border: 0.03,
                                        borderColor: "rgba(var(--border-primary))",
                                        p: 0.4,
                                        borderRadius: 5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        gap: 0.5
                                    }}>
                                        <HourglassTopTwoToneIcon sx={{
                                            width: 22, height: 22,
                                            color: "#ff4d6d",
                                        }}
                                        />
                                        <Typography sx={{
                                            color: 'rgba(var(--font-primary-white))',
                                        }}>Initial check pending</Typography>
                                    </Box> :
                                    !ItemCompleteInitial || PresentStatus === 1 ?
                                        <Box sx={{
                                            width: '100%',
                                            borderRadius: 5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'start',
                                            gap: 0.5
                                        }}>
                                        </Box>
                                        :
                                        <>
                                            {
                                                ItemCompleteInitial &&
                                                    PresentStatus === 2 &&
                                                    isItemCheckCompleted?.fb_present_condition === 1
                                                    ? <Box sx={{
                                                        width: '100%',
                                                        border: 0.03,
                                                        borderColor: "rgba(var(--border-primary))",
                                                        p: 1,
                                                        borderRadius: 5,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 0.5
                                                    }}>
                                                        <CancelOutlinedIcon
                                                            sx={{ width: 15, height: 15 }} color={'error'} />
                                                        <Typography sx={{
                                                            fontFamily: 'var(--font-varient)',
                                                            color: 'rgba(var(--font-primary-white))',
                                                            fontSize: 10,
                                                            fontWeight: 600,
                                                        }} level="body-sm" > Initially Damaged</Typography>
                                                    </Box> :
                                                    <GoodBadToggle
                                                        isexist={isItemCheckCompleted?.fb_present_condition === 1}
                                                        completed={isItemCheckCompleted?.fb_final_check === 1}
                                                        value={ItemCompleteFinal ? ConditionStatus : isItemCheckCompleted?.fb_item_present === 2 && isItemCheckCompleted?.fb_present_condition === 1 ? 1 : 0}
                                                        handleChangeChecked={(value) =>
                                                            handleChange(item.fb_item_name, value, 'iscondtion')
                                                        }
                                                    />
                                            }
                                        </>
                            }
                        </Box>
                    </Box>
                )
            })}
        </Box>
    );
};

export default memo(ProBedListCard);
