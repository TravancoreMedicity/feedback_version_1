import { getYear, format } from 'date-fns'
import { axiosApi, axiosellider } from '../Axios/Axios';
import { warningNofity } from '../Constant/Constant';

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
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}

export const getBedRemarkStatus = async () => {
    const result = await axiosApi.get("/feedback/getberremarkstatus");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


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





export const getAllBedRemarks = async () => {
    const result = await axiosApi.get("/feedback/getllbedremarks");
    const { data, success } = result.data;
    if (success === 0) return warningNofity("Error in fetching Data");
    return data ? data : [];
}


export const getallmoudleMaster = async () => {
    const result = await axiosApi.get("/feedback/getallmodulemaster");
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

///

export const getDepartmentSection = async (id) => {
    return axiosApi.get(`/feedback/deparmentsec/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data ? data : []
        }
    })
}


export const getallNurseStation = async () => {
    return axiosellider.get('/melioraEllider/nurse').then((res) => {
        const { success, data } = res.data;
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

export const getallemployeeright = async () => {
    const result = await axiosApi.get("/feedback/getallemployeeright");
    const { data, success } = result.data;
    if (success === 1) return warningNofity("Error in fetching Data");
    return data ? data : [];
}