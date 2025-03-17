import { Box, Input, Textarea } from '@mui/joy'
import React, { useCallback, useState } from 'react'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ToggleButton from './ToogleButton';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const Rulesyesorno = ({
    questionid,
    value,
    hanldeuseranswers,
    type,
    component,
    setMobileValidation,
    mobilevalidation,
    setMobileNumber,
    hanldecomponent
}) => {

    const [clicked, setClicked] = useState(null);
    const [extradetail, setExtraDetail] = useState({
        TextValue: "",
        inputvalue: "",
        usermobilenumber: ''
    })
    const { TextValue, inputvalue, usermobilenumber } = extradetail;
    const handleImageClick = (item, questionid, value) => {
        if (item === "no") {
            hanldecomponent(questionid, component != null ? component : '')
            setExtraDetail({ TextValue: "", inputvalue: "", usermobilenumber: '' })
            hanldeuseranswers(`${questionid}_suggest`, '')
            hanldeuseranswers(`${questionid}_mobile`, '')
        } else {
            hanldecomponent(questionid, '')
        }
        if (item === clicked) {
            setClicked(null)
            setExtraDetail({ TextValue: "", inputvalue: "", usermobilenumber: '' })
            hanldeuseranswers(`${questionid}_suggest`, '')
            hanldeuseranswers(`${questionid}_mobile`, '')
        } else {
            setClicked(item);
            hanldeuseranswers(questionid, value)
        }
    };
    const hanldeadditioanlinfo = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "usermobilenumber" && value.length > 10) {
            setMobileValidation("Can Enter only 10 Digit?")
        } else {
            setMobileValidation("")
        }
        setExtraDetail({
            ...extradetail,
            [name]: value
        })
        if (name === "usermobilenumber") {
            hanldeuseranswers(`${questionid}_mobile`, value)
            setMobileNumber(value)
        } else {
            hanldeuseranswers(`${questionid}_suggest`, value)
        }
    }, [questionid]);

    const resultObject = value != null && value !== undefined
        ? Object.fromEntries(value.split(', ').map(item => item.split(': ')))
        : {};


    // console.log(resultObject,"resultobject");


    const { Yes, No } = resultObject;

    return (
        <Box sx={{
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Box sx={{
                width: "80%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    width: { xs: '90%', sm: '85%' },
                    justifyContent: 'space-around',
                    mb: 1,
                    pt: 1,
                    mt: 1,
                }} >
                    <Box
                        sx={{
                            width: { xs: 60, sm: 70 },
                            height: { xs: 60, sm: 70 },
                            borderRadius: '50%',
                            p: 0.4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            // border: clicked === 'yes' ? '2px solid rgba(0, 128, 0, 0.56)' : ' 1px solid rgba(0, 128, 0, 0.56)',
                            // filter: clicked === 'yes' ? `drop-shadow(0px 0px 15px rgba(4, 154, 46, 0.7))` : '',
                            bgcolor: ' rgba(255, 255, 255, 0.8)'
                        }}
                        onClick={() => handleImageClick("yes", questionid, Yes)} alt=""
                    >
                        {/* {
                            clicked === "yes" ? <ThumbUpIcon
                                sx={{
                                    width: '90%',
                                    height: '90%',
                                    color: 'rgba(0, 128, 0, 0.56)'

                                }}

                            /> : <ThumbUpOffAltIcon
                                sx={{
                                    width: '90%',
                                    height: '90%',
                                    color: 'rgba(0, 128, 0, 0.56)'

                                }}

                            />
                        } */}
                        <ToggleButton label="Yes" icon={clicked === "yes" ? <CheckCircleIcon color="success" sx={{
                            width: 30, height: 30
                        }} /> : <CheckCircleOutlineRoundedIcon color="success" sx={{
                            width: 30, height: 30
                        }} />} color="green" clicked={clicked} />



                    </Box>
                    <Box
                        sx={{
                            width: { xs: 60, sm: 70 },
                            height: { xs: 60, sm: 70 },
                            // bgcolor: clicked === "no" ? 'red' : "",
                            borderRadius: '10%',
                            p: 0.4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            // border: clicked === 'no' ? '2px solid rgba(224, 15, 15, 0.56)' : ' 1px solid rgba(224, 15, 15, 0.56)',
                            // filter: clicked === 'no' ? `drop-shadow(0px 0px 15px rgba(178, 0, 0, 0.46))` : '',
                            bgcolor: ' rgba(255, 255, 255, 0.8)'
                        }}
                        onClick={() => handleImageClick("no", questionid, No)}
                    >
                        {/* {
                            clicked === 'no' ? <ThumbDownAltIcon
                                sx={{
                                    width: '90%',
                                    height: '90%',
                                    color: 'rgba(224, 15, 15, 0.56)',

                                }}
                            /> : <ThumbDownOffAltIcon
                                sx={{
                                    width: '90%',
                                    height: '90%',
                                    color: 'rgba(224, 15, 15, 0.56)',

                                }}
                            />
                        } */}
                        <ToggleButton label="No" icon={clicked === 'no' ? <CancelIcon color="error" sx={{
                            width: 30, height: 30
                        }} /> : <HighlightOffRoundedIcon color="error" sx={{
                            width: 30, height: 30
                        }} />} color='rgba(173, 23, 23, 0.86)' clicked={clicked} />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {
                    clicked === "yes" && component === "TextArea" && type === "Yes/No" &&
                    <Box
                        sx={{
                            width: '100%',
                            mt: 5,
                            px: 2
                        }}
                    >
                        <Textarea
                            onChange={(e) => hanldeadditioanlinfo({ target: { name: 'TextValue', value: e.target.value } })}
                            value={TextValue}
                            placeholder='Reason(കാരണം)'
                            minRows={2} sx={{
                                mt: 1, minHeight: 120, mb: 1, width: '100%',

                                border: '1px solid #CC488F',
                                '&:focus': {
                                    outline: 'none',
                                    border: '1px solid #CC488F',
                                },
                                '&:hover': {
                                    border: '1px solid #CC488F', // Hover color
                                },
                            }} />
                    </Box>

                }
                {
                    clicked === "yes" && component === "InputBox" && type === "Yes/No" &&
                    <Input
                        placeholder="Enter here...!"
                        type='text'
                        onChange={(e) => hanldeadditioanlinfo({ target: { name: 'inputvalue', value: e.target.value } })}
                        value={inputvalue}
                        sx={{
                            height: 55,
                            width: { xs: '80%', sm: '70%' },
                            borderRadius: 11,
                            mt: 3,
                            border: '1px solid #CC488F',
                            '&:focus': {
                                outline: 'none',
                                border: '1px solid #CC488F',
                            },
                        }}

                    />
                }
                {
                    clicked === "yes" && component === "MobileInputBox" && type === "Yes/No" &&
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        mt: 3
                    }}>
                        <Box sx={{
                            color: 'red',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            width: { xs: '75%', sm: '70%' }
                        }}>{mobilevalidation && <Box
                            sx={{
                                fontSize: 10,
                                color: " rgba(193, 8, 8, 0.64)",
                                fontFamily: "Bahnschrift"
                            }}

                        >{mobilevalidation}</Box>}</Box>
                        <Input
                            placeholder="91+ XXXXXXXXX"
                            type='Number'
                            value={usermobilenumber}
                            onChange={(e) => hanldeadditioanlinfo({ target: { name: 'usermobilenumber', value: e.target.value } })}
                            maxLength="10"
                            sx={{
                                height: 55,
                                width: { xs: '80%', sm: '70%' },
                                borderRadius: 11,
                                // mt: 3,
                                border: '1px solid #CC488F',
                                '&:focus': {
                                    outline: 'none',
                                    border: '1px solid #CC488F',
                                },
                            }}
                        />
                    </Box>
                }


            </Box>

        </Box>


    )
}


export default Rulesyesorno;