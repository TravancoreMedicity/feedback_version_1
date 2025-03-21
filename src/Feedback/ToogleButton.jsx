import React, { memo } from "react";
import { Button, Box } from "@mui/material";

const ToggleButton = ({ label, icon, color, clicked }) => {


    const getBorder = () => {
        if (clicked === "yes" && label === "Yes") {
            return "1.5px solid rgba(0, 128, 0, 0.56)";
        } else if (clicked === "no" && label === "No") {
            return "1.5px solid rgba(224, 15, 15, 0.56)";
        }
        return "1px solid white";
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "30px",
                padding: "2px 10px",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                width: "120px",
                justifyContent: "center",
                border: getBorder(),
                filter: clicked === 'yes' && label === "Yes" ? `drop-shadow(0px 0px 15px rgba(4, 154, 46, 0.7))` : clicked === 'no' && label === "No" ? `drop-shadow(0px 0px 15px rgba(178, 0, 0, 0.46))` : '',
            }}
        >
            {icon}
            < Button
                sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    textTransform: "none",
                    color: color,
                    fontFamily: "fantasy"
                }}
            >
                {label}
            </Button >
        </Box >
    );
};

export default memo(ToggleButton);
