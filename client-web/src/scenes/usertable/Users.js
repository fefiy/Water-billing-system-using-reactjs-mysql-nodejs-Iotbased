import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeRequest } from "../../axios";
import UserTable from "./UserTable";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import { tokens } from "../../theme";
  // import { Box, Typography, useTheme } from "@mui/material";
  import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Typography, 
    useTheme
  } from "@mui/material";
  import BillRate from "./BillRate";
  
  const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const mode = theme.palette.mode
    const queryClient = useQueryClient();
  
    const { isLoading, error, data } = useQuery(["waterusage"], () =>
      makeRequest.get("/waterusage").then((res) => {
        return res.data;
      })
    );
    const updateWaterStateMutation = useMutation(
      (userId) => {
        console.log(userId)
        return makeRequest.post("/updatewaterstate/"+userId);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
           queryClient.invalidateQueries(["waterusage"]);
        },
      }
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
  
    const toggleWaterState = async(id)=>{
      console.log("water state update is callded")
      updateWaterStateMutation.mutate(id)
     }
     const convertDate = (date)=>{
      return new Date(date)
     } 
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
        isoff
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
          isOff:isoff,
  
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
        <Header title={`Users Monthly bill and Payment status`} />
        <Box display="flex" alignItems="center" margin="16px 0px">
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
        <Table responsive striped bordered hover variant={mode=="dark"? "dark":""}>
        <thead>
          <tr>
            <th>Name</th>
            <th>mac_adress</th>
            <th>total litter </th>
            <th>Date</th>
            <th>monthly litter</th>
            <th>Price</th>
            <th>Paid Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody >
          {groupedData.map((user, i) => {
            const {user_id, first_name, last_name, mac_address, records, total_litter_water_amount, isOff } = user;
            const numRows = records.length;
            return records.map((record, j) => (
              <tr key={`${first_name}-${j}`}>
                {j === 0 && (
                  <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                    {first_name} {last_name}
                  </td>
                  
                )}
                 {j === 0 && (
                  <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                   {mac_address}
                  </td>
                )}
                 {j === 0 && (
                  <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                   {total_litter_water_amount}
                  </td>
                )}
                
                 {console.log(convertDate(record.start_date).toLocaleDateString)}
                <td>{convertDate(record.start_date).toLocaleDateString()} - { convertDate(record.end_date).toLocaleDateString()}</td>
                <td>{record. month_litter_water_amount}</td>
                <td>{record.price}</td>
                {record.status =="success"? <td>Yes</td>:<td>No</td>}
                {j === 0 && (
                  isOff== 0 ?
                  <td  rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                  <button onClick={() => toggleWaterState(user_id)}  className="btn btn-danger" >
                     OFF
                  </button>
                  </td> :
                  <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                    <button onClick={() => toggleWaterState(user_id)}  className="btn btn-success">
                     ON
                    </button>
                 </td>
                )}
              </tr>
            ));
          })}
        </tbody>
      </Table>
        {/* <UserTable users={groupedData} updateWaterStateMutation={updateWaterStateMutation} /> */}
      </div>
    );
  };
  
  export default Users;
  
//   useQueryClient,
//   useMutation,
//   refetch,
// } from "@tanstack/react-query";

// const Users = ({ users }) => {
//   const [toggle, setToggle] = useState(true);
//   const queryClient = useQueryClient();
//   const convertDate = (date) => {
//     return new Date(date);
//   };

//   const { isLoading, error, data } = useQuery(["WaterState"], () =>
//     makeRequest.get("/getWaterState").then((res) => {
//       return res.data;
//     })
//   );

//   const setWaterState = (id) => {
//     const waterState = data.find((user) => user.user_id === id);
//     return waterState.isoff;
//   };

//   const toggleWaterState = async (id) => {
//     await updateWaterStateMutation.mutateAsync(id);
//   };

//   const updateWaterStateMutation = useMutation(
//     (userId) => {
//       return makeRequest.post("/updatewaterstate/" + userId);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["WaterState"]);
//       },
//       onError: (error) => {
//         console.log(error);
//       },
//     }
//   );

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const mode = theme.palette.mode;

//   return (
//     <>
//       {isLoading ? (
//         <div>Isloading</div>
//       ) : (
//         <Table
//           responsive
//           striped
//           bordered
//           hover
//           variant={mode === "dark" ? "dark" : ""}
//         >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>mac_adress</th>
//               <th>total litter water</th>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Price</th>
//               <th>Paid Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, i) => {
//               const {
//                 user_id,
//                 first_name,
//                 last_name,
//                 mac_address,
//                 records,
//                 total_litter_water_amount,
//                 isOff,
//               } = user;
//               const numRows = records.length;
//               return records.map((record, j) => (
//                 <tr key={`${first_name}-${j}`}>
//                   {j === 0 && (
//                     <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
//                       {first_name} {last_name}
//                     </td>
//                   )}
//                   {j === 0 && (
//                     <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
//                       {mac_address}
//                     </td>
//                   )}
//                   {j === 0 && (
//                     <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
//                       {total_litter_water_amount}
//                     </td>
//                   )}

//                   <td>
//                     {convertDate(record.start_date).toLocaleDateString()} -{" "}
//                     {convertDate(record.end_date).toLocaleDateString()}
//                   </td>
//                   <td>{record.month_litter_water_amount}</td>
//                   <td>{record.price}</td>
//                   {record.status === "success" ? <td>Yes</td> : <td>No</td>}
//                   {j === 0 &&
//                     (setWaterState(user_id) === 0 ? (
//                       <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
//                         <button
//                           onClick={() => toggleWaterState(user_id)}
//                           className="btn btn-danger"
//                         >
//                           OFF
//                         </button>
//                       </td>
//                     ) : (
//                       <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
//                         <button
//                           onClick={() => toggleWaterState(user_id)}
//                           className="btn btn-success"
//                         >
//                           ON
//                         </button>
//                       </td>
//                     ))}
//                 </tr>
//               ));
//             })}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default Users;
