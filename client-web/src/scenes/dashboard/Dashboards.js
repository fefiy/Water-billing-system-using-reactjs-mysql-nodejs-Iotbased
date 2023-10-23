import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
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
import LineBar from "../../components/LineBar"
import BarChart from "../../components/BarChart";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading: paymentLoading, error: paymentError, data: paymentData } = useQuery(["allPayment"], () =>
  makeRequest.get("/totalpayment").then((res) => {
    return res.data;
  })
);
const { isLoading: trackingLoading, error: trackingError, data: trackingData } = useQuery(["allMonth"], () =>
  makeRequest.get("/watertrackingraph").then((res) => {
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
const reduceData = trackingData? trackingData.reduce((acc, current) => {
  let i =0;
  const { end_date, month_amount } = current;
  const existingRecord = acc.find((item) => item.end_date === end_date);

  if (existingRecord) {
    existingRecord.amount += month_amount;
  } else {
    i = i+1
    acc.push({ id:i, end_date, amount:month_amount });
  }

  return acc;
}, []):[];

// console.log("reduced  data", reduceData)
const totalpayment = ()=>{
  let total = 0
   for(let i= 0; i <paymentData.length; i++){
      total = total+paymentData[i].amount_paid
   }
   return total
}
const totalUsers = ()=>{
  return userData?.length
}
const totalLitter = ()=>{
  let total = 0;
  for(let i= 0; i < waterData.length; i++){
    total = total+ waterData[i].amount
  }
  return total
}

const [chartData, setChartData] = useState({
  labels: reduceData.map((data) => data.end_date),
  datasets: [
    {
      label: "Users Gained",
      data: reduceData.map((data) => data.amount),
      backgroundColor: [
        colors.grey[500],
        // "#ecf0f1",
        // "#50AF95",
        // "#f3ba2f",
        // "#2a71d0",
      ],
      borderColor: "black",
      borderWidth: 2,
    },
  ],
});
console.log(waterData)

console.log("TrackingData",trackingData)
console.log("refucedData", reduceData)
// tracking   


 

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box >

         {
          userLoading || waterLoading || paymentLoading || trackingLoading? 
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
       {/* Row 3 */}
      </Box>
          )
         }
    </Box>
  );
};

export default Dashboard;
