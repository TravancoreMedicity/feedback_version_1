import React from 'react'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const SelectEmployee = ({ handleChange, value, label, data, error, isLoading }) => {

    const formattedData = data ?
        data?.map((dep) => ({
            value: dep.em_id,
            label: dep.em_name,
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

export default memo(SelectEmployee) 