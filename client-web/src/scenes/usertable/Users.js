import React from 'react';
import UserTable from './UserTable';
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Header from '../../components/Header';
const Users = () => {
  const { isLoading, error, data } = useQuery(["waterusage"], () =>
  makeRequest.get("/waterusage").then((res) => {
    return res.data;
  })
);
console.log(data)
if (isLoading || !data) {
  return <div>Loading...</div>;
}

  const groupedData = data.reduce((acc, data) => {
    const {user_id, first_name,mac_address, last_name,price, amount,amount_paid, status,start_date, end_date,
      month_amount } = data;
    const existingUser = acc.find(user => user.user_id === user_id);
    
    if (existingUser) {
      existingUser.records.push({
        start_date: start_date,
        end_date:end_date,
        total_litter_water_amount:amount,
        month_litter_water_amount:month_amount,
        price: price,
        amount_paid:amount_paid,
        status: status  
        // Assuming a fixed price of 10 per amount
      });
    } else {
      acc.push({
        user_id,
        first_name,
        last_name,
        mac_address,
        records: [{
          start_date: start_date,
          end_date:end_date,
          total_litter_water_amount:amount,
          month_litter_water_amount:month_amount,
          price: price,
          amount_paid:amount_paid,
          status: status // Assuming a fixed price of 10 per amount
        }],
      });
    }
    
    return acc;
  }, []);

  console.log("groupdata", groupedData)
  return (
    <div>
      <Header title={`user records`} />
      <UserTable users={groupedData} />
    </div>
  );
};

export default Users;
