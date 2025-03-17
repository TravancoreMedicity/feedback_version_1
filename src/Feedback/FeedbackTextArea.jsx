import { Box, Textarea, Typography } from '@mui/joy'
import React from 'react'

const FeedbackTextArea = ({count,quest}) => {
  return (
    <Box sx={{ px: 1, width: '100%', }}>
                <Typography
                    sx={{
                        fontSize: { xs: 12, sm: 16, md: 18, lg: 22 },
                        fontWeight: 600,
                        ml: 1
                    }}><span style={{ marginRight: 10 }}>{count}.</span>{quest}</Typography>
                <Textarea sx={{ width: '100%', height: 'auto', mb: 1, pb: 2, fontSize: { xs: 11, sm: 16, md: 18, lg: 22 } }} minRows={2} placeholder="Feedbacks" />
            </Box>
  )
}

export default FeedbackTextArea