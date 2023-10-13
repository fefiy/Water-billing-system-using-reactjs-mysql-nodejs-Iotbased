import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Modal, Form } from "react-bootstrap";
import { useState , useContext} from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';



const WaterAmount = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { currentUser} = useContext(AuthContext)
  const colors = tokens(theme.palette.mode);
  const [updataUser, setUpdateUser] = useState(null)
  
  const { isLoading, error , data } = useQuery(["totalAmount"], () =>
    makeRequest.get("/totalwater").then((res) => {
      return res.data;
    })
  );


 

  // const { isLoading:isLoadingupdate, error:erorUpdate, data:dataUpdate } = useQuery(["bill_rate"], () =>
  //   makeRequest.get("/billrate").then((res) => res.data)
  // );

  const mutation = useMutation(
    (values) => makeRequest.post("/waterAmountUpdate", values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["totalAmount"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
 
  const handleUpdate = async (id) => {
    console.log(id)
    const result = await Swal.fire({
      title: "Update Item",
      html:
        '<input id="amount" class="swal2-input" placeholder="Water Amount">',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const amount = Swal.getPopup().querySelector("#amount").value;
        return { amount, id};
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
  
  // const handleUpdate = (id)=>{
  //   console.log(id)
  // }
 
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "first_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Total water Litter",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        return (
            <div
              className="btn btn-primary"
              onClick={() => handleUpdate(params.row.id)}
            >
              <EditIcon />
            </div>
        );
      },
    },
  ];
  console.log(data)
  return (
    <>
      {isLoading ? (
        <h3>Loading</h3>
      ) : ( 
        <Box m="20px">
          <Header
            title="CONTACTS"
            subtitle="List of Contacts for Future Reference"
          />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              // components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default WaterAmount;
