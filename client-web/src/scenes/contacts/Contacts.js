import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/Mockdata";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import './contact.css'
import { Modal, Form } from "react-bootstrap";
import { useState , useContext} from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import EditUserModal from "../profileUpdate/EditUserModal";
import Update from "../updates/Update";

const Contacts = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { currentUser} = useContext(AuthContext)
  const colors = tokens(theme.palette.mode);
  const [showModal, setShowModal] = useState(false)
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

  const handleUpdate = (id)=>{
     setShowModal(true)
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
      cellClassName: "name-column--cell",
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
      width: 50,
      renderCell: (params) => {
        return (
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
        );
      },
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 50,
      renderCell: (params) => {
        return (
            <div
              className="viewButton"
              onClick={() => handleUpdate(params.row.id)}
            >
              Edit
            </div>
        );
      },
    },
  ];

  return (
    <>
    {showModal && <Update user={currentUser} showModal={showModal} setShowModal={setShowModal} />}
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
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Contacts;
