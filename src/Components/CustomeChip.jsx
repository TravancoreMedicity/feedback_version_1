import React, { memo } from "react";
import { Button, Box } from "@mui/material";

const CustomeChip = (
    { label, check, color, onClick }
) => {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                // backgroundColor: '#f5f3f4',
                // bgcolor: '#fff0f3'
                backgroundColor: 'rgba(var(--bg-common))',
                borderRadius: "30px",
                // padding: "2px 10px",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                minWidth: "120px",
                justifyContent: "center",
                height: 25,
                border: check ? `1px solid ${color}` : "rgba(var(--border-primary))",
                filter: check ? `drop-shadow(0px 0px 3px ${color})` : ``
            }}
        >
            {/* {icon} */}
            < Button
                onClick={onClick}
                sx={{
                    fontSize: 11,
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontWeight: 600,
                    textTransform: "none",
                }}
            >
                {label}
            </Button >
        </Box >
    );
};

export default memo(CustomeChip);
