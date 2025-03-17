import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallmoudleMaster } from '../Function/CommonFunction'

const SelectModuleMaster = ({ handleChange, value, label }) => {


    const { isLoading, data, error } = useQuery({
        queryKey: ['getallmodulemaster'],
        queryFn: () => getallmoudleMaster(),
        staleTime: Infinity
    })


    const formattedData = data ?
        data?.map((item) => ({
            value: item.fb_module_slno,
            label: item.fb_module_name,
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

export default memo(SelectModuleMaster) 