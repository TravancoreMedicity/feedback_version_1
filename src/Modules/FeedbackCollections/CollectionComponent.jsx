import { Box, Typography } from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollectionComponent = ({ name, id }) => {
    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate('/Home/collectiondetail', { state: { name: `${name}`, id: id } })}
            sx={{
                flex: '1 1 calc(33.33% - 24px)', // Adjust width for responsiveness
                minWidth: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
            }}>
            <Box
                sx={{
                    width: '100%',
                    height: 180,
                    backgroundColor: "rgba(var(--bg-card))",
                    border: 0.03,
                    borderColor: "rgba(var(--border-primary))",
                    display: 'flex',
                    alignItems: 'start',
                    borderRadius: 8,
                    flexDirection: "column",
                    p: 2
                }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography level='body-sm' fontWeight={'md'}
                        sx={{
                            fontFamily: 'var(--font-varient)',
                            color: 'rgba(var(--font-primary-white))',
                            fontSize: 20,
                            fontWeight: 600,
                        }} >
                        {name} Feedback
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default CollectionComponent