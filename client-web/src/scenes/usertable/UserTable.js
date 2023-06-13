

















// UserTable.js
import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";

const UserTable = ({ users }) => {
 const convertDate = (date)=>{
  return new Date(date)
 }   
 const theme = useTheme();
 const colors = tokens(theme.palette.mode);
 const mode = theme.palette.mode
  console.log(users)
  return (
    
    <Table responsive striped bordered hover variant={mode=="dark"? "dark":""}>
      <thead>
        <tr>
          <th>Name</th>
          <th>mac_adress</th>
          <th>total litter water</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Price</th>
          <th>paid</th>
        </tr>
      </thead>
      <tbody >
        {users.map((user, i) => {
          const { first_name, last_name, mac_address, records, total_litter_water_amount } = user;
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
            </tr>
          ));
        })}
      </tbody>
    </Table>
  );
};

export default UserTable;