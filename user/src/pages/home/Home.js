import React, { useEffect, useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import "./home.css";
import PayForm from "../../components/pay/PayForm";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const tx_ref = uuidv4().toString();
  const public_key = "CHAPUBK_TEST-mYvAaAQU5eTAueBwZng3Ad9KECRtikVp";
  const queryClient = useQueryClient();
  const [datau, setDatau] = useState(null)
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log("useEffect Calleded")
    async function fetchData() {
      try {
        console.log("access is fetching")
        const response = await makeRequest.get("/users/" + currentUser.id)
        console.log("datwuseE", response.data)
        setDatau(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  // const { isLoading, error, data } = useQuery(["alluser"], () =>
  //   makeRequest.get("/users/" + currentUser.id).then((res) => {
  //     return res.data;
  //   })
  // );
  
  
  console.log(currentUser)
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {/* <!-- Set columns width --> */}
                  <th className="text-center" style={{ minWidth: "400px" }}>
                    date(mont)
                  </th>
                  <th className="text-right" style={{ minWidth: "160px" }}>
                    Total liter
                  </th>
                  <th className="text-center" style={{ minWidth: "120px" }}>
                   price
                  </th>
                  <th className="text-right" style={{ minWidth: "160px" }}>
                   actions
                  </th>
                </tr>
              </thead>
              <tbody>
                { datau == null ? (
                  <p> Loading...</p>
                ) : (
                  datau.map((signledata) => {
                    console.log(signledata.id)
                    return(
                    <tr>
                      <td>
                        <div className="media">
                          <div className="media-body">
                            <h4 className="text-dark">{signledata.start_date}-{signledata.end_date}</h4>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">{signledata.month_amount}</td>
                      <td className="text-right">{signledata.price}</td>
                      {signledata.status === "success"? <td>
                         
                          <button disabled>Already paid</button>
                         my name is fewzya yimam  
                      </td>: (  <td className="text-center">
                        <PayForm 
                         lname={signledata.last_name}
                         fname={signledata.first_name}
                         amount={signledata.price}
                         public_key={public_key}
                         email={signledata.email}
                         track_id = {signledata.id.toString()}
                         tx_ref={tx_ref} 
                         />
                      </td>)}
                     
                    </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
