// @ts-nocheck
import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react'
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
import { getallemployeeright, getallNurseStation, getallNurseStationMaster, getallOutlets, getDepartmentEmployee, getDepartmentSection } from '../Function/CommonFunction'
import { IconButton, Tooltip } from "@mui/joy";
import { EditPencil } from "iconoir-react";
import SelectUserGroupMaster from '../Components/SelectUserGroupMaster'
import SelectDepartmentMaster from '../Components/SelectDepartmentMaster'
import SelectDepartmentSec from '../Components/SelectDepartmentSec'
import SelectEmployee from '../Components/SelectEmployee'
import SelectNursingStation from '../Components/SelectNursingStation'
import SelectFloorMaster from '../Components/SelectFloorMaster'
const FeedbackCategoryMasterList = lazy(() => import('../Components/CustomTable'));

const NurstationMaster = () => {

    const [updateflag, setUpdateFlag] = useState(0);
    const [updationdetail, setUpdateDetial] = useState({})
    const [rightsitem, setRightsItems] = useState({
        NS_CODE: 0,
        FLOOR_CODE: 0,
        FloorType: "",
        status: false
    });

    const { status, NS_CODE, FLOOR_CODE, FloorType } = rightsitem;
    const handleChange = (e) => {
        setRightsItems({ ...rightsitem, [e.target.name]: e.target.value })
    };

    //Outlets or OU_CODE
    // const { data: getalloutlets, refetch: fetchalloutlets } = useQuery({
    //     queryKey: ['getalloutlets'],
    //     queryFn: () => getallOutlets(),
    // })

    const { data: ellidernusrstation } = useQuery({
        queryKey: ['elidernursestaion'],
        queryFn: () => getallNurseStation(),
    });

    const { data: getallnursestation, refetch: fetchallnursinstation } = useQuery({
        queryKey: ['getallnsmaster'],
        queryFn: () => getallNurseStationMaster(),
    }); 

    const nursestationname = useMemo(() => {
        const filtered = ellidernusrstation?.filter(item => item.NS_CODE === NS_CODE);
        return filtered && filtered.length > 0 ? filtered[0].NSC_DESC : [];
    }, [ellidernusrstation, NS_CODE]);

    const handleSubmitUserManagment = useCallback(async () => {
        if (NS_CODE === 0) return warningNofity("Select the Nursing Station")
        if (FloorType == "") return warningNofity("Select the Block")
        if (FLOOR_CODE === 0) return warningNofity("Select the Floor")
        const insert_data = {
            fb_ns_code: NS_CODE,
            fb_floor_code: FLOOR_CODE,
            fb_ns_name: nursestationname,
            fb_ns_status: status,
            create_user: employeeID()
        }
        const update_data = {
            fb_nurse_stn_slno: updationdetail.fb_nurse_stn_slno,
            fb_ns_code: NS_CODE,
            fb_ns_name: nursestationname,
            fb_floor_code: FLOOR_CODE,
            fb_ns_status: status,
            edit_user: employeeID()
        }
        if (updateflag === 0) {
            try {
                const result = await axiosApi.post("/feedback/nursestationinsert", insert_data);
                const { success } = result.data;
                if (success === 3) return warningNofity("Item Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("Inserted successfully")
                fetchallnursinstation()
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: "", status: false })
            } catch (error) {
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: "", status: false })
                warningNofity(error)
            }
        } else {
            try {
                const result = await axiosApi.post("/feedback/updatenursestation", update_data);
                const { success } = result.data;
                if (success === 3) return warningNofity("Item Already Exists")
                if (success !== 2) return errorNofity("Error in inserting Data!")
                succesNofity("updated successfully")
                fetchallnursinstation()
                setUpdateFlag(0)
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: "", status: false })
            } catch (error) {
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: "", status: false })
                warningNofity(error)
            }
        }
    }, [status, updateflag, updationdetail, fetchallnursinstation, FLOOR_CODE, NS_CODE, nursestationname])

    const HanldeUpdation = useCallback(
        async (rowData) => {
            setUpdateFlag(1)
            setUpdateDetial(rowData)
            setRightsItems({
                NS_CODE: rowData.fb_ns_code,
                FLOOR_CODE: rowData.fb_floor_code,
                FloorType: rowData.rm_floor_alias === "QMT/HB/HB" ? "HB" : "SB",
                status: rowData.fb_ns_status === 1 ? true : false
            })
        },
        []
    );


    return (
        <DefaultPageLayout label="Nurse Station Master" >
            <MasterPageLayout>
                <SelectNursingStation
                    label={'Nurse Station Master'}
                    value={NS_CODE}
                    handleChange={(e, val) => handleChange({ target: { name: 'NS_CODE', value: val } })}
                />
                <Box className="flex flex-1 items-center gap-3 py-[0.299rem] mt-2">
                    <CustomCheckBoxWithLabel
                        label="HOSPITAL BLOCK"
                        checkBoxValue={FloorType === "HB"}
                        handleCheckBoxValue={(e) => handleChange({ target: { name: "FloorType", value: "HB" } })}
                    />
                    <CustomCheckBoxWithLabel
                        label="SERVICE BLOCK"
                        checkBoxValue={FloorType === "SB"}
                        handleCheckBoxValue={(e) => handleChange({ target: { name: "FloorType", value: "SB" } })}
                    />
                </Box>
                <SelectFloorMaster
                    type={FloorType}
                    label={'Floor Master'}
                    value={FLOOR_CODE}
                    handleChange={(e, val) => handleChange({ target: { name: 'FLOOR_CODE', value: val } })}
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
                <FeedbackCategoryMasterList tableHeaderCol={['SLNO', 'NSNAME', 'FLOOR NAME', 'Stats', "Action"]} >
                    {
                        getallnursestation?.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.slno}</td>
                                <td>{item.fb_ns_name?.toUpperCase()}</td>
                                <td>{item.rm_floor_name?.toUpperCase()}</td>
                                <td>{item.fb_ns_status === 1 ? "ACTIVE" : "INACTIVE"}</td>
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
export default memo(NurstationMaster) 