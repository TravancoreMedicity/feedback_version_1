import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";
import AdbIcon from '@mui/icons-material/Adb';
import { warningNofity } from "../Constant/Constant";

export default function FloatingRefreshButton({
    loading,
    onRefresh,
    position = "bottomRight",
    tooltip = "Refresh",
    size = 52,
    color,
}) {


    const handleClick = async () => {
        if (!onRefresh) return;
        try {
            await onRefresh();   // IMPORTANT
        } catch (err) {
            warningNofity("Refresh action failed");
        }
    };

    const positions = {
        bottomRight: { right: 20, bottom: 22 },
        bottomLeft: { left: 20, bottom: 22 },
        topRight: { right: 20, top: 20 },
        topLeft: { left: 20, top: 20 },
    };

    const posStyle = positions[position] || positions.bottomRight;

    return (
        <div
            aria-hidden={false}
            style={{
                position: "fixed",
                zIndex: 1400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...posStyle,
            }}
        >
            <Tooltip size="sm" placement="top" title={tooltip}>
                <IconButton
                    size="lg"
                    onClick={handleClick}
                    sx={{
                        width: size,
                        height: size,
                        borderRadius: "16px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                        backgroundColor: "rgba(var(--bg-card))",
                        border: 0.03,
                        borderColor: "rgba(var(--border-primary))",
                    }}
                    aria-label={tooltip}>
                    {loading ? (
                        // small spinner overlay
                        <CircularProgress determinate={false} size="sm" thickness={2} />
                    ) : (
                        <AdbIcon sx={{ fontSize: 22, color: color || 'rgba(var(--icon-primary))' }} />
                    )}
                </IconButton>

            </Tooltip>
        </div>
    );
}
