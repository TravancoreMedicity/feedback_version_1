import { Box, Typography } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { EmpauthId } from '../../Constant/Constant'
import { getCurrentEmpMenu } from '../../Function/CommonFunction'
import DefaultPageLayout from '../../Components/DefaultPageLayout'

const Settings = () => {

  const navigation = useNavigate()
  // const [employeemenu, setEmployyeMenu] = useState([])

  const id = EmpauthId();
  const { data: allmenuitems = [] } = useQuery({
    queryKey: ['getcurrentempmenu', id],
    queryFn: () => getCurrentEmpMenu(id),
    enabled: !!id // Ensures query only runs when id is valid
  });


  const menuName = [
    { menuSlno: 1, menuName: 'FeedBack  Master', menuCodeName: 'feedback' },
    { menuSlno: 2, menuName: 'FeedBack Category Master', menuCodeName: 'catgMaster' },
    { menuSlno: 3, menuName: 'FeedBack Subcategory Master', menuCodeName: 'subcatgMaster' },
    { menuSlno: 4, menuName: 'FeedBack Rating Master', menuCodeName: 'collectiontype' },
    { menuSlno: 5, menuName: 'FeedBack  Details Master', menuCodeName: 'feedbackTransactdetail' },
    { menuSlno: 6, menuName: 'User Group Master', menuCodeName: 'groupmaster' },
    { menuSlno: 7, menuName: 'User Group Rights Master', menuCodeName: 'usergroupright' },
    { menuSlno: 8, menuName: 'Module Master', menuCodeName: 'modulemaster' },
    { menuSlno: 9, menuName: 'Menu Master', menuCodeName: 'menumaster' },
    { menuSlno: 10, menuName: 'User Right Master', menuCodeName: 'userrights' },
    { menuSlno: 12, menuName: 'User Module Right Master', menuCodeName: 'usermoduleright' },
    { menuSlno: 13, menuName: 'Nurse Station Master', menuCodeName: 'nursestationmast' },
    { menuSlno: 14, menuName: 'Room Master', menuCodeName: 'roommaster' },
    { menuSlno: 15, menuName: 'Asset Item Master', menuCodeName: 'assetitem' },
    { menuSlno: 16, menuName: 'Asset Map Master', menuCodeName: 'assetmapping' },
    { menuSlno: 17, menuName: 'Room CheckList Master', menuCodeName: 'roomchecklist' },
    { menuSlno: 18, menuName: 'Discharge Room Cleaning Master', menuCodeName: 'dischargeroomcleaning' },
    { menuSlno: 19, menuName: 'Housekeeping Employee Master', menuCodeName: 'houskeepingempmaster' },
    { menuSlno: 22, menuName: 'Import Data from Ellider', menuCodeName: 'dataimport' },
    { menuSlno: 23, menuName: 'Admission and Discharge', menuCodeName: 'ipadmissdischarge' },
  ]

  //The .some() method is used to check if at least one element in an array satisfies a given condition
  const employeemenu = menuName?.filter(menu =>
    allmenuitems?.some(item => item.fb_menu_slno === menu.menuSlno)
  );


  return (
    <Box sx={{ minHeight: '100vh' }}>
      <DefaultPageLayout label='Master Settings' >
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

export default memo(Settings)


