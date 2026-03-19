import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getallpremdetail } from '../Function/CommonFunction'

const SelectPremFeedbacks = ({ handleChange, value, label }) => {



    const {
        data: allfeedbackNames,
        isLoading: LoadingallFeedbackNames,
        error: feedbacknameerror,
    } = useQuery({
        queryKey: ['allfeedbackname'],
        queryFn: async () => await getallpremdetail(), // changes
    });


    const formattedData = allfeedbackNames ?
        allfeedbackNames?.map((feed) => ({
            value: feed.fdmast_slno,
            label: feed.feedback_name.toUpperCase()
        }))
        : [];

    if (feedbacknameerror) return errorNofity('An error has occurred: ' + feedbacknameerror)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={formattedData}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={LoadingallFeedbackNames ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectPremFeedbacks) 