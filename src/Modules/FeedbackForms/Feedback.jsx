import React, { useState, memo, useCallback } from 'react';
import { Box, Tooltip } from "@mui/joy";
import { getallfeedbackMaster } from "../../Function/CommonFunction";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useQuery } from '@tanstack/react-query';
import Typography from "@mui/material/Typography";
import { PageStar } from 'iconoir-react'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { OUTLINK_FEEDBACK } from '../../Constant/Static';


const Feedback = () => {

  const [value, setValue] = useState("1");

  const { data: allfeedbackNames } = useQuery({
    queryKey: ['allfeedbackname'],
    queryFn: () => getallfeedbackMaster(),
  })

  const openFeedbackForm = useCallback((feedbackId) => {
    const encodedId = btoa(feedbackId);
    const externalUrl = `${OUTLINK_FEEDBACK}/${encodedId}`;
    window.open(externalUrl, '_blank'); // Opens in a new tab
  }, []);

  return (
    <>
      <Box className="h-dvh p-2">
        <Box
          className="flex flex-col rounded-xl p-1 w-full"
          sx={{
            backgroundColor: "rgba(var(--bg-card))",
            height: "calc(100% - 50px)",
            border: 0.03,
            borderColor: "rgba(var(--border-primary))",
          }}>
          <TabContext value={value}>
            <Box sx={{ border: 0, borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))", borderBottomColor: 'divider', borderWidth: 2 }}>
              <TabList
                aria-label="lab API tabs example"
                sx={{
                  minHeight: 0,
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'rgba(var(--logo-pink))',
                  },
                }}
                className="flex justify-end items-center"
              // indicatorColor="secondary"
              >
                <Tab
                  icon={<PageStar color='rgba(var(--color-white))' />}
                  label="All FeedBack Forms"
                  value="1"
                  iconPosition="start"
                  sx={{
                    display: "flex",
                    minHeight: 0,
                    textTransform: "none",
                    color: 'rgba(var(--color-white),0.9)',
                    bgcolor: "rgba(var(--tab-color),0.8)",
                    borderRadius: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    minWidth: '15%',
                    fontSize: { xs: 10, sm: 14 },
                    '&.Mui-selected': {
                      color: 'rgba(var(--color-white))',
                      bgcolor: 'rgba(var(--tab-color))',
                    },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" className="overflow-scroll" sx={{ p: 1 }} >
              {
                allfeedbackNames?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: 'rgba(var(--bg-card))',
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        my: 2
                      }}>
                      <div style={{
                        height: 50,
                        backgroundColor: 'rgba(var(--bg-common))',
                        fontFamily: 'var(--font-varient)',
                        color: 'rgba(var(--font-primary-white))',
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'rgba(var(--border-primary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        paddingLeft: '10px',
                        paddingRight: '10px'
                      }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <FormatAlignJustifyIcon sx={{
                            width: { xs: 15, sm: 20 },
                            height: { xs: 15, sm: 20 }
                          }} />
                          <Typography
                            sx={{
                              fontFamily: "var(--font-varient)",
                              color: 'rgba(var(--font-primary-white))',
                              fontWeight: 600,
                              ml: 1,
                              fontSize: { xs: 11, sm: 14 },
                            }}
                          >
                            {item.feedback_name.toUpperCase()}
                          </Typography>
                        </Box>
                        <Tooltip sx={{ fontSize: 12 }} title={`${item?.feedback_name?.toLowerCase()} preview `} placement="top">
                          <PlaylistPlayIcon
                            onClick={(e) => openFeedbackForm(item?.fdmast_slno)}
                            sx={{
                              cursor: "pointer",
                              transition: "transform 0.3s ease",
                              transform: "translateX(0)",
                              width: { xs: 20, sm: 25 },
                              height: { xs: 20, sm: 25 }
                            }} />
                        </Tooltip>
                      </div>
                    </Box>
                  )
                })
              }
            </TabPanel>
          </TabContext>
        </Box>
      </Box >


    </>
  )
}

export default memo(Feedback)


