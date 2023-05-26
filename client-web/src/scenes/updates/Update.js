import React from 'react'
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./Update.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const Update = ({setShowModal, user}) => {

    const queryClient = useQueryClient()
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
      email: user.email,
      name: user.name,

    });
   

   const handleChange = (e)=>{
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
   }

    
   const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    let profileUrl;
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setShowModal(false);
    setCover(null);
    setProfile(null);
  }
  return (
    <div className="update">
    <div className="wrapper">
      <h1>Update Your Profile</h1>
      <form>
        <div className="files">
          <label htmlFor="cover">
            <span>Cover Picture</span>
            <div className="imgContainer">
              <img
                src={
                  cover
                    ? URL.createObjectURL(cover)
                    : "/upload/" + user.coverPic
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
             onChange={(e) => setCover(e.target.files[0])}
          />
          <label htmlFor="profile">
            <span>Profile Picture</span>
            <div className="imgContainer">
              <img
                src={
                  profile
                    ? URL.createObjectURL(profile)
                    : "/upload/" + user.profilePic
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="profile"
            style={{ display: "none" }}
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </div>
        <label>Email</label>
        <input
          type="text"
          value={texts.email}
          name="email"
          onChange={handleChange}
        />
        {/* <label>Password</label>
        <input
          type="text"
          value={texts.password}
          name="password"
          onChange={handleChange}
        /> */}
        <label>Name</label>
        <input
          type="text"
          value={texts.name}
          name="name"
          onChange={handleChange}
        />
       </form>
      <button className="close" onClick={() => setShowModal(false)}>
        close
      </button>
    </div>
  </div>
  )
}

export default Update