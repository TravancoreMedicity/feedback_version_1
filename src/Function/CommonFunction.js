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
    try {
        const result = await axiosApi.get("/feedback/getallCategories");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching feedback categories:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};

export const allfeedbacksubCategory = async () => {
    try {
        const result = await axiosApi.get("/feedback/getallsubCategories");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching all feedback subcategories:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};


export const allfeedbackcollection = async () => {
    try {
        const result = await axiosApi.get("/feedback/allfeedbackcollection");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data allfeedbackcollection");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching all feedback collections:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};


//change
export const getallfeedbackMaster = async () => {
    try {
        const result = await axiosApi.get("/feedback/getallfeedback");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching feedback master:", error);
        warningNofity("Server error while fetching data getallfeedbackMaster");
        return [];
    }
};

export const getallpremdetail = async () => {
    try {
        const result = await axiosApi.get("/feedback/premdetail");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching feedback master:", error);
        warningNofity("Server error while fetching data getallfeedbackMaster");
        return [];
    }
};


export const getNsLastUpdteDate = async () => {
    try {
        const result = await axiosApi.get("/feedback/getlastnsupdate");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching feedback master:", error);
        warningNofity("Server error while fetching data getallfeedbackMaster");
        return [];
    }
};

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
    try {
        const result = await axiosApi.get("/feedback/getberremarkstatus");
        const { data, success } = result.data;

        if (success === 0) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching bed remark status:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};



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
    try {
        const result = await axiosApi.get("/feedback/getallmodulemaster");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data dddd");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching module master data:", error);
        warningNofity("Server error while fetching data getallmoudleMaster");
        return [];
    }
};

// export const getallHkEmployeeDetail = async () => {
//     try {
//         const result = await axiosApi.get("/feedback/getallhkempdtl");
//         const { data, success } = result.data;

//         if (success !== 2) {
//             warningNofity("Error in fetching Data");
//             return [];
//         }

//         return data || [];
//     } catch (error) {
//         console.error("Error fetching HK employee details:", error);
//         warningNofity("Server error while fetching data getallHkEmployeeDetail");
//         return [];
//     }
// };

export const getallHkEmployeeDetail = async () => {
    const result = await axiosApi.get("/feedback/getallhkempdtl");
    const { data, success } = result.data;
    if (success !== 2) {
        warningNofity("Error in fetching Data");
        return [];
    }
    return data || [];
};


export const getassetItemMaster = async () => {
    try {
        const result = await axiosApi.get("/feedback/getassetitem");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching asset item master:", error);
        warningNofity("Server error while fetching data getassetItemMaster");
        return [];
    }
};


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
    try {
        const result = await axiosApi.get("/feedback/getallusermodulemaster");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching user module rights:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};


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
    try {
        const result = await axiosApi.get("/feedback/getallgroupmaster");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching group master data:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};


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

//change 3
export const getDepartment = async () => {
    try {
        const res = await axiosApi.get('/feedback/deparment');
        const { success, data } = res.data;

        if (success === 1) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
    }
};

//change 1
export const getfeedbacksubcategory = async (id) => {
    try {
        if (!id) return [];

        const res = await axiosApi.post('/feedback/getfeedbacksubcategory', {
            fb_category_slno: id,
        });

        const { success, data } = res.data;

        if (success === 1 && data) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching feedback subcategory:", error);
        return [];
    }
};




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
        if (success === 1) return warningNofity("Error in fetching Data fetchFeedbackdtl")
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

// change 4
export const fetchCurrentCompany = async () => {
    try {
        const res = await axiosApi.get('/feedback/getcurrentCompany');
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching current company:", error);
        return [];
    }
};


//change 5
export const getalluserfeedbackAnswers = async (date) => {
    try {
        if (!date) return [];

        const res = await axiosApi.post('/feedback/getalluserfeedback', {
            current_date: date,
        });

        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching user feedback answers:", error);
        return [];
    }
};

// change 6
export const getallFeedBackCount = async (id) => {
    try {
        const res = await axiosApi.get('/feedback/getfeedbackcount');
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching feedback count:", error);
        return [];
    }
};


// change 7
export const gettotalstarCount = async (id) => {
    try {
        const res = await axiosApi.get('/feedback/getstarcount');
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching total star count:", error);
        return [];
    }
};

// change 8
export const getCategoryCountDetail = async (id) => {
    try {
        // if (!id) {
        //     console.warn("getCategoryCountDetail called without an id");
        //     return []; // safe default when id is missing
        // }

        const res = await axiosApi.get('/feedback/getcategorycount');
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching category count detail:", error);
        return [];
    }
};

// change 9
export const getDepartmentSection = async (id) => {
    try {
        if (!id) {
            console.warn("getDepartmentSection called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/deparmentsec/${id}`);
        const { success, data } = res.data;

        if (success === 1) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching department section:", error);
        return [];
    }
};


// change 10
export const getAllhkAssignedBed = async (id) => {
    try {
        if (!id) {
            console.warn("getAllhkAssignedBed called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/getallassignedbed/${id}`);
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching all assigned beds:", error);
        return [];
    }
};

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
    try {
        if (!id) {
            console.warn("getdepassetonly called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/getdepassetonly/${id}`);
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching department asset only:", error);
        return [];
    }
};



export const getallNurseStation = async () => {
    try {
        const res = await axiosellider.get('/melioraEllider/nurse');
        const { success, data } = res.data;
        if (success === 1) {
            // No data found or some specific condition
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error fetching nurse stations:", error);
        return [];
    }
};


export const getallNurseStationMeliora = async () => {
    try {
        const res = await axiosApi.get('/feedback/nurse');
        const { success, data } = res.data;

        if (success === 1) {
            // No data found
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error fetching nurse stations (Meliora):", error);
        return [];
    }
};


export const getAllFloorMaster = async () => {
    try {
        const res = await axiosApi.get('/floorcreation/view');
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        }

        return [];
    } catch (error) {
        console.error("Error fetching floor master data:", error);
        return [];
    }
};


export const getallOutlets = async () => {
    return axiosellider.get('/melioraEllider/outlet').then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data ? data : []
        }
    })
}


export const getallNurseStationMaster = async () => {
    try {
        const res = await axiosApi.get('/feedback/getallnursestation');
        const { success, data } = res.data;

        if (success === 0) {
            // No data found
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error fetching all nurse stations:", error);
        return [];
    }
};



export const getDepartmentEmployee = async (id) => {
    try {
        if (!id) {
            console.warn("getDepartmentEmployee called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/departmentemp/${id}`);
        const { success, data } = res.data;

        if (success === 1) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching department employees:", error);
        return [];
    }
};


export const getBedRemarkDetails = async (id) => {
    try {
        if (!id) {
            console.warn("getBedRemarkDetails called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/getbedremarkDetail/${id}`);
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching bed remark details:", error);
        return [];
    }
};


export const getAllComplaintDetail = async () => {
    try {
        const res = await axiosApi.get('/feedback/getallcomplaintdetail');
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching complaint details:", error);
        return [];
    }
};



export const getAllcomplaintTypeDetail = async (id) => {
    try {
        if (!id) {
            console.warn("getAllcomplaintTypeDetail called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/getallComplaintType/${id}`);
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching complaint type details:", error);
        return [];
    }
};


export const getallRoomAssetData = async (id) => {
    try {
        if (!id) {
            console.warn("getallRoomAssetData called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/getallroomassetdata/${id}`);
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching room asset data:", error);
        return [];
    }
};


export const getComplaintDetail = async (id) => {
    try {
        if (!id) {
            console.warn("getComplaintDetail called without an id");
            return [];
        }

        const res = await axiosApi.get(`/feedback/getcomplaintdetail/${id}`);
        const { success, data } = res.data;

        if (success === 2) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching complaint detail:", error);
        return [];
    }
};


export const getallemployeeright = async () => {
    try {
        const result = await axiosApi.get("/feedback/getallemployeeright");
        const { data, success } = result.data;

        if (success !== 2) {
            warningNofity("Error in fetching Data");
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching employee rights:", error);
        warningNofity("Server error while fetching data");
        return [];
    }
};



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
