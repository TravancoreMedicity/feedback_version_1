import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'


const SelectFeedbackType = ({ handleChange, value, label }) => {

    // Static Array Just For Current Purpose . Should need to be updated For the Next Upadtion
    const FeedbackType = [
        { name: "Normal", value: 0 },
        { name: "PREM", value: 1 },
        { name: "Normal With Qr", value: 2 },
    ]

    const formattedData = FeedbackType ?
        FeedbackType?.map((item) => ({
            value: item.value,
            label: item.name,
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

export default memo(SelectFeedbackType) 