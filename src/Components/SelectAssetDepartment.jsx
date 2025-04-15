import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getAllComplaintDetail } from '../Function/CommonFunction'

const SelectAssetDepartment = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["complaintdetail"],
        queryFn: () => getAllComplaintDetail(),
        staleTime: Infinity
    });

    const formattedData = data ?
        data?.map((item) => ({
            value: Number(item?.complaint_dept_slno),
            label: item?.complaint_dept_name,
        }))
        : [];

    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={formattedData}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectAssetDepartment) 