import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallNewRoomCreationDetail } from '../Function/CommonFunction'

const SelectRoomDetailMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['getnewroomdetail'],
        queryFn: () => getallNewRoomCreationDetail(),
    });

    const formattedData = data ?
        data?.map((item) => ({
            value: Number(item?.fb_nw_room_slno),
            label: item?.rm_room_name
            ,
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

export default memo(SelectRoomDetailMaster)

