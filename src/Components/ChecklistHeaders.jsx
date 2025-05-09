import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { LogOut } from 'iconoir-react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const ChecklistHeaders = ({ name, icon, value, setValue, searchvalue }) => {

    const isMdUp = useMediaQuery('(min-width: 960px)');
    const isSmallScreen = useMediaQuery('(min-width: 760px)');
    const navigate = useNavigate()
    const [showsearch, setShowSearch] = useState(false);

    const handleClick = useCallback(() => {
        setShowSearch(prev => !prev)
    }, [setShowSearch]);
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }} className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer" >
            {icon}
            <Typography
                level='body-sm'
                fontWeight={'md'}
                sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: { xs: 17, sm: 22 },
                    fontWeight: 700,
                    mt: 2
                }}>
                {name}
            </Typography>
            {
                value === 2 && <Box sx={{
                    width: { xs: 150, sm: 200 },
                    height: 30,
                    position: "absolute",
                    right: showsearch && !isMdUp ? 35 : 0,

                }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <SearchTwoToneIcon
                            onClick={handleClick}
                            className='text-iconprimary cursor-pointer '
                            sx={{
                                right: !showsearch && !isMdUp ? 40 : 0,
                                position: showsearch ? 'relative' : 'absolute',
                                mt: 2
                            }} />
                        {
                            showsearch &&
                            <input
                                className="border-[0.1rem] border-iconprimary p-0 cursor-pointer focus:border-iconprimary-500 outline-none"
                                type="text"
                                value={searchvalue}
                                maxLength={8}
                                onChange={(e) => setValue(e.target.value?.toUpperCase())}
                                style={{
                                    width: '90%',
                                    marginTop: 14,
                                    borderRadius: 4,
                                    textTransform: 'uppercase',
                                    fontFamily: 'var(--font-varient)',
                                    fontWeight: 600,
                                    fontSize: !isSmallScreen ? 12 : 15
                                }} />
                        }
                    </Box>
                </Box>
            }

            {
                value !== 1 && !isMdUp &&
                <Box
                    sx={{
                        right: 0,
                        position: 'absolute',
                        mt: 2
                    }}
                    onClick={() => navigate(-1)} >
                    <LogOut className='text-iconprimary cursor-pointer mr-3' />
                </Box>
            }


        </Box>
    )
}

export default memo(ChecklistHeaders)