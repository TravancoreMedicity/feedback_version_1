import { Box, Typography } from '@mui/joy';
import React, { memo, useCallback, useRef } from 'react';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';

const HkRoomComponent = ({ roomnumber, data, HandleBedAssign, refetch, FetchAllBlockedBed }) => {
    const boxRef = useRef(null);

    const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const handleClick = useCallback(() => {
        HandleBedAssign(data)
        const div = boxRef.current;
        if (!div) return;

        const poof = document.createElement("span");
        poof.style = `
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            width: ${div.offsetWidth}px;
            height: ${div.offsetHeight}px;
            pointer-events: none;
        `;
        div.parentElement.append(poof);

        const createParticle = () => {
            const part = document.createElement("span");
            part.style = `
                position: absolute;
                width: 15px;
                height: 15px;
                background-color: rgba(213, 82, 154, 0.8);
                left: 50%;
                top: 50%;
                translate: -50% -50%;
                border-radius: 50%;
            `;
            poof.appendChild(part);
            return part.animate(
                [{
                    transform: `translate(${rand(-200, 200)}px, ${rand(-200, 200)}px) scale(0.001)`,
                    opacity: 0,
                }],
                {
                    duration: 1000,
                    easing: 'ease',
                    fill: 'forwards',
                }
            );
        };

        const animations = [
            createParticle(), createParticle(), createParticle(), createParticle(),
            createParticle(), createParticle(), createParticle(), createParticle(),
            createParticle(), createParticle(), createParticle(), createParticle(),
            createParticle(), createParticle(), createParticle(), createParticle()
        ];

        animations.unshift(
            div.animate([{ transform: 'scale(0)', opacity: 0 }], {
                duration: 250,
                fill: 'forwards',
            })
        );

        Promise.all(animations.map((a) => a?.finished)).then(() => {
            div.remove();
            poof.remove();

            //Refeching data after the animation completes
            refetch()
            FetchAllBlockedBed()

        });
    }, [data, HandleBedAssign, FetchAllBlockedBed, refetch]);


    return (
        <Box
            onClick={handleClick}
            sx={{
                width: { xs: 140, sm: 155 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            <Box
                ref={boxRef}
                sx={{
                    width: '100%',
                    height: { xs: 45, sm: 60 },
                    backgroundColor: 'rgba(var(--bg-common))',
                    border: 0.03,
                    borderColor: 'rgba(var(--border-primary))',
                    display: 'flex',
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        fontSize: { xs: 10, sm: 12 },
                        lineHeight: 1,
                        border: 0.03,
                        borderColor: 'rgba(var(--border-primary))',
                        backgroundColor: 'rgba(213, 82, 154, 0.8)',
                        px: 0.6,
                        fontFamily: 'var(--font-varient)',
                        color: 'White',
                        fontWeight: 900,
                        py: 0.1,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                    }}
                >
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>B</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>E</Box>
                    <Box sx={{ p: 0, m: 0, lineHeight: 1 }}>D</Box>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <HotelOutlinedIcon
                        style={{
                            fontSize: { xs: 12, sm: 27 },
                            color: 'rgba(var(--font-primary-white))',
                        }}
                    />
                    <Typography
                        level="body-sm"
                        fontWeight={'md'}
                        sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: { xs: 10, sm: 12 },
                            fontWeight: 900,
                            ml: 1,
                        }}
                    >
                        {roomnumber}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(HkRoomComponent);
