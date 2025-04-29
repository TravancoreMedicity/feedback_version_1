import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallRoomDetail } from '../Function/CommonFunction'

const SelectRoomMaster = ({ handleChange, value, label }) => {


    const { isLoading, data, error } = useQuery({
        queryKey: ['getallroomdetail'],
        queryFn: () => getallRoomDetail(),
        staleTime: Infinity
    });


    

    const formattedData = data ?
        data?.map((item) => ({
            value: item.rm_room_slno,
            label: item.rm_room_name,
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

export default memo(SelectRoomMaster) 