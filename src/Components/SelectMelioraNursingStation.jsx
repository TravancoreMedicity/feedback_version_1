import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallNurseStationMeliora } from '../Function/CommonFunction'

const SelectMelioraNursingStation = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['getmelioraNsstation'],
        queryFn: () => getallNurseStationMeliora(),
    })

    const formattedData = data ?
        data?.map((dep) => ({
            value: dep?.fb_ns_code,
            label: dep?.fb_ns_name,
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

export default memo(SelectMelioraNursingStation) 