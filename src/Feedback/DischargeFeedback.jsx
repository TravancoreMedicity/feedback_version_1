import { Box } from '@mui/joy'
import React, { lazy, memo, Suspense } from 'react';
import CustomBackDropWithOutState from '../Components/CustomBackDropWithOutState';



const CheckBoxGroup = lazy(() => import('../Components/CheckBoxGroup'));
const QuestionText = lazy(() => import('../Components/QuestionText'));

const DischargeFeedback = ({ setDefaultImpression }) => {

    return (
        <Box sx={{
            width: '85%',
            height: '100%'
        }}>
            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <QuestionText
                    name={"Overall Impression of the Patient ?"} />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <CheckBoxGroup
                    questid={1}
                    onSelection={(val) => setDefaultImpression((prev) => ({ ...prev, 1: val }))}
                />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <QuestionText
                    name={"Overall Medical Care Impression ?"} />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <CheckBoxGroup
                    questid={2}
                    item={["Doctor Care", "Nurse Care"]}
                    subdivitem={{
                        "Nurse Care": [
                            { name: "Payward" },
                            { name: "General Ward" },
                            { name: "ICU" },
                            { name: "ER Nurse" }
                        ]
                    }}
                    onSelection={(selections) =>
                        setDefaultImpression((prev) => ({
                            ...prev,
                            2: selections
                        }))
                    }
                />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <QuestionText
                    questid={3}
                    name={"Overall Facilites & Cleaniness ?"}
                />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <CheckBoxGroup
                    item={["Facilites", "Housekeeping Service"]}
                    subdivitem={{
                        "Facilites": [
                            { name: "Room Cleanliness" },
                            { name: "Bathroom Cleanliness" },
                            { name: "Air Conditioning" },
                            { name: "Furniture Condition" }
                        ],
                        "Housekeeping Service": [
                            { name: "Waste Disposal" },
                            { name: "Linen Handling" },
                            { name: "Floor Cleanliness" },
                        ]
                    }}
                    onSelection={(selections) =>
                        setDefaultImpression((prev) => ({
                            ...prev,
                            3: selections
                        }))
                    }
                />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <QuestionText
                    questid={4}
                    name={"Food Quality and Hygein ?"}
                />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <CheckBoxGroup
                    onSelection={(selections) =>
                        setDefaultImpression((prev) => ({
                            ...prev,
                            4: selections
                        }))
                    }
                    item={["Quality", "Hygein"]}
                    const subdivitem={{
                        "Quality": [
                            { name: "Taste" },
                            { name: "Presentation" },
                            { name: "Temperature" },
                        ],
                        "Hygein": [
                            { name: "Cleanliness" },
                            { name: "Smell" },
                            { name: "Food Handling" }
                        ]
                    }}
                />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <QuestionText
                    questid={5}
                    name={"Overall Behaviour of the Staff ? "} />
            </Suspense>

            <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
                <CheckBoxGroup
                    onSelection={(selections) =>
                        setDefaultImpression((prev) => ({
                            ...prev,
                            5: selections
                        }))
                    }
                    item={["Behaviour"]}
                    subdivitem={{
                        "Behaviour": [
                            { name: "Supporting staff" },
                            { name: "Housekeeping staff" },
                            { name: "Pro's" },
                            { name: "Security" },
                            { name: "Patient Relation" },
                            { name: "Duty Manager" },
                        ]

                    }}
                />
            </Suspense>

        </Box>
    )
}

export default memo(DischargeFeedback);