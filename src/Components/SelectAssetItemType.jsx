import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getAllcomplaintTypeDetail } from '../Function/CommonFunction'

const SelectAssetItemType = ({ handleChange, value, label, id }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["complainttypedetail", id],
        queryFn: () => getAllcomplaintTypeDetail(id),
        enabled: !!id,
        staleTime: Infinity
    });

    const formattedData = data ?
        data?.map((item) => ({
            value: Number(item?.complaint_type_slno),
            label: item?.complaint_type_name,
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

export default memo(SelectAssetItemType) 
