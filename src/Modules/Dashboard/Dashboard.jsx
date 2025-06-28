// @ts-nocheck
import { Box, Divider, Skeleton, Typography } from "@mui/joy";
import React, { lazy, memo, Suspense, useMemo, useState } from "react";
import Grid from '@mui/material/Grid2'
import DurationModel from "./DurationModel";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCurrentCompany,
  getallFeedBackCount,
  getallfeedbackMaster,
  getalluserfeedbackAnswers,
  getCategoryCountDetail,
  gettotalstarCount
} from "../../Function/CommonFunction";
import { format, startOfMonth, subMonths } from "date-fns";
import { useMediaQuery } from "@mui/material";
import { predefinedCategories } from "../../Constant/Data";
import { PUBLIC_NAS_FOLDER } from "../../Constant/Static";
import CustomBackDropWithOutState from "../../Components/CustomBackDropWithOutState";



const StarRendering = lazy(() => import('./StarRendering'));
const FeedbackRatings = lazy(() => import('./FeedbackRatings'));
const TotalStarCount = lazy(() => import('./TotalStarCount'));
const DashboardDetailCards = lazy(() => import('../../Components/DashboardDetailCards'));

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [currentfeed, setCurrentFeed] = useState("Last Month");
  const [fetchdate, setFetchDate] = useState(format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"));
  const isMdUp = useMediaQuery('(min-width: 760px)');


  //state to track Header image getting 404 for getting Error
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgSrc = `${PUBLIC_NAS_FOLDER}/logo/FeedbackLogo.png`;

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

  // fetching the total star rating count from the feedback
  const { data: getstarcount = [] } = useQuery({
    queryKey: ['gettotalstarcount'],
    queryFn: () => gettotalstarCount(),
  });


  const { data: getCatergoryCount = [] } = useQuery({
    queryKey: ['getcategorycount'],
    queryFn: () => getCategoryCountDetail(),
  });




  //KMC OR TMC COMPANY NAME SELECTING
  const { data: getCurrentCompany } = useQuery({
    queryKey: ['getcurrentcompany'],
    queryFn: () => fetchCurrentCompany(),
    staleTime: Infinity
  });






  // getCurrentCompany?.[0]?.company_slno

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
      className="flex flex-col  items-center rounded-xl p-2 pb-2 overflow-scroll w-full bg-bgcommon "
      sx={{ width: '100%', height: '94vh' }}
    >
      <Box sx={{
        width: '95%',
        height: 165,
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
        <Box sx={{
          width: { xs: '100%', sm: '90%', md: '80%', lg: '70%', xl: '60%' },
          height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end'
        }}>
          <Box sx={{
            width: { xs: '100%', sm: 400, md: 400, lg: 400 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',

          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>


              {(!imgLoaded || imgError) && (
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{
                    // position: 'absolute',
                    top: 0,
                    left: 0,
                    background: 'linear-gradient(45deg, rgba(123, 31, 162, 0.59), rgba(194, 24, 92, 0.6), rgba(25, 118, 210, 0.62))'
                  }}
                />
              )}

              <img
                src={imgSrc}
                alt="logo"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                style={{ height: 60 }}
                style={{
                  display: imgLoaded && !imgError ? 'block' : 'none',
                  height: 60
                }}
              />

              <Box sx={{
                position: 'relative',
                height: 60,
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center'
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
                  {
                    getCurrentCompany &&
                      getCurrentCompany?.[0]?.company_slno === 1 ? 'Travancore Medicity' : 'kerala Medical College'
                  }

                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))',
                    fontSize: { xs: 10, sm: 12 },
                    fontWeight: 400,
                    position: 'absolute',
                    bottom: { xs: 10, sm: 0 },
                    left: getCurrentCompany?.[0]?.company_slno === 1
                      ? { xs: 30, sm: 40 }
                      : { xs: 30, sm: 53 }
                  }}>What Our Customers Say ?</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '60%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'end', sm: 'center' },
                flexDirection: 'column',
                pl: { xs: 2, sm: 2 },
                ml: { xs: 4, sm: 0 },
              }}>
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                <StarRendering totalRating={HospitalRating?.toFixed(1)} size={isMdUp ? 28 : 20} />
              </Suspense>
              <Typography sx={{
                fontSize: { xs: 16, sm: 24 },
                fontWeight: 600,
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))'
              }}>{HospitalRating?.toFixed(1)}</Typography>
            </Box>
            <Typography sx={{
              fontSize: 14,
              fontWeight: 800,
              fontFamily: 'var(--font-varient)',
              color: 'rgba(var(--font-primary-white))',
              ml: { xs: 5, sm: 2 }
            }}>{getfeedbackCount?.[0]?.total_rows}</Typography>
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
                  size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 2 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    width: '100%'
                  }}>
                  <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
                    <DashboardDetailCards
                      CategoryCount={getCatergoryCount}
                      feedbackDataArray={feedbackDataArray}
                      item={item}
                      allfeedbackNames={allfeedbackNames}
                      name={item?.fb_category_name}
                      count={item?.totalFeed}
                      totalRating={item?.categoryRating}
                    />
                  </Suspense>
                </Grid>
              )
            })
          }
        </Grid>
        <Box className="lg:flex w-full gap-2 px-2 min:h-[300px] ">
          <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
            <TotalStarCount getstarcount={getstarcount} HospitalRating={HospitalRating} totalFeedback={getfeedbackCount?.[0]?.total_rows} />
          </Suspense>
          <Suspense fallback={<CustomBackDropWithOutState message={"Loading"} />}>
            <FeedbackRatings allfeedbackNames={allfeedbackNames} feedbackDataArray={feedbackDataArray} />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Dashboard);




