import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { component } from '../Feedback/Commoncomponents/Commondetal'

const SelectAnswerComponent = ({ handleChange, value, label }) => {

    const formattedData = component ?
        component?.map((com) => ({
            value: com.value,
            label: com.label,
        }))
        : [];


    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={formattedData}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={"Select here ..."}
        />
    )
}

export default memo(SelectAnswerComponent) 