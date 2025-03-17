import React, { useCallback, memo, useState, useMemo, useEffect } from 'react';
import Modal from '@mui/joy/Modal';
import { Box, Button, ModalClose, ModalDialog, Typography } from '@mui/joy';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import BedListOtherDep from './BedListOtherDep';
import { useQuery } from '@tanstack/react-query';
import { getDepartmentEmployee, getLoggedEmpDetail } from '../../Function/CommonFunction';
import { EmpauthId } from '../../Constant/Constant';
import MultipleSelect from '../../Components/MultipleSelect';
import MaintenanceRemarkButton from './MaintenanceRemarkButton';

const BedListModal = ({ open, setOpen, name, icon }) => {


    const id = EmpauthId()
    const [empid, setEmpid] = useState([]);
    const [ovarallconditon, setOverallCondition] = useState(null)
    const [activeButton, setActiveButton] = useState(null);
    const [remarks, setRemarks] = useState("")
    const [selectmaintentance, setSelectMaintenance] = useState({
        "AIR CONDITIONER": false,
        "TELEVISION": false,
        "FAN": false,
        "BULB": false
    });
    const [setinformationtech, setInformationTech] = useState({
        "WIFI": false,
        "TELEPHONE": false,
    });
    const [setbiomedical, setBioMedical] = useState({
        "ECG MACHINE": false,
        "THERMOMETER": false,
    });
    const handleButtonClick = useCallback((buttonName) => {
        setOverallCondition((prevState) => (prevState === buttonName ? null : buttonName));
    }, [setOverallCondition]);
    // Function to get the icon color based on active button
    const getIconColor = (buttonName) => {
        return ovarallconditon === buttonName ? 'rgb(216, 75, 154, 1)' : 'rgba(var(--font-primary-white))';
    };

    const HanldeModalClose = useCallback(() => {
        setOpen(false)
        setEmpid([])
        setActiveButton(null)
        setRemarks("")
        setSelectMaintenance({
            "AIR CONDITIONER": false,
            "TELEVISION": false,
            "FAN": false,
            "BULB": false
        })
        setInformationTech({
            "WIFI": false,
            "TELEPHONE": false,
        })
        setBioMedical({
            "ECG MACHINE": false,
            "THERMOMETER": false,
        })
    }, [setOpen, setEmpid, setActiveButton, setRemarks, setSelectMaintenance, setInformationTech, setBioMedical]);


    //calculation for the condition 
    const selectmaintenance = selectmaintentance ? Object.values(selectmaintentance).filter(value => value === true).length : 0;
    const selectinformation = setinformationtech ? Object.values(setinformationtech).filter(value => value === true).length : 0;
    const selectbio = setbiomedical ? Object.values(setbiomedical).filter(value => value === true).length : 0;
    const TotalCountMT = selectmaintentance ? Object.values(selectmaintentance).length : 0;
    const TotalCountIT = setinformationtech ? Object.values(setinformationtech).length : 0;
    const TotalCountBM = setbiomedical ? Object.values(setbiomedical).length : 0;

    useEffect(() => {
        if ((selectbio + selectinformation + selectmaintenance) === (TotalCountBM + TotalCountIT + TotalCountMT)) {
            setActiveButton(null);
        }
    }, [selectbio, selectinformation, selectmaintenance, TotalCountBM, TotalCountIT, TotalCountMT]);

    const { data: getlogempdetail } = useQuery({
        queryKey: ["loggedempdetail", id],
        queryFn: () => getLoggedEmpDetail(id)
    });
    const departmentSection = useMemo(() => getlogempdetail?.[0]?.em_dept_section, [getlogempdetail]);

    const { data: departmentemp, isLoading: emploading, error: emperror } = useQuery({
        queryKey: ['fetchalldepemployee', departmentSection],
        queryFn: () => getDepartmentEmployee(departmentSection),
        enabled: !!departmentSection,
    })

    const hanldmultiplechange = (e, val) => {
        setEmpid(val); // Update the selected emp IDs
    };


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
            >
                <ModalDialog sx={{
                    width: '90%',
                    borderRadius: 'md',
                    px: 1,
                    py: 1,
                    minHeight: 250,
                    maxHeight: "95%",
                    border: 0,
                    boxShadow: "none",
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}>
                    <ModalClose onClick={HanldeModalClose} />
                    <Box sx={{
                        p: 1,
                        backgroundColor: "rgba(var(--bg-card))",
                        borderRadius: 5,
                        minHeight: 200,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}
                            className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
                            {icon}
                            <Typography
                                level='body-sm'
                                fontWeight={'md'}
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    color: 'rgba(var(--font-primary-white))',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    mt: 1
                                }}>
                                CHECK LIST
                            </Typography>
                        </Box>

                        <BedListOtherDep name={"MAINTENANCE"} selectedItems={selectmaintentance} setSelectedItems={setSelectMaintenance} />
                        <BedListOtherDep name={"INFORMATION TECHNOLOGY"} selectedItems={setinformationtech} setSelectedItems={setInformationTech} />
                        <BedListOtherDep name={"BIOMEDICAL"} selectedItems={setbiomedical} setSelectedItems={setBioMedical} />
                        <Box sx={{
                            p: 1,
                            backgroundColor: "rgba(var(--bg-card))",
                            borderRadius: 5,
                            mt: 1
                        }}>
                            <Box sx={{
                                border: 0,
                                borderBottom: 1.5,
                                borderColor: "rgba(var(--tab-border-color))",
                                borderBottomColor: 'divider',
                                borderWidth: 2,
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                pb: 0.4
                            }}>
                                <VerifiedUserTwoToneIcon sx={{
                                    color: 'rgba(var(--icon-primary))',
                                    fontSize: 26,
                                    fontWeight: 700
                                }} />
                                <Typography
                                    level='body-sm'
                                    fontWeight={'md'}
                                    sx={{
                                        fontFamily: 'var(--font-varient)',
                                        color: 'rgba(var(--font-primary-white))',
                                        fontSize: 18,
                                        fontWeight: 700
                                    }}>OVERALL CONDITIONS</Typography>
                            </Box>
                            <Box
                                sx={{
                                    px: 1,
                                    width: "100%",
                                    mt: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 2
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '48%',
                                        border: '1px solid rgba(var(--border-primary))',
                                        color: getIconColor("POOR"),
                                        bgcolor: ovarallconditon === 'POOR' ? '#fae0e4' : ''
                                    }}
                                    // startDecorator={<PauseCircleFilledTwoToneIcon sx={{ color: getIconColor("OnHold") }} />}
                                    onClick={() => handleButtonClick("POOR")}
                                >
                                    POOR
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '48%',
                                        border: '1px solid rgba(var(--border-primary))',
                                        color: getIconColor("GOOD"),
                                        bgcolor: ovarallconditon === 'GOOD' ? '#fae0e4' : ''
                                    }}
                                    // startDecorator={<PauseCircleFilledTwoToneIcon sx={{ color: getIconColor("OnHold") }} />}
                                    onClick={() => handleButtonClick("GOOD")}
                                >
                                    GOOD
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '48%',
                                        border: '1px solid rgba(var(--border-primary))',
                                        color: getIconColor("EXCELLENT"),
                                        bgcolor: ovarallconditon === 'EXCELLENT' ? '#fae0e4' : '', // Remove focus outline
                                    }}
                                    // startDecorator={<FiberNewTwoToneIcon sx={{ color: getIconColor("Renovation") }} />}
                                    onClick={() => handleButtonClick("EXCELLENT")}
                                >
                                    EXCELLENT
                                </Button>
                            </Box>

                        </Box>
                        <Box sx={{ px: 1, mt: 1 }}>
                            <Typography level='body-sm'
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "var(--font-varient)",
                                    opacity: 0.8,
                                    paddingLeft: "0.26rem",
                                    lineHeight: "1.0rem",
                                    fontSize: "0.81rem",
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: "0.26rem",
                                }}>Select Employee</Typography>
                            <MultipleSelect
                                data={departmentemp ? departmentemp : []}
                                onchange={hanldmultiplechange}
                                value={empid}
                            />
                        </Box>
                        {
                            (selectbio + selectinformation + selectmaintenance) !== (TotalCountBM + TotalCountIT + TotalCountMT) &&
                            <>
                                <Typography level='body-sm'
                                    sx={{
                                        fontWeight: 600,
                                        fontFamily: "var(--font-varient)",
                                        opacity: 0.8,
                                        paddingLeft: "0.26rem",
                                        lineHeight: "1.0rem",
                                        fontSize: "0.81rem",
                                        color: 'rgba(var(--font-primary-white))',
                                        paddingY: "0.26rem",
                                        mt: 0.2,
                                        ml: 1
                                    }}>Select Status</Typography>
                                <MaintenanceRemarkButton
                                    setRemarks={setRemarks}
                                    remarks={remarks}
                                    activeButton={activeButton}
                                    setActiveButton={setActiveButton}
                                />
                            </>

                        }
                        <Box sx={{
                            px: 1,
                            width: '100%',
                            height: 60,
                            mt: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // bgcolor: 'green'
                        }}>
                            <Button
                                // onClick={activeButton !== null ? () => HandleBedRequest : ""}
                                // disabled={!remarks}
                                variant="outlined"
                                sx={{
                                    fontSize: 16,
                                    height: '100%',
                                    border: '1px solid rgb(216, 75, 154, 1)',
                                    // color: 'rgba(var(--icon-primary))',
                                    color: 'rgb(216, 75, 154, 1)',
                                    bgcolor: '#fff0f3',
                                    '&:hover': {
                                        color: 'transparent',
                                        boxShadow: 'none',
                                        // borderColor: 'rgb(216, 75, 154, 1)',
                                        color: 'rgb(216, 75, 154, 1)',
                                    },
                                }}>
                                Checklist Verification Completed
                            </Button>
                            {/* </Box> : <Box sx={{
                            px: 1,
                            mt: 1,
                            width: '100%',
                            // mb: 2,
                            height: 45
                        }}>
                            <Button
                                // onClick={HandleBedRequest}
                                // disabled={!remarks}
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    border: '1px solid rgba(var(--border-primary))',
                                    color: 'rgba(var(--font-primary-white))',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        borderColor: 'rgb(216, 75, 154, 1)',
                                        color: 'rgb(216, 75, 154, 1)',
                                    },
                                }}>
                                Submit
                            </Button>
                            } */}
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(BedListModal)
