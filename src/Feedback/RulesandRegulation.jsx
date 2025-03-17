import React, { lazy, Suspense } from 'react';
import QuestionBoxSkeleton from './Commoncomponents/QuestionBoxSkeleton';
import { Box, Textarea } from '@mui/joy';

const QuestionBox = lazy(() => import('./QuestionBox'));
const Rulesyesorno = lazy(() => import('./Rulesyesorno'));

const RulesandRegulation = ({ selected, setSelected, setRemarks, remarks }) => {
    return (
        <>
            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Whether you are made aware about the hospital rules and regulation?"}
                    malayalam={"ആശുപത്രിയുടെ ചട്ടങ്ങൾക്കും നിയമങ്ങൾക്കും നിങ്ങൾ അവബോധം കൈവരിച്ചതാണോ?"}
                    id={1}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={1}
                selected={selected[1]}
            />
            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Whether your spiritual and cultural needs were supported?"}
                    malayalam={"നിങ്ങളുടെ ആത്മീയവും സാംസ്കാരിക ആവശ്യങ്ങളും പിന്തുണയ്ക്കപ്പെട്ടിട്ടുണ്ടോ?"}
                    id={2}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={2}
                selected={selected[2]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were you informed about treatment and treatment procedure?"}
                    malayalam={"ചികിത്സയും ചികിത്സാ നടപടിക്രമവും നിങ്ങൾക്ക് അറിയിച്ചിട്ടുണ്ടോ?"}
                    id={3}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={3}
                selected={selected[3]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Was your signature obtained in informed consent before each procedure?"}
                    malayalam={"ഓരോ നടപടിക്കും മുമ്പും വിവരം ലഭിച്ച സമ്മതപത്രത്തിൽ നിങ്ങളുടെ ഒപ്പ് വാങ്ങിയിട്ടുണ്ടോ?"}
                    id={4}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={4}
                selected={selected[4]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Was your confidentiality regarding patient condition protected at all times?"}
                    malayalam={"രോഗിയുടെ നില സംബന്ധിച്ച നിങ്ങളുടെ സ്വകാര്യത എല്ലായ്പ്പോഴും സംരക്ഷിച്ചിട്ടുണ്ടോ?"}
                    id={5}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={5}
                selected={selected[5]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were you protected against physical abuse and negligence?"}
                    malayalam={"ശാരീരിക പീഡനത്തിലും ഉദാസീനത്തിലും നിന്ന് നിങ്ങളെ സംരക്ഷിച്ചിട്ടുണ്ടോ?"}
                    id={6}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={6}
                selected={selected[6]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were you informed about how to voice a complaint?"}
                    malayalam={"പരാതി അറിയിക്കാനുള്ള മാർഗ്ഗങ്ങളെക്കുറിച്ച് നിങ്ങൾക്ക് വിശദീകരിച്ചിട്ടുണ്ടോ?"}
                    id={7}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={7}
                selected={selected[7]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Are you aware about how to access your clinical records?"}
                    malayalam={"നിങ്ങളുടെ ക്ലിനിക്കൽ രേഖകൾ എങ്ങനെ ലഭ്യമാക്കാമെന്നു നിങ്ങൾക്കറിയാമോ?"}
                    id={8}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={8}
                selected={selected[8]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Were you informed about the expected cost of treatment?"}
                    malayalam={"ചികിത്സാ ചെലവുകൾക്ക് മുൻകൂട്ടി വിശദീകരിച്ചിട്ടുണ്ടോ?"}
                    id={9}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={9}
                selected={selected[9]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Was your privacy ensured and protected during treatment?"}
                    malayalam={"ചികിത്സയ്ക്കിടയിൽ നിങ്ങളുടെ സ്വകാര്യത ഉറപ്പുനൽകിയതും സംരക്ഷിച്ചതുമായിരുന്നോ?"}
                    id={10}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={10}
                selected={selected[10]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Are you aware about your right to refuse the treatment?"}
                    malayalam={"ചികിത്സ നിരസിക്കാനുള്ള നിങ്ങളുടെ അവകാശത്തെക്കുറിച്ച് നിങ്ങൾ അറിയാമോ?"}
                    id={11}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={11}
                selected={selected[11]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Are you aware that you can raise grievance if any of your patient rights is violated?"}
                    malayalam={"നിങ്ങളുടെ രോഗാവകാശങ്ങളിൽ ഒന്നെങ്കിലും ലംഘിക്കപ്പെട്ടാൽ നിങ്ങൾക്ക് പരാതിപ്പെടാമെന്ന് നിങ്ങൾക്കറിയാമോ?"}
                    id={12}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={12}
                selected={selected[12]}
            />

            <Suspense fallback={<QuestionBoxSkeleton />}>
                <QuestionBox
                    english={"Are you aware that you have the right to take a second opinion if required?"}
                    malayalam={"ആവശ്യമെങ്കിൽ രണ്ടാമതൊരു അഭിപ്രായം ചോദിക്കാനുള്ള അവകാശം നിങ്ങൾക്കുണ്ടെന്ന് നിങ്ങൾക്കറിയാമോ?"}
                    id={13}
                />
            </Suspense>
            <Rulesyesorno
                setSelected={setSelected}
                questionid={13}
                selected={selected[13]}
            />
            <Box
                sx={{
                    display: 'flex',
                    width: { xs: "90%", sm: '85%' },
                    mt: 5,
                }}
            >
                <Textarea
                    onChange={(e) => setRemarks(e.target.value)}
                    value={remarks}
                    placeholder="Remarks | അഭിപ്രായങ്ങൾ"
                    minRows={2}
                    sx={{
                        mt: 1,
                        minHeight: 120,
                        mb: 1,
                        width: '100%',
                        color: 'black',
                        border: '1px solid #CC488F',
                        '&:focus': {
                            outline: 'none', 
                            border: '1px solid #CC488F', 
                        },
                    }}
                />

            </Box>


        </>
    );
};

export default RulesandRegulation;
