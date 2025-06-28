import { format, subMonths, subYears, startOfMonth } from "date-fns";



export const loginType = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Super Admin' },
]

export const userStatus = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' },
    { value: 3, label: 'Suspented' }
]

export const passwordValidity = [
    { value: 1, label: '1' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
]

export const signInLimit = [
    { value: 1, label: '0' },
    { value: 2, label: '1' },
    { value: 3, label: '2' },
    { value: 4, label: '3' },
    { value: 5, label: '5' },
]

export const DocumentTypeMainMaster = [
    {
        value: '1',
        label: 'Quilon Medical Trust',
    },
    {
        value: '2',
        label: 'Royal Medical Trust',
    },
    {
        value: '3',
        label: 'Quilon Super Speciality Hospital and Institute PVT LTD',
    },
    {
        value: '4',
        label: 'Travancore Medical Foundation For Oragan Transplantation',
    },
]

export const DocSubTypeMaster = [
    {
        value: 1,
        label: 'Trust / Company Common Doc',
    },
    {
        value: 2,
        label: 'Institute Doc ',
    },
]

export const IntituteMaster = [
    { value: 1, label: 'Travancore Medical Collge' },
    { value: 2, label: 'Travancore Dental Collge' },
    { value: 3, label: 'Travancore Collge of Allied Health Sciences' },
    { value: 4, label: 'Travancore School of Allied Health Sciences' },
    { value: 5, label: 'Travancore Collge of Nursing' },
]

export const courseMaster = [
    { value: 1, label: 'MBBS' },
    { value: 2, label: 'BDS' },
    { value: 3, label: 'BSc Nursing' },
    { value: 4, label: 'Bsc Optometry' },
]

export const categorymaster = [
    { value: 1, label: 'Category 1' },
    { value: 2, label: 'Category 2' },
    { value: 3, label: 'Category 3' },
]


export const commonStatus = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' }
]




export const timeFilters = [
    {
        label: "Last Month",
        value: format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
        duration: "1 MONTH"
    },
    {
        label: "Last 3 Months",
        value: format(subMonths(new Date(), 3), "yyyy-MM-dd"),
        duration: "3 MONTHS"
    },
    {
        label: "Last 6 Months",
        value: format(subMonths(new Date(), 6), "yyyy-MM-dd"),
        duration: "6 MONTHS"
    },
    {
        label: "Last 9 Months",
        value: format(subMonths(new Date(), 9), "yyyy-MM-dd"),
        duration: "9 MONTHS"
    },
    {
        label: "One Year",
        value: format(subYears(new Date(), 1), "yyyy-MM-dd"),
        duration: "1 YEAR"
    },
    {
        label: "Past Two Years",
        value: format(subYears(new Date(), 2), "yyyy-MM-dd"),
        duration: "2 YEARS"
    },
];

export const rooms = [
    { roomNumber: "AB101P", present: "Y" },
    { roomNumber: "AB102P", present: "N" },
    { roomNumber: "AB103P", present: "Y" },
    { roomNumber: "AB104P", present: "N" },
    { roomNumber: "AB105P", present: "Y" },
    { roomNumber: "AB106P", present: "N" },
    { roomNumber: "AB107P", present: "Y" },
    { roomNumber: "AB108P", present: "N" },
    { roomNumber: "AB109P", present: "Y" },
    { roomNumber: "AB110P", present: "N" },
    { roomNumber: "AB111P", present: "Y" },
    { roomNumber: "AB112P", present: "N" },
    { roomNumber: "AB113P", present: "Y" },
    { roomNumber: "AB114P", present: "N" },
    { roomNumber: "AB115P", present: "Y" }
];



export const blockSet1 = [
    { id: 1, name: "A Block" },
    { id: 2, name: "B Block" },
    { id: 3, name: "C Block" },
    { id: 4, name: "D Block" },
    { id: 5, name: "E Block" },
    { id: 6, name: "F Block" }
];

export const blockSet2 = [
    { id: 7, name: "H Block" },
    { id: 8, name: "I Block" },
    { id: 9, name: "J Block" }
];

export const blockSet3 = [
    { id: 10, name: "K Block" },
    { id: 11, name: "Female Medical" },
    { id: 12, name: "Male Medical" },
    { id: 13, name: "Pediatric Ward" },
    { id: 14, name: "ICU" }
];


export const ItdepId = 1;
export const MtdepId = 17;
export const BmdepId = 36;

// export const departments = [
//     { dep_id: 1, name: 'IT',custodian_id:3 },
//     { dep_id: 17, name: 'MAINTENACE',custodian_id:3 },
//     { dep_id: 36, name: 'BIOMEDICAL',custodian_id:3 },
//     { dep_id: 43, name: 'OPERATIONS',custodian_id:3 },
//     { dep_id: 19, name: 'HOUSE KEEPING' ,custodian_id:3},
// ]


export const Indicator = [
    { name: "Occupied", color: "rgba(19, 112, 241, 0.68)" }, // Blue
    { name: "Multiple Occupancy", color: "rgba(207, 118, 133, 0.96)" }, // Pink
    { name: "Discharged", color: "rgb(239, 131, 15)" }, // Yellow
    { name: "Not Ready", color: "rgba(235, 18, 18, 0.84)" }, // Red
    { name: "On Hold", color: "rgb(72, 54, 134)" }, // White
    { name: "Fumigation", color: "rgb(53, 170, 193)" }, // Brown
    { name: "Renovation", color: "rgb(40, 185, 234)" }, // Pale Blue
    { name: "Available", color: "#8FD14F" }, // Green
    { name: "Bystander", color: "rgb(253, 65, 185)" },
    { name: "Blocked", color: "rgba(200, 0, 180, 0.8)" }, // LightWhite (Close to White Smoke)
];

export const predefinedCategories = [
    { fb_category_name: 'CONTENTMENT-OVERALL RATING', fb_category_slno: 1 },
    { fb_category_name: 'RESPONSIVENESS', fb_category_slno: 2 },
    { fb_category_name: 'TIMELINESS', fb_category_slno: 3 },
    { fb_category_name: 'FACILITY ( ENVIRONMENT )', fb_category_slno: 4 },
    { fb_category_name: 'CLEANLINESS ( ENVIRONMENT )', fb_category_slno: 5 },
    { fb_category_name: 'RECOMMENDATION', fb_category_slno: 6 },
];


export const patientData = [
    {
        id: 1,
        admissionDate: "24-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500021901",
        recordId: "R-00111022",
        name: "Mr Rajan P",
        age: "68 Yr",
        gender: "Male",
        addressLine1: "Raj Bhavan",
        addressLine2: "Kadappakada",
        addressLine3: "Kollam",
        department: "Cardiology",
        doctor: "Dr. Manu Mathew (Reg.30012)",
        insurance: "",
        ward: "7FP",
        bed: "FM112-A",
        contact: "9847223345",
        status: "Recovered"
    },
    {
        id: 2,
        admissionDate: "27-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500021988",
        recordId: "E-00200556",
        name: "Mrs Mini Thomas",
        age: "59 Yr",
        gender: "Female",
        addressLine1: "Grace Villa",
        addressLine2: "Punalur Town",
        addressLine3: "Kollam",
        department: "Neurology",
        doctor: "Dr. Anil Kumar",
        insurance: "",
        ward: "OPN",
        bed: "C011AC",
        contact: "9447721233",
        status: "Recovered"
    },
    {
        id: 3,
        admissionDate: "29-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500022051",
        recordId: "Q-00340012",
        name: "Mr Suresh Babu",
        age: "62 Yr",
        gender: "Male",
        addressLine1: "Suresh Nivas",
        addressLine2: "Mulavana",
        addressLine3: "Karunagappally",
        department: "General Surgery",
        doctor: "Dr. Ajith R",
        insurance: "",
        ward: "MGS",
        bed: "W021ST",
        contact: "9633777212",
        status: "Recovered"
    },
    {
        id: 4,
        admissionDate: "30-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500022130",
        recordId: "D-00100876",
        name: "Mrs Leela Devi",
        age: "71 Yr",
        gender: "Female",
        addressLine1: "Leela Bhavanam",
        addressLine2: "Kottiyam",
        addressLine3: "Kollam",
        department: "Geriatrics",
        doctor: "Dr. Rekha R. (Reg.30110)",
        insurance: "SBI LIFE",
        ward: "GGW",
        bed: "B108NR",
        contact: "9495001122",
        status: "Recovered"
    },
    {
        id: 5,
        admissionDate: "28-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500021877",
        recordId: "P-00257033",
        name: "Miss Neethu R",
        age: "22 Yr",
        gender: "Female",
        addressLine1: "Neethu Mandiram",
        addressLine2: "Mayyanad",
        addressLine3: "Kollam",
        department: "Psychiatry",
        doctor: "Dr. Nirmal K",
        insurance: "",
        ward: "7FM",
        bed: "FM114-B",
        contact: "9961234599",
        status: "Recovered"
    },
    {
        id: 6,
        admissionDate: "01-May-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500022412",
        recordId: "M-00110459",
        name: "Mr Anand P",
        age: "44 Yr",
        gender: "Male",
        addressLine1: "Anand Nivas",
        addressLine2: "Eravipuram",
        addressLine3: "Kollam",
        department: "Orthopaedics",
        doctor: "Dr. Varghese C",
        insurance: "",
        ward: "ORTHW",
        bed: "OR-015",
        contact: "9847032134",
        status: "Recovered"
    },
    {
        id: 7,
        admissionDate: "26-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500021732",
        recordId: "R-00105421",
        name: "Mrs Jameela Banu",
        age: "53 Yr",
        gender: "Female",
        addressLine1: "Banu Manzil",
        addressLine2: "Chavara South",
        addressLine3: "Puthenthura",
        department: "Pulmonology",
        doctor: "Dr. Arya N.",
        insurance: "",
        ward: "SIDEB",
        bed: "B012AC",
        contact: "9745120093",
        status: "Recovered"
    },
    {
        id: 8,
        admissionDate: "25-Apr-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500021689",
        recordId: "Q-00247600",
        name: "Mr Krishnakumar",
        age: "58 Yr",
        gender: "Male",
        addressLine1: "Krishna Sadanam",
        addressLine2: "Pattazhy",
        addressLine3: "Kollam",
        department: "Nephrology",
        doctor: "Dr. Ramesh P. (Reg.30300)",
        insurance: "",
        ward: "OPN",
        bed: "N009NR",
        contact: "9847667788",
        status: "Recovered"
    },
    {
        id: 9,
        admissionDate: "01-May-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500022450",
        recordId: "P-00100581",
        name: "Mrs Manju R",
        age: "38 Yr",
        gender: "Female",
        addressLine1: "Manju Bhavanam",
        addressLine2: "Elampalloor",
        addressLine3: "Kollam",
        department: "Gynaecology",
        doctor: "Dr. Sheela V",
        insurance: "",
        ward: "3FPW",
        bed: "K3002",
        contact: "9567338899",
        status: "Recovered"
    },
    {
        id: 10,
        admissionDate: "02-May-2025",
        dischargeDate: "02-May-2025",
        patientId: "2500022458",
        recordId: "J-00001265",
        name: "Mr Aslam A",
        age: "26 Yr",
        gender: "Male",
        addressLine1: "Aslam Manzil",
        addressLine2: "Tangasseri",
        addressLine3: "Kollam",
        department: "ENT",
        doctor: "Dr. Anup R",
        insurance: "",
        ward: "ENT-ICU",
        bed: "E101",
        contact: "9734321122",
        status: "Recovered"
    }
];


export const ratings = [
  { stars: 5, value: 80 },
  { stars: 4, value: 60 },
  { stars: 3, value: 40 },
  { stars: 2, value: 20 },
  { stars: 1, value: 10 },
];
