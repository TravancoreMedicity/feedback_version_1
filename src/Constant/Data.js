import { format, subMonths, subYears, startOfMonth } from "date-fns";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import vipimage from "../assets/vip.png"


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

