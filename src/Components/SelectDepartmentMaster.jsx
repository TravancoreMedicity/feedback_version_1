import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getDepartment } from '../Function/CommonFunction'

const SelectDepartmentMaster = ({ handleChange, value, label }) => {


    const { isLoading, data, error } = useQuery({
        queryKey: ['fetchdeapartment'],
        queryFn: () => getDepartment(),
    })

    const formattedData = data ?
        data?.map((dep) => ({
            value: dep.dept_id,
            label: dep.dept_name,
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

export default memo(SelectDepartmentMaster) 