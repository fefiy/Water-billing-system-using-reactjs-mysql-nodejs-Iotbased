import React from "react";
import { Box } from "@mui/material";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const BillRate = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["bill_rate"], () =>
    makeRequest.get("/billrate").then((res) => res.data)
  );

  const mutation = useMutation(
    (values) => makeRequest.post("/waterbill", values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bill_rate"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
 
  const showUpdateAlert = async () => {
    const result = await Swal.fire({
      title: "Update Item",
      html:
        '<input id="name" class="swal2-input" placeholder="Price Per Litter">' +
        '<input id="email" class="swal2-input" placeholder="Fixed Rate">',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const email = Swal.getPopup().querySelector("#email").value;
        return { price_per_litter:name, fixed_rate:email};
      },
    });

    if (result.isConfirmed) {
      try {
        const { value } = result;
        await mutation.mutateAsync(value);
        Swal.fire("Success", "Item updated successfully", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to update item", "error");
      }
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Box display={"flex"} alignItems={"center"} gap={"40px"} justifyContent="center">
      <Box>
        <p>price per litter:- {data?.priceperlitter}</p>
        <p>fixed rate:- {data?.state_tax}</p>
      </Box>
      <Box>
        <button className="btn btn-info" onClick={showUpdateAlert}>
          update bill
        </button>
      </Box>
    </Box>
  );
};

export default BillRate;
