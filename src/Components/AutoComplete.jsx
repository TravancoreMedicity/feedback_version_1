import React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import { useQuery } from '@tanstack/react-query';
import { getallFeedbackCategory } from '../Function/CommonFunction';


export default function SelectBoxComponent({ setCategoryName, category, setCategoryId }) {

    const { data: allfeedbackcategory } = useQuery({
        queryKey: ['allfeedbackcategory'],
        queryFn: () => getallFeedbackCategory(),
    })

    return (
        <FormControl sx={{ width: '100%',mb:2 }}>
            <Autocomplete
                placeholder="Choose Category"
                options={allfeedbackcategory ? allfeedbackcategory : []}
                getOptionLabel={(option) => option.fb_category_name || ''}
                sx={{ width: '100', fontSize: { xs: 12, sm: 16, md: 15, lg: 16 } }}
                slotProps={{
                    listbox: {
                        sx: {
                            zIndex: 99999,
                            fontSize: { xs: 12, sm: 16, md: 15, lg: 16 }
                        },
                    },
                }}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setCategoryName(newValue);
                        setCategoryId(newValue.fb_category_slno)
                    }
                    else {
                        setCategoryName("")
                        setCategoryId(0)
                    }
                }}
                value={category || null}
                // isOptionEqualToValue={(option, value) => option?.fb_category_name === value?.fb_category_names}
            />
        </FormControl>
    );
}

