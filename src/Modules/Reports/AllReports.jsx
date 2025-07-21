import { Box, Typography } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { EmpauthId } from '../../Constant/Constant'
import { getCurrentEmpMenu } from '../../Function/CommonFunction'
import DefaultPageLayout from '../../Components/DefaultPageLayout'

const AllReports = () => {

    const navigation = useNavigate()
    // const [employeemenu, setEmployyeMenu] = useState([])

    const id = EmpauthId();
    const { data: allmenuitems = [] } = useQuery({
        queryKey: ['getcurrentempmenu', id],
        queryFn: () => getCurrentEmpMenu(id),
        enabled: !!id // Ensures query only runs when id is valid
    });



    const menuName = [
        { menuSlno: 20, menuName: 'Common Feedback Report', menuCodeName: 'commonfbreport' },
        { menuSlno: 21, menuName: 'Ip Feedback Report', menuCodeName: 'ipfbreport' }
    ]

    //The .some() method is used to check if at least one element in an array satisfies a given condition
    const employeemenu = menuName?.filter(menu =>
        allmenuitems?.some(item => item.fb_menu_slno === menu.menuSlno)
    );


    return (
        <Box sx={{ minHeight: '100vh' }}>
            <DefaultPageLayout label='Feedback Reports' >
                <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
                    {
                        employeemenu?.map((val, idx) => {
                            return (
                                < Grid
                                    size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}
                                    key={idx} onClick={() => navigation(`/Home/${val.menuCodeName}`)} >
                                    <Box
                                        className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer hover:bg-slate-200" >
                                        <Typography level='body-sm' fontWeight={'md'} sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }} >
                                            {val.menuName}
                                        </Typography>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </DefaultPageLayout >
        </Box>
    )
}

export default memo(AllReports)


