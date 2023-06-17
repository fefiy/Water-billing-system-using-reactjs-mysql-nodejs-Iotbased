import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import { makeRequest } from "../../axios";
import {
  useQuery,
  useQueryClient,
  useMutation,
  refetch,
} from "@tanstack/react-query";

const UserTable = ({ data, toggle }) => {
  const [toogle, setToggle] = useState(true);
  const queryClient = useQueryClient();
  const convertDate = (date) => {
    return new Date(date);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = theme.palette.mode;

  return (
        <Table
          responsive
          striped
          bordered
          hover
          variant={mode == "dark" ? "dark" : ""}
        >
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
          <tbody>
            {data.map((user, i) => {
              const {
                user_id,
                first_name,
                last_name,
                mac_address,
                records,
                total_litter_water_amount,
                isOff,
              } = user;
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

                  {console.log(
                    convertDate(record.start_date).toLocaleDateString
                  )}
                  <td>
                    {convertDate(record.start_date).toLocaleDateString()} -{" "}
                    {convertDate(record.end_date).toLocaleDateString()}
                  </td>
                  <td>{record.month_litter_water_amount}</td>
                  <td>{record.price}</td>
                  {record.status == "success" ? <td>Yes</td> : <td>No</td>}
                  {j === 0 &&
                    (isOff == 0 ? (
                      <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                        <button
                          onClick={() => toggle(user_id)}
                          className="btn btn-danger"
                        >
                          OFF
                        </button>
                      </td>
                    ) : (
                      <td rowSpan={numRows} style={{ verticalAlign: "middle" }}>
                        <button
                          onClick={() => toggle(user_id)}
                          className="btn btn-success"
                        >
                          ON
                        </button>
                      </td>
                    ))}
                </tr>
              ));
            })}
          </tbody>
        </Table>
  );
};

export default UserTable;
