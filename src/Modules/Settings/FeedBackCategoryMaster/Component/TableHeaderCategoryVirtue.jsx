import React from 'react'
import { memo } from 'react'
import { Box } from '@mui/joy'


const TableHeaderCategoryVirtue = () => {
    return (
        <tr className="h-10 bg-tablehead/95 border-tableborder border-dashed  ">
            <th>
                <Box
                    className="flex  pl-2 w-[10rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)',  }}
                >
                    Slno
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center  pl-2 w-[20rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)',}}
                >
                    Request Date
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[20rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)', }}>
                    Nursing Station
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[20rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Block Name
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[20rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Bed Detail
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[20rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Marked As
                </Box>
            </th>

        </tr>
    )
}

export default memo(TableHeaderCategoryVirtue) 