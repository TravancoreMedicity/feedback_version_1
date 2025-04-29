import { Box } from "@mui/joy";
import React, { memo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ totalRating, size }) => {

    const fullStars = Math?.floor(totalRating); // Number of full stars
    const decimalPart = totalRating - fullStars; // Decimal part of rating
    // Determine whether to show a half-star
    const halfStar = decimalPart >= 0.1 ? <FaStarHalfAlt key="half" color="#D84B9A" size={size ? size : ''} /> : null;
    // Number of empty stars to make total 5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <Box sx={{ fontSize: 24, display: 'flex' }}>
            {Array.from({ length: fullStars }, (_, i) => <FaStar key={i} color="#D84B9A" size={size ? size : ''} />)}
            {halfStar}
            {Array.from({ length: emptyStars }, (_, i) => <FaRegStar key={`empty-${i}`} color="#D84B9A" size={size ? size : ''} />)}
        </Box>
    );
};

export default memo(StarRating);
