import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import WaterIcon from '@mui/icons-material/Water';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading: paymentLoading, error: paymentError, data: paymentData } = useQuery(["allPayment"], () =>
  makeRequest.get("/totalpayment").then((res) => {
    return res.data;
  })
);

const { isLoading: userLoading, error: userError, data: userData } = useQuery(["allUsers"], () =>
  makeRequest.get("/users").then((res) => {
    return res.data;
  })
);

const { isLoading: waterLoading, error: waterError, data: waterData } = useQuery(["allWater"], () =>
  makeRequest.get("/totalwater").then((res) => {
    return res.data;
  })
);

const totalpayment = ()=>{
  let total = 0
   for(let i= 0; i <paymentData.length; i++){
      total = total+paymentData[i].amount_paid
   }
   return total
}
const totalUsers = ()=>{
  return userData.length
}
const totalLitter = ()=>{
  let total = 0;
  for(let i= 0; i < waterData.length; i++){
    total = total+ waterData[i].amount
  }
  return total
}

console.log(waterData)

 

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

         {
          userLoading || waterLoading || paymentLoading ? 
             <div> Loading </div>
          :(
            <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalUsers()}
            subtitle="Total Users"
            icon={
              <PeopleAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalLitter()} Liter`}
            subtitle="Total water fetched "
            icon={
              <WaterIcon
                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalpayment()} ETH birr`}
            subtitle="Total payment maded through users"
            progress="0.30"
            increase="+5%"
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
        </Box>
      </Box>
          )
         }
    </Box>
  );
};

export default Dashboard;
