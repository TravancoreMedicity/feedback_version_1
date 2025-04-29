import React from 'react'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const SelectDepartmentSec = ({ handleChange, value, label, data, error, isLoading }) => {

    const formattedData = data ?
        data?.map((dep) => ({
            value: dep.sec_id,
            label: dep.sec_name,
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

export default memo(SelectDepartmentSec) 