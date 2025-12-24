import DOMPurify from "dompurify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { format, differenceInYears, differenceInMonths, differenceInDays, parseISO } from "date-fns";


export const screenHeight = window.innerHeight;
export const screenWidth = window.innerWidth;


export const baseColor = {
    primary: "#1A5319",
    secondary: "#508D4E",
    primarylight: "#80AF81",
    secondarylight: "#D6EFD8",
    primaryfont: "#001C30",
    secondaryfont: "#000000",
    ultralight: "#478A62",
    fontPink: "#D10363",
    fontGrey: '#483838',
    backGroundColor: "#e9fcf6",
    backGroundFont: "#119c75",
    yellowfont: '#bbc20a',
    headerBgColor: '#0E2C0D'
}

export const customFontSize = {
    xs: '1rem',
    sm: '1rem',
    md: '1rem',
    lg: '1rem',
    xl: '1.1rem'
}

export const customInputHeight = {
    "--Input-minHeight": {
        xs: "30px",
        sm: "30px",
        md: "32px",
        lg: "30px",
        xl: "33px",
    },
    "&.MuiInput-root": {
        "--Input-focusedHighlight": 'none',
        "--Input-focusedShadow": 'none',
        "--Input-focusedThickness": '1.1px',
    },
    boxShadow: 'none',
}

export const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const isValidMobileNumber = (mobile) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
};

export const isValidOTPMobileNumber = (mobile) => {
    const regex = /^\d{12}$/;
    return regex.test(mobile);
};

export const removeEmojis = (inputText) => {
    return inputText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B06}\u{2194}\u{1F004}-\u{1F0CF}]/gu, '');
}

export const validateEnglishInput = (english) => {
    const englishRegex = /^[A-Za-z0-9\s,.\-?!():;]*$/;
    if (!englishRegex.test(english)) {
        return false;
    }
    return true;
};

// utils/validateMalayalam.js
export const validateMalayalamInput = (malayalam) => {
    // Regular expression to check for Malayalam characters
    const malayalamRegex = /^[\u0D00-\u0D7F\s,.\-?!()]*$/; // Allows Malayalam characters and common punctuation
    if (!malayalamRegex.test(malayalam)) {
        return false; // Return false if validation fails
    }
    return true; // Return true if validation passes
};


export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    /*
     * -> Minimum 6 characters
     * -> At least one uppercase letter
     * -> At least one lowercase letter
     * -> At least one number
     * -> At least one special character
     * -> Password must contain at least one letter and one number
     */
    return passwordRegex.test(password);
};

export const succesNofity = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const errorNofity = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const warningNofity = (message) => toast.warning(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const infoNofity = (message) => toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const normalizeDate = (dateStr) => {
    try {
        return format(new Date(dateStr), 'yyyy-MM-dd');
    } catch {
        return '';
    }
};


export const employeeID = () => {
    const localData = localStorage.getItem("app_auth");
    const employeeID = atob(JSON.parse(localData)?.authNo);
    return employeeID;
};


export const EmpauthId = () => {
    const localData = localStorage.getItem("app_auth");
    const EmpauthId = atob(JSON.parse(localData)?.authId);
    return EmpauthId;
};


export const CleanHtmlString = (htmlString) => {
    // First, decode HTML entities (e.g., &lt; becomes <)
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const decodedString = tempElement.textContent || tempElement.innerText || '';

    // Remove HTML tags
    let cleaned = decodedString.replace(/<[^>]*>/g, '');
    // Replace &nbsp; (non-breaking spaces) with regular spaces
    cleaned = cleaned.replace(/&nbsp;/g, ' ');
    // Replace multiple spaces with a single space
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
};




export const getAgeFromDOB = (dobString) => {
    if (!dobString) return "";

    // Convert "YYYY-MM-DD HH:mm:ss" → ISO
    const dob = parseISO(dobString.replace(" ", "T"));
    const today = new Date();

    const years = differenceInYears(today, dob);

    // Date after removing full years
    const afterYears = new Date(
        today.getFullYear() - years,
        today.getMonth(),
        today.getDate()
    );

    const months = differenceInMonths(afterYears, dob);

    // Date after removing full months
    const afterMonths = new Date(
        afterYears.getFullYear(),
        afterYears.getMonth() - months,
        afterYears.getDate()
    );

    const days = differenceInDays(afterMonths, dob);

    return `${years}Y ${months}M ${days}D`;
};


export const getAgeInYears = (dobString) => {
    if (!dobString) return 0;

    // Convert "YYYY-MM-DD HH:mm:ss" → ISO
    const dob = parseISO(dobString.replace(" ", "T"));
    const today = new Date();

    return differenceInYears(today, dob);
};