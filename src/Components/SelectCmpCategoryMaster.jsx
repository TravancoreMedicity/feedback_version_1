import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallFeedbackCategory } from '../Function/CommonFunction'

const SelectCmpLocationMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['allfeedbackcategory'],
        queryFn: () => getallFeedbackCategory(),
        staleTime: Infinity
    })

    const formattedData = data ?
        data?.map((category) => ({
            value: category.fb_category_slno,
            label: category.fb_category_name,
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

export default memo(SelectCmpLocationMaster) 