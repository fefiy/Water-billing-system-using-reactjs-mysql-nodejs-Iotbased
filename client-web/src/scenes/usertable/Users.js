import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import BillRate from "./BillRate";

const Users = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["waterusage"], () =>
    makeRequest.get("/waterusage").then((res) => {
      return res.data;
    })
  );

  const calculeteMonthmutation = useMutation(
    () => makeRequest.post("/waterTrack"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["waterusage"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onClickCalculeteMonth = async () => {
    calculeteMonthmutation.mutate();
  };
  const [filterInput, setFilterInput] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("name");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilterInput = (event) => {
    setFilterInput(event.target.value);
  };

  const handleSelectedColumn = (event) => {
    setSelectedColumn(event.target.value);
  };

  useEffect(() => {
    const filterData = () => {
      if (filterInput === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((dataItem) => {
          switch (selectedColumn) {
            case "name":
              return `${dataItem.first_name} ${dataItem.last_name}`
                .toLowerCase()
                .includes(filterInput.toLowerCase());
            case "end_date":
              return dataItem.end_date.includes(filterInput.toLowerCase());
            case "price":
              return dataItem.price.toString().includes(filterInput);
            case "amount":
              return dataItem.month_amount.toString().includes(filterInput);
            case "paid":
              console.log("dataItem", dataItem);
              if (filterInput.toLowerCase() == "yes") {
                return dataItem.status == "success";
              } else if (filterInput.toLowerCase() === "no") {
                return dataItem.status !== "success";
              } else {
                return true;
              }
            default:
              return Object.values(dataItem).some((value) =>
                value
                  .toString()
                  .toLowerCase()
                  .includes(filterInput.toLowerCase())
              );
          }
        });
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [filterInput, selectedColumn]);

  if (isLoading || !filteredData) {
    return <div>Loading...</div>;
  }
  console.log(filteredData);
  const groupedData = filteredData.reduce((acc, data) => {
    const {
      user_id,
      first_name,
      mac_address,
      last_name,
      price,
      amount,
      amount_paid,
      status,
      start_date,
      end_date,
      month_amount,
    } = data;
    const existingUser = acc.find((user) => user.user_id === user_id);

    if (existingUser) {
      existingUser.records.push({
        start_date: start_date,
        end_date: end_date,
        month_litter_water_amount: month_amount,
        price: price,
        amount_paid: amount_paid,
        status: status,
        // Assuming a fixed price of 10 per amount
      });
    } else {
      acc.push({
        user_id,
        first_name,
        last_name,
        mac_address,
        total_litter_water_amount: amount,

        records: [
          {
            start_date: start_date,
            end_date: end_date,
            month_litter_water_amount: month_amount,
            price: price,
            amount_paid: amount_paid,
            status: status, // Assuming a fixed price of 10 per amount
          },
        ],
      });
    }

    return acc;
  }, []);
  // Render the search bar, dropdown, and the UserTable with filtered data
  return (
    <div style={{ margin: "20px" }}>
      <Header title={`user records`} />
      <Box display="flex" alignItems="center" marginBottom="16px">
        <Box marginRight="8px">
          <FormControl fullWidth>
            <InputLabel id="filter-column-label">Filter by</InputLabel>
            <Select
              labelId="filter-column-label"
              value={selectedColumn}
              onChange={handleSelectedColumn}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="end_date">End Date</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="paid">Paid Status</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box flexGrow={2}>
          <TextField
            fullWidth
            label="Search"
            value={filterInput}
            onChange={handleFilterInput}
          />
        </Box>
        <Box flexGrow={1}>
          <button
            className="btn btn-primary mx-3"
            onClick={onClickCalculeteMonth}
          >
            Calculete Month
          </button>
        </Box>
        <BillRate />
      </Box>
      <UserTable users={groupedData} />
    </div>
  );
};

export default Users;

// import React from 'react';
// import UserTable from './UserTable';
// import { makeRequest } from "../../axios";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import Header from '../../components/Header';
// const Users = () => {
//   const { isLoading, error, data } = useQuery(["waterusage"], () =>
//   makeRequest.get("/waterusage").then((res) => {
//     return res.data;
//   })
// );
// console.log(data)
// if (isLoading || !data) {
//   return <div>Loading...</div>;
// }

//   const groupedData = data.reduce((acc, data) => {
//     const {user_id, first_name,mac_address, last_name,price, amount,amount_paid, status,start_date, end_date,
//       month_amount } = data;
//     const existingUser = acc.find(user => user.user_id === user_id);

//     if (existingUser) {
//       existingUser.records.push({
//         start_date: start_date,
//         end_date:end_date,
//         total_litter_water_amount:amount,
//         month_litter_water_amount:month_amount,
//         price: price,
//         amount_paid:amount_paid,
//         status: status
//         // Assuming a fixed price of 10 per amount
//       });
//     } else {
//       acc.push({
//         user_id,
//         first_name,
//         last_name,
//         mac_address,
//         records: [{
//           start_date: start_date,
//           end_date:end_date,
//           total_litter_water_amount:amount,
//           month_litter_water_amount:month_amount,
//           price: price,
//           amount_paid:amount_paid,
//           status: status // Assuming a fixed price of 10 per amount
//         }],
//       });
//     }

//     return acc;
//   }, []);

//   console.log("groupdata", groupedData)
//   return (
//     <div style={{margin:"20px"}}>
//       <Header title={`user records`} />
//       <UserTable users={groupedData} />
//     </div>
//   );
// };

// export default Users;
