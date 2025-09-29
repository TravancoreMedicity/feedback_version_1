import { getYear, format } from 'date-fns'
import { axiosApi, axiosellider } from '../Axios/Axios';
import { warningNofity } from '../Constant/Constant';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Pads a given number with leading zeros until it reaches the given total length.
 * @param {number} num The number to pad
 * @param {number} totalLength The desired total length of the resulting string
 * @returns {string} The padded string
 */
const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
}


/**
 * Generates a document number in the format DOC-YYYY-MM-XXXXXX, where:
 *   YYYY is the current year
 *   MM is the current month as a zero-padded two-digit number
 *   XXXXXX is the given number, zero-padded to six digits
 * @param {number} number The number to include in the document number
 * @returns {string} The generated document number
 */
export const customDocNumber = (number) => {
    const year = getYear(new Date())
    const day = format(new Date(), 'M')
    return `DOC-${year}-${day}-${addLeadingZeros(number, 6)}`
}


export const getallFeedbackCategory = async () => {
    const result = await axiosApi.get("/feedback/getallCategories");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const allfeedbacksubCategory = async () => {
    const result = await axiosApi.get("/feedback/getallsubCategories");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const allfeedbackcollection = async () => {
    const result = await axiosApi.get("/feedback/allfeedbackcollection");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}



export const getallfeedbackMaster = async () => {
    const result = await axiosApi.get("/feedback/getallfeedback");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getAllBlockedBed = async () => {
    const result = await axiosApi.get("/feedback/getallblockedbed");
    const { data, success } = result.data;
    if (success === 0) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

// export const getAllCommonFeedbackData = async () => {
//     const result = await axiosApi.get("/feedback/commonfbreport");
//     const { data, success } = result.data;
//     if (success === 0) return warningNofity("Error in fetching Data");
//     return data ? data : [];
// }


export const FetchAllCheckListBed = async () => {
    const result = await axiosApi.get("/feedback/getchecklistbed");
    const { data, success } = result.data;
    if (success === 0) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getBedRemarkStatus = async () => {
    const result = await axiosApi.get("/feedback/getberremarkstatus");
    const { data, success } = result.data;
    if (success === 0) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getDischargeEntryBed = async () => {
    const result = await axiosApi.get("/feedback/getdischargeentrybed");
    const { data, success } = result.data;
    if (success === 0) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getProcheckedbedDetail = async () => {
    const result = await axiosApi.get("/feedback/getprocheckbed");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getProcheckCompletedBedDetail = async () => {
    const result = await axiosApi.get("/feedback/getprocheckcompletebed");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

//NOT USING check later 
export const getallHouseKeepingBed = async () => {
    const result = await axiosApi.get("/feedback/getallhkbeds");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

//not using 
export const getLoggedEmpDetail = async (id) => {
    const result = await axiosApi.get(`/feedback/getempdetail/${id}`);
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}
//NOT USING THIS

// export const getAllBedRemarks = async () => {
//     const result = await axiosApi.get("/feedback/getllbedremarks");
//     const { data, success } = result.data;
//     if (success === 0) return warningNofity("Error in fetching Data");
//     return data ? data : [];
// }


export const getallmoudleMaster = async () => {
    const result = await axiosApi.get("/feedback/getallmodulemaster");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getallHkEmployeeDetail = async () => {
    const result = await axiosApi.get("/feedback/getallhkempdtl");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getassetItemMaster = async () => {
    const result = await axiosApi.get("/feedback/getassetitem");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getallroomchecklist = async () => {
    const result = await axiosApi.get("/feedback/getroomchecklist");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}
export const getllhkroomChecklist = async () => {
    const result = await axiosApi.get("/feedback/getallhkactiveitem");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}



export const getallhkroomitems = async () => {
    const result = await axiosApi.get("/feedback/getallhkitem");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}




export const getprobedChecklistDetail = async (id) => {
    return axiosApi.get(`/feedback/getprochecklistdetail/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}


//room assat
export const getallroomassetDetail = async () => {
    const result = await axiosApi.get("/feedback/getroomassetdetail");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getalluserModuleRight = async () => {
    const result = await axiosApi.get("/feedback/getallusermodulemaster");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getCurrentEmpMenu = async (id) => {
    try {
        const res = await axiosApi.post('/feedback/getallmenuitems', { fb_emp_id: id });
        return res.data?.success === 1 ? res.data.data || [] : [];
    } catch (error) {
        console.error("Error fetching menu:", error);
        return []; // Return empty array on error
    }
};


export const getUserModules = async (id) => {
    try {
        const res = await axiosApi.post('/feedback/getallmoduleitems', { fb_emp_id: id });
        return res.data?.success === 1 ? res.data.data || [] : [];
    } catch (error) {
        console.error("Error fetching menu:", error);
        return []; // Return empty array on error
    }
};





export const getallGroupMaster = async () => {
    const result = await axiosApi.get("/feedback/getallgroupmaster");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getallmenumaster = async () => {
    const result = await axiosApi.get("/feedback/getallmenumaster");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getallNewRoomCreationDetail = async () => {
    const result = await axiosApi.get("/feedback/getallnewroomdetail");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getallbedMaster = async () => {
    const result = await axiosApi.get("/feedback/getallbedmaster");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getallRoomDetail = async () => {
    const result = await axiosApi.get("/feedback/getallroomdetail");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getDepartment = async () => {
    return axiosApi.get('/feedback/deparment').then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getfeedbacksubcategory = async (id) => {
    return axiosApi.post('/feedback/getfeedbacksubcategory', {
        fb_category_slno: id
    }).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data ? data : []
        }
    })
}

export const getallfeedbackDetail = async () => {
    return axiosApi.get('/feedback/getallfeedbackDetail').then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data
        }
    })
}


export const fetchFeedbackdtl = async (value) => {
    try {
        const result = await axiosApi.post("/feedback/fetchFeedbackdtl", {
            fdmast_slno: value
        })
        const { data, success } = result.data;
        if (success === 1) return warningNofity("Error in fetching Data")
        return data ? data : []
    } catch (error) {
        warningNofity("Error Occured While Fetching..!")
    }
}



export const FeedbackDetailForDisplay = async (value) => {
    try {
        const result = await axiosApi.post("/feedback/fetchfbdisplay", {
            fdmast_slno: value
        })
        const { data, success } = result.data;
        if (success === 1) return warningNofity("Error in fetching Data")
        return data ? data : []
    } catch (error) {
        warningNofity("Error Occured While Fetching..!")
    }
}


export const fetchCurrentCompany = async () => {
    return axiosApi.get('/feedback/getcurrentCompany').then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data
        }
    })
}


export const getalluserfeedbackAnswers = async (date) => {
    return axiosApi.post('/feedback/getalluserfeedback', {
        current_date: date
    }).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}

export const getallFeedBackCount = async (id) => {
    return axiosApi.get(`/feedback/getfeedbackcount`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        } else {
            return []
        }
    })
}


export const gettotalstarCount = async (id) => {
    return axiosApi.get(`/feedback/getstarcount`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        } else {
            return []
        }
    })
}


export const getCategoryCountDetail = async (id) => {
    return axiosApi.get(`/feedback/getcategorycount`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        } else {
            return []
        }
    })
}


export const getDepartmentSection = async (id) => {
    return axiosApi.get(`/feedback/deparmentsec/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data ? data : []
        }
    })
}


export const getAllhkAssignedBed = async (id) => {
    return axiosApi.get(`/feedback/getallassignedbed/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}


export const gethkcheckbedDetail = async (slno) => {
    try {
        const res = await axiosApi.post('/feedback/gethkcheckdtl', { fb_hk_slno: slno });
        const { data, success } = res.data;
        return success === 2 ? data || [] : [];
    } catch (error) {
        console.log("Error fetching menu:", error);
        return []; // Return empty array on error
    }
}


export const gethkBedDetial = async (slno) => {
    try {
        const res = await axiosApi.post('/feedback/gethkbeddetail', { fb_hk_slno: slno });
        const { data, success } = res.data;
        return success === 2 ? data || [] : [];
    } catch (error) {
        console.log("Error fetching menu:", error);
        return []; // Return empty array on error
    }
}


// house keeeping complaints
export const gethkcomplaintdetail = async (bedslno, depsec, ticketid) => {
    try {
        const res = await axiosApi.post('/feedback/gethkcmpdetail', {
            location: bedslno,
            complaint_deptslno: depsec,
            fb_ticket: ticketid

        });
        const { data, success } = res.data;
        return success === 2 ? data || [] : [];
    } catch (error) {
        console.log("Error fetching Housekeeping Complaints:");
        return []; // Return empty array on error
    }
}

export const getdepassetonly = async (id) => {
    return axiosApi.get(`/feedback/getdepassetonly/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}


export const getallNurseStation = async () => {
    return axiosellider.get('/melioraEllider/nurse').then((res) => {
        const { success, data } = res.data;
        if (success === 1) return []
        if (success === 2) {
            return data ? data : []
        }
    })
}



export const getallNurseStationMeliora = async () => {
    return axiosApi.get('/feedback/nurse').then((res) => {
        const { success, data } = res.data;
        if (success === 1) return []
        if (success === 2) {
            return data ? data : []
        }
    })
}

export const getAllFloorMaster = async () => {
    return axiosApi.get('/floorcreation/view').then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}

export const getallOutlets = async () => {
    return axiosellider.get('/melioraEllider/outlet').then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}
export const getallNurseStationMaster = async () => {
    return axiosApi.get('/feedback/getallnursestation').then((res) => {
        const { success, data } = res.data;
        if (success === 0) return []
        if (success === 2) {
            return data ? data : []
        }
    })
}


export const getDepartmentEmployee = async (id) => {
    return axiosApi.get(`/feedback/departmentemp/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const getBedRemarkDetails = async (id) => {
    return axiosApi.get(`/feedback/getbedremarkDetail/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}

export const getAllComplaintDetail = async () => {
    return axiosApi.get(`/feedback/getallcomplaintdetail`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}


export const getAllcomplaintTypeDetail = async (id) => {
    return axiosApi.get(`/feedback/getallComplaintType/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}


export const getallRoomAssetData = async (id) => {
    return axiosApi.get(`/feedback/getallroomassetdata/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}

export const getComplaintDetail = async (id) => {
    return axiosApi.get(`/feedback/getcomplaintdetail/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}

export const getallemployeeright = async () => {
    const result = await axiosApi.get("/feedback/getallemployeeright");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const DownloadToExcelFile = (data, name) => {
    if (!data || data?.length === 0) {
        warningNofity("No data to export");
        return;
    }

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FeedbackReport");

    // Create buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save to file
    const fileName = `${name}_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`;
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, fileName);
};


export const getFamilyDetails = async (mrdnumber) => {
    try {
        let uppercasetext = mrdnumber?.toUpperCase().trim();

        if (!uppercasetext) {
            warningNofity('Please Enter MRD Number');
            return null;
        }
        const result = await axiosellider.get(`/admission/patientInfo/${uppercasetext}`);
        const { success, data } = result.data;
        if (success === 1) {
            return data;
        } else {
            warningNofity("Please Enter Correct MRD Number!");
            return null;
        }
    } catch (error) {
        warningNofity("Something went wrong while fetching details. Please try again.");
        return null;
    }
};


// utils/base64Url.js

export const safeAtob = (value) => {
    try {
        return value && /^[A-Za-z0-9+/=]+$/.test(value) ? atob(value) : value;
    } catch {
        return value;
    }
};
