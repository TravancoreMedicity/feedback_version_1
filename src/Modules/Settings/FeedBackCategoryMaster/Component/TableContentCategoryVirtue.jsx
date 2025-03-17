import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import React from "react";
import { memo } from "react";
import { useCallback } from "react";
import {

    EditPencil
} from "iconoir-react";

const TableContentCategoryVirtue = ({ data }) => {
    console.log("jhsgjhdfjghj");

    console.log("data", data);

    const HanldeUpdation = useCallback(
        async (rowData) => {
            // let value = allfeedbackcategory?.filter(item => item.fb_category_name === rowData.fb_category_name)
            // const { fb_category_slno } = value[0];
            // setUpdateFlag(1)
            // setUpdateDetial(rowData)
            // setFeedbackCategory({
            //     category: rowData.fb_category_name,
            //     status: rowData.fb_catgory_status
            // })
        },
        [data]
    );

    return (
        <>
            <td className="border-tableborder border-dashed border-t-[0.20px] " >
                <Box className="flex w-[10.5rem] h-full  items-center pl-2  my-2.5">
                    <Typography
                        level="title-md"
                        fontSize={13.5}
                        fontWeight={600}
                        sx={{
                            fontSmooth: "antialiased",
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white),0.7)",
                        }}
                    >
                        {data.fd_slno}
                    </Typography>
                </Box>
            </td>
            <td className="border-tableborder border-dashed border-t-[0.20px]">
                <Box className="flex w-[20rem] justify-center items-center px-2 ">
                    <Typography
                        // level="body-md"
                        fontSize={13.5}
                        // fontWeight={600}
                        textAlign={"center"}
                        className="w-full"
                        sx={{
                            fontSmooth: "antialiased",
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white),0.7)",
                        }}
                    >
                        {data.feedback_name}
                    </Typography>
                </Box>
            </td>
            <td className="border-tableborder border-dashed border-t-[0.20px]">
                <Box className="flex w-[20rem] justify-center items-center px-2">
                    <Typography
                        level="body-md"
                        fontSize={13.5}
                        // fontWeight={600}
                        noWrap
                        color="neutral"
                        textAlign={"center"}
                        className="w-full"
                        sx={{
                            fontSmooth: "antialiased",
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white),0.7)",
                        }}
                    >
                        {data.feedback_status === 1 ? "Active" : 'Inactive'}
                    </Typography>
                </Box>
            </td>
            <td className="border-tableborder border-dashed border-t-[0.20px]">
                <Box className="flex w-[20rem] justify-center items-center px-2">
                    <Typography
                        // level="body-md"
                        fontSize={13.5}
                        // fontWeight={600}
                        textAlign={"center"}
                        className="w-full"
                        sx={{
                            fontSmooth: "antialiased",
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white),0.7)",
                        }}
                    >
                        {data.feedback_name}
                    </Typography>
                </Box>
            </td>
            <td className="border-tableborder border-dashed border-t-[0.20px]">
                <Box className="flex w-[20rem] justify-center items-center px-2">
                    <Typography
                        // level="body-md"
                        fontSize={13.5}
                        // fontWeight={600}
                        textAlign={"center"}
                        className="w-full"
                        sx={{
                            fontSmooth: "antialiased",
                            fontFamily: "var(--font-varient)",
                            color: "rgba(var(--font-primary-white),0.7)",
                        }}
                    >
                        {data.feedback_name}
                    </Typography>
                </Box>
            </td>
            <td className="border-tableborder border-dashed border-t-[0.20px]">
                <Box className="flex w-[20rem] h-full justify-center items-center">
                    <Tooltip title="Edit Data" placement="top">
                        <IconButton
                            variant="outlined"
                            size="sm"
                            onClick={() => HanldeUpdation(data)}
                            sx={{
                                ":hover": {
                                    backgroundColor: "transparent",
                                    border: "0.03px solid rgba(var(--color-pink))",
                                },
                            }}
                        >
                            <EditPencil
                                height={18}
                                width={18}
                                color="rgba(var(--icon-primary))"
                                cursor={"pointer"}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </td>
        </>
    );
};

export default memo(TableContentCategoryVirtue);
  {/* <TableVirtuoso
                    style={{ height: "100%", width: "100%" }}
                    className="flex flex-1 bg-tablebody/40"
                    data={allfeedbackNames}
                    fixedHeaderContent={() => <TableHeaderCategoryVirtue />}
                    itemContent={(index, data) => <TableContentCategoryVirtue data={data} />}
                /> */}