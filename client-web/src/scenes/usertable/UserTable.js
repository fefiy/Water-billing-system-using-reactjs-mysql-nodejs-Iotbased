// UserTable.js
import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserTable = ({ users }) => {
   


  return (
    
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>mac_adress</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Price</th>
          <th>paid</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => {
          const { first_name, last_name, mac_address, records } = user;
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
              <td>{record.date}</td>
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