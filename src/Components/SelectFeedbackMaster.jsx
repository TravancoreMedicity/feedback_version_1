import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallfeedbackMaster } from '../Function/CommonFunction'

const SelectFeedbackMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['allfeedbackname'],
        queryFn: () => getallfeedbackMaster(),
    })

    const formattedData = data ?
        data?.map((feed) => ({
            value: feed.fdmast_slno,
            label: feed.feedback_name.toUpperCase()
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

export default memo(SelectFeedbackMaster) 