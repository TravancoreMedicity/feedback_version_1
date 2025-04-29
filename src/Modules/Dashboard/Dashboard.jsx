// @ts-nocheck
import { Box, Divider, Typography } from "@mui/joy";
import React, { memo, useMemo, useState } from "react";
import Grid from '@mui/material/Grid2'
import DurationModel from "./DurationModel";
import FeedBackGridComponent from "./FeedBackGridComponent";
import { useQuery } from "@tanstack/react-query";
import { getallFeedBackCount, getallfeedbackMaster, getalluserfeedbackAnswers } from "../../Function/CommonFunction";
import FeedBackFormComponent from "./FeedBackFormComponent";
import StarRendering from "./StarRendering";
import { format, startOfMonth, subMonths } from "date-fns";
import { useMediaQuery } from "@mui/material";
import { predefinedCategories } from "../../Constant/Data";

const logo = require("../../assets/logo2.png")

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [currentfeed, setCurrentFeed] = useState("Last Month");
  const [fetchdate, setFetchDate] = useState(format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"));
  const isMdUp = useMediaQuery('(min-width: 760px)');

  const { data: allfeedbackNames } = useQuery({
    queryKey: ['allfeedbackname'],
    queryFn: () => getallfeedbackMaster(),
  });

  const { data: getalluserfeedback = [] } = useQuery({
    queryKey: ['getalluserfeedback', fetchdate],
    queryFn: () => getalluserfeedbackAnswers(fetchdate),
  });


  const { data: getfeedbackCount = [] } = useQuery({
    queryKey: ['gettotalfeedbackcount'],
    queryFn: () => getallFeedBackCount(),
  });



  //THis reduce method is used to group the incomming data on the basis of Category and further into feedback
  // ***********************************************************************************************************
  const groupedFeedback = (getalluserfeedback || []).reduce((acc, item) => {
    //Check if the Category Exists
    acc[item.fb_category_slno] = acc[item.fb_category_slno] || {
      fb_category_slno: item?.fb_category_slno,
      fb_category_name: item?.fb_category_name,
      feedbacks: {},
    };
    //Check if the Feedback Type Exists
    acc[item.fb_category_slno].feedbacks[item.fdmast_slno] = acc[item.fb_category_slno].feedbacks[item.fdmast_slno] || {
      feedback_name: item.feedback_name,
      total_fd_mark: 0,
      feedbacks: [],
    };
    // Convert `fd_mark` to a number and sum it
    acc[item.fb_category_slno].feedbacks[item.fdmast_slno] = {
      ...acc[item.fb_category_slno].feedbacks[item.fdmast_slno],
      total_fd_mark: acc[item.fb_category_slno].feedbacks[item.fdmast_slno].total_fd_mark + (Number(item.fd_mark) || 0),
      feedbacks: [...acc[item.fb_category_slno].feedbacks[item.fdmast_slno].feedbacks, item],
    };
    return acc;
  }, {});



  // Convert object structure to arrays 
  const formattedGroupedFeedback = (Object.values(groupedFeedback || {})?.length > 0
    ? Object.values(groupedFeedback)
    : predefinedCategories)?.map(category => {
      const feedbackArray = Object.values(category.feedbacks || {}); // Ensure it is  an array to avoid reduce error
      // Calculate total marks and total feedback count
      const totalMarks = feedbackArray.reduce((sum, feedback) => sum + (feedback.total_fd_mark || 0), 0);
      //Calculating the total Feedback Forms
      const totalFeedbackCount = feedbackArray.reduce((count, feedback) => count + (feedback?.feedbacks?.length || 0), 0);
      // Compute category rating (ensure it's within 0-5 range)
      const categoryRating = totalFeedbackCount > 0 ? Math.min(5, totalMarks / totalFeedbackCount) : 0;
      return {
        ...category,
        feedbacks: feedbackArray,
        categoryRating: Number(categoryRating.toFixed(1)),
        totalFeed: totalFeedbackCount,
        totalMark: totalMarks
      }
    });



  //This is currently not using
  // const totalFeedbackSum = useMemo(() => {
  //   return formattedGroupedFeedback?.reduce((sum, category) => sum + category?.totalFeed, 0)
  // }, [formattedGroupedFeedback]);


  const totalRating = useMemo(() => {
    return formattedGroupedFeedback?.reduce((sum, category) => sum + category?.categoryRating, 0)
  }, [formattedGroupedFeedback]);

  const HospitalRating = useMemo(() => totalRating / 5, [totalRating])


  //calculating total rating for each individual feedback form
  const feedbackDataArray = allfeedbackNames?.map(feedbackItem => {
    let totalMark = 0;
    let totalForm = 0;

    formattedGroupedFeedback?.map(category => {
      const feedbackData = category?.feedbacks?.find(fb => fb?.feedback_name === feedbackItem?.feedback_name);
      if (feedbackData) {
        totalMark += feedbackData?.total_fd_mark ?? 0;
        totalForm += feedbackData?.feedbacks?.length ?? 0;
      }
    });

    return {
      name: feedbackItem?.feedback_name,
      totalform: totalForm,
      totalmark: totalMark
    };
  });


  return (
    <Box
      onClick={() => setOpen(false)}
      className="flex flex-col  items-center rounded-xl p-2 pb-2 overflow-scroll w-full bg-bgcommon h-screen"
      sx={{ width: '100%' }}
    >
      <Box sx={{
        width: '95%',
        height: 150,
        mt: 2,
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 10,
        backgroundColor: "rgba(var(--bg-card))",
        border: 0.03,
        borderColor: "rgba(var(--border-primary))",
        justifyContent: 'space-between',
      }}>
        <Box sx={{ width: { xs: '100%', sm: '70%', md: '70%', lg: '60%' }, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
          <Box sx={{
            width: { xs: '100%', sm: 400, md: 400, lg: 400 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
              <img src={logo} style={{ height: 60 }} alt="logo" />
              <Box sx={{
                position: 'relative',
                height: 60
              }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className="text-navheadercolor"
                  sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: { xs: 18, sm: 27 },
                    fontWeight: 600,
                    mb: 0,
                    mt: 1,
                    display: 'flex',
                    bottom: 0
                  }}>
                  Travancore Medicity
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: { xs: 8, sm: 12 },
                    fontWeight: 400,
                    position: 'absolute',
                    bottom: { xs: 10, sm: 0 },
                    left: 35
                  }}>What Our Customers Say ?</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: "end", sm: 'center' },
                pr: { xs: 3, sm: 0 },
              }}>
              <Typography sx={{
                fontSize: { xs: 16, sm: 24 },
                fontWeight: 600,
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))'
              }}>{HospitalRating?.toFixed(1)}</Typography>
              <StarRendering totalRating={HospitalRating?.toFixed(1)} size={isMdUp ? 28 : 20} />
            </Box>
            <Typography sx={{
              ml: 0.3,
              fontSize: 12,
              fontWeight: 400,
              fontFamily: 'var(--font-varient)',
              color: 'rgba(var(--font-primary-white))',
              ml: { xs: 5, sm: 0 }
            }}>({getfeedbackCount?.[0]?.total_rows})</Typography>
          </Box>
        </Box>
        <Box onClick={(e) => e.stopPropagation()} sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
          <DurationModel size={isMdUp} setOpen={setOpen} open={open} currentfeed={currentfeed} setCurrentFeed={setCurrentFeed} setFetchDate={setFetchDate} />
        </Box>
      </Box>
      <Box
        sx={{
          width: '98%',
          minHeight: 100,
          mt: 2,
          display: 'flex',
          alignItems: 'start',
          p: 2,
          borderRadius: 12,
          flexDirection: "column",
        }}>
        <Divider
          sx={{
            width: '98%',
            mx: { xs: 0, sm: 3 },
            backgroundColor: 'rgba(213,82,155,0.5)',
            mb: 2,
            height: 2
          }} />
        <Grid container spacing={1} sx={{ flexGrow: 0, px: 1, width: "100%" }}>
          {
            formattedGroupedFeedback?.map((item, index) => {
              return (
                <Grid
                  key={index}
                  size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1
                  }}
                >
                  {/* Category */}
                  <FeedBackGridComponent
                    time={currentfeed}
                    name={item?.fb_category_name}
                    totalRating={item?.categoryRating}
                    count={item?.totalFeed}
                  />

                  {/* Feedback names under each category */}
                  <Box sx={{ width: "100%", mt: 1 }}>
                    {allfeedbackNames?.map((feedbackItem, index) => {
                      const feedbackData = item.feedbacks?.find(fb => fb?.feedback_name === feedbackItem?.feedback_name);
                      const totalMark = feedbackData?.total_fd_mark !== undefined ? feedbackData?.total_fd_mark : 0;
                      const totalForm = feedbackData?.feedbacks?.length || 0;
                      const FormRating = feedbackDataArray?.find(fbfrm => fbfrm?.name === feedbackItem?.feedback_name)
                      return (
                        <FeedBackFormComponent
                          key={index}
                          time={currentfeed}
                          name={feedbackItem?.feedback_name?.replace(/^./, (char) => char?.toUpperCase()) || "Unknown"}
                          totalMark={totalMark}
                          len={totalForm}
                          progress={formattedGroupedFeedback}
                          totalForm={FormRating?.totalform}
                          formMark={FormRating?.totalmark}
                          totalRating={item?.categoryRating}
                        />
                      )
                    })}
                  </Box>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default memo(Dashboard);




