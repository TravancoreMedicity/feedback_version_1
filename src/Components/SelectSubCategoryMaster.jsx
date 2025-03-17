import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getfeedbacksubcategory } from '../Function/CommonFunction'

const SelectSubCategoryMaster = ({ handleChange, value, label, categoryid }) => {


    console.log(categoryid, "categoryid");

    const { isLoading, data, error } = useQuery({
        queryKey: ['getsubcategory', categoryid],
        queryFn: () => getfeedbacksubcategory(categoryid),
        enabled: categoryid != 0
    })

    const formattedData = data ?
        data?.map((category) => ({
            value: category.fb_subcategory_slno,
            label: category.fb_subcategory_name,
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

export default memo(SelectSubCategoryMaster) 