
import { CssVarsProvider, FormControl } from '@mui/joy'
import Input from "@mui/joy/Input"
import React, { Fragment, memo } from 'react'
import { Timer } from 'iconoir-react'

const CustomDateTimePicker = ({
    size,
    type,
    onchange,
    value,
    slotProps,
    name,
    ref
}) => {
    // --- size --> sm,lg,md Default medium Size
    return (
        <Fragment>
            <CssVarsProvider>
                <FormControl size={size}>

                    <Input
                        ref={ref}
                        sx={{
                            transition: 'none',
                            width: '100%',
                            boxShadow: 'none',
                            borderWidth: '2.8px',
                            '&.MuiSelect-root': {
                                "--Select-focusedHighlight": 'none',
                                "--Select-focusedThickness": '1.1px',
                                "--Select-boxShadow": 'none',
                            },
                            borderRadius: '6px',
                            backgroundColor: 'rgba(var(--input-bg-color))',
                            borderColor: 'rgba(var(--input-border-color))',
                            color: 'rgba(var(--input-font-color))',
                            ':hover': {
                                transition: 'none',
                                backgroundColor: 'rgba(var(--input-hover-bg-color))',
                                borderColor: 'rgba(var(--input-hover-border-color))',
                                color: 'rgba(var(--input-hover-font-color))',
                                '.iconColor': {
                                    color: 'rgba(var(--icon-green))',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'rgba(var(--icon-green))',
                                }
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'rgba(var(--icon-primary))',
                            },

                        }}
                        slotProps={slotProps}
                        placeholder={"select the time"}
                        type={type}
                        startDecorator={<Timer width={25} height={25} className='iconColor' style={{ transition: 'none', color: 'rgba(var(--font-primary-white))', }} />}
                        onChange={onchange}
                        value={value}
                        name={name}

                    />
                </FormControl>
            </CssVarsProvider>
        </Fragment >
    );
}

export default memo(CustomDateTimePicker)