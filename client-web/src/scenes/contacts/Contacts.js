import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import './contact.css'
import { Modal, Form } from "react-bootstrap";
import { useState , useContext} from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Contacts = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { currentUser} = useContext(AuthContext)
  const colors = tokens(theme.palette.mode);
  const [updataUser, setUpdateUser] = useState(null)
  
  const { isLoading, error, data } = useQuery(["alluser"], () =>
    makeRequest.get("/users").then((res) => {
      return res.data;
    })
  );

  const deleteMutation = useMutation(
    (userId) => {
      console.log(userId)
      return makeRequest.post("/users/"+userId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["alluser"]);
      },
    }
  );
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the deletion logic here
        deleteMutation.mutate(id)
        // Show a success message
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const handleUpdate = async(id)=>{
    console.log(id, "update is clicked")
     try{
      const response =  await makeRequest.get("/update/"+id)
        setUpdateUser(response.data)
        console.log(response.data)
        console.log("updateUser",updataUser)
        navigate(`/updateuser/${id}`)
     }catch(err){
      console.log(err)
     }
  }
  console.log(data);
  console.log(error)
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "mac_address", headerName: "MAC Address" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.first_name} ${params.row.last_name}`,
      renderCell: (params) => (
        <div style={{ textTransform: "capitalize" }}>
          {`${params.row.first_name} ${params.row.last_name}`}
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "zone",
      headerName: "Zone",
      flex: 1,
    },
    {
      field: "delte",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        return (
            <div
              className="btn btn-danger"
              onClick={() => handleDelete(params.row.id)}
            >
             <DeleteIcon />
            </div>
        );
      },
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


  return (
    <>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <Box m="10px">
          <Header
            title="List of Users"
            // subtitle="List of Contacts for Future Reference"
          />
          <Box
            m="20px 0 0 0"
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
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Contacts;
