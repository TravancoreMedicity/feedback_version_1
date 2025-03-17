import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallNurseStation } from '../Function/CommonFunction'

const SelectNursingStation = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['allnursestation'],
        queryFn: () => getallNurseStation(),
    })


    const formattedData = data ?
        data?.map((dep) => ({
            value: dep.NS_CODE,
            label: dep.NSC_DESC,
        }))
        : [];

    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={formattedData}
            values={(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectNursingStation) 