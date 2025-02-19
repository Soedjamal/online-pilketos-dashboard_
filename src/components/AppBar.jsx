import { Typography } from '@mui/material'
import React from 'react'


const AppBar = ({ title }) => {
    return (
        <div>
            <Typography sx={{ mt: 5 }} variant="h4" gutterBottom>
                {title}
            </Typography>
        </div>
    )
}

export default AppBar