import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./style.css";
import { makeRequest } from "../../axios";
import { useParams, useNavigate} from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


const EditUserModal = () => {
  const { id } = useParams();
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isLoading, error, data } = useQuery(["updateUser"], () =>
    makeRequest.get("/update/" + id).then((res) => {
      return res.data;
    })
  );

  const [err, setErr] = useState(null);
  const roles = [
    { id: 1, val: "user" },
    { id: 2, val: "admin" },
  ];

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mac: "",
    phone: "",
    region: "",
    zone: "",
    wereda: "",
  });

  useEffect(() => {
    if (data) {
      setInputs({
        id:data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mac: data.mac_address,
        phone: data.phone,
        region: data.region,
        zone: data.zone,
        wereda: data.address,
      });
    }
  }, [data]);

  const mutation = useMutation(
    () => {
      return makeRequest.post("/updateuser", inputs);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["alluser"]);
        navigate("/contacts")
      },
    }
  );


  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs)
  const handleFormSubmit = async (e) => {
    mutation.mutate()
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Data not available</div>;
  }

  return (
    <>
      <Header title="UPDATE USER" subtitle="" />
      <div className="form">
        <div className="form-right">
          <input
            name="first_name"
            value={inputs.first_name}
            onChange={handlechange}
            placeholder="First Name"
          />
          <input
            name="last_name"
            value={inputs.last_name}
            onChange={handlechange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handlechange}
            placeholder="Email"
          />
          <input
            name="mac"
            value={inputs.mac}
            onChange={handlechange}
            placeholder="MAC Address"
          />
        </div>
        <div className="form-left">
          <input
            name="phone"
            value={inputs.phone}
            onChange={handlechange}
            placeholder="Phone Number"
          />
          <input
            name="region"
            value={inputs.region}
            onChange={handlechange}
            placeholder="Region"
          />
          <input
            name="zone"
            value={inputs.zone}
            onChange={handlechange}
            placeholder="Zone"
          />
          <input
            name="wereda"
            value={inputs.wereda}
            onChange={handlechange}
            placeholder="Wereda, Kebele, Home Number"
          />
        </div>
        {/* {err && <div>{err.response}</div>} */}
      </div>
      <button
        style={{ width: "60%", margin: "10px 20%", padding: "10px" }}
        onClick={handleFormSubmit}
      >
        EditUser
      </button>
    </>
  );
};

export default EditUserModal;
