import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallbedMaster } from '../Function/CommonFunction'

const SelectBedMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['getallbedmaster'],
        queryFn: () => getallbedMaster(),
        staleTime: Infinity
    });

    const formattedData = data ?
        data?.map((item) => ({
            value: Number(item.fb_bd_code),
            label: item.fb_bdc_no,
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

export default memo(SelectBedMaster) 