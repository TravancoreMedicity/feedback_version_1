import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallGroupMaster } from '../Function/CommonFunction'

const SelectUserGroupMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['getallgroupmast'],
        queryFn: () => getallGroupMaster(),
        staleTime: Infinity
    })

    const formattedData = data ?
        data?.map((item) => ({
            value: item.fb_usrgrp_slno,
            label: item.fb_usrgrp_name,
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

export default memo(SelectUserGroupMaster) 