import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getdepassetonly } from '../Function/CommonFunction'

const SelectAssetItemMaster = ({ handleChange, value, label, id }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["getdepassetdetail", id],
        queryFn: () => getdepassetonly(id),
        staleTime: Infinity,
        enabled: !!id
    });

    const formattedData = data ?
        data?.map((item) => ({
            value: Number(item?.fb_asset_slno),
            label: item?.fb_asset_name,
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

export default memo(SelectAssetItemMaster) 