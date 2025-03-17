import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { allfeedbackcollection } from '../Function/CommonFunction'

const SelectFeedbackRating = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['allcollectiontype'],
        queryFn: () => allfeedbackcollection(),
    })

    const formattedData = data ?
        data?.map((rate) => ({
            value: rate.fb_rateing_slno,
            label: rate.fb_rateing_name,
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

export default memo(SelectFeedbackRating) 