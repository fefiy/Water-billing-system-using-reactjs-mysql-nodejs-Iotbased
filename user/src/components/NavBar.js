import React, {useContext}from "react";
import { Link } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { AuthContext } from "../context/authContext";
import LogoutIcon from '@mui/icons-material/Logout';

import './navbar.css'
const NavBar = () => {
const {currentUser} =  useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="left">
          <span>Novasocial</span>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLewt7np6+ursbTh4+SzubzBxsjT1ti6v8Lc3+DIzM7X2tvM0NLFyczP09R8ZhjBAAAC4klEQVR4nO2a2XLrIAyGDcJsXvL+b3swdVO3dUCyJXJmyj+9ykX5RguSJYahq6urq6urq6urq6vr7wngnYcP0U8uBLcuc3wDCYzeaWU+pfQ6NyYYV5vOPcoY61sSTD/O3ymsb+QOmNUZQIYIYxOE6RXAxqBbhIQrEGwQD3FnhDJBA4YqQWJYRAkqXtglmJ3wQBEoJZcXI5JAWTEEiySQCwesG5K0kCvQRkhmmEQyc8EbQQlFJMEImxkECGaSEZTi9wSsNATDX6+AaASzsiNEIoIK7Ai0fNjMwI6AK1BHBPZgCESC1DdwI5BuhYywcqcllUApx4yArtNfCh1BAOFCLLAjkDOCPRwv3AsLN4IjI7C38sRanRDY+yZqxyLRyL+/WAMxJfirFOkrIiPwEwwjjYD9YkoCWtMiMm0hdY9WZs5BMINAC5+Fr5aGPyN3lWZt3xHEZhyAmDRlAsFpEy4xDXuZPmrGEIgFws5Qd4UVHgJDjcHIjbqeej0Eb+GFD42FvBAZrpwIltN1xDaHj632QzBMJ94wVn4If9Q4WXWwhTE6tF5Obfu5R9Cfeeh8m3XMb4zEkTS+ZVkJ6dAxxnn2+S9x5J9anZ7O9ouzVucYyFtKpbS1YfWbQeTP91Ow5jwpt5+DE91WQpzCi9O/gdh1FnEKxOXngrZAod3M7JJk/1AsDWe2eHDmKSQDUM7fKTTfDHihGeBoimnkcIfXFwEyhLpdOiEiO9bXEDffFAC6bS9B3Oli4pUoPGEwV981gOc4/wPiWm6wOOHJcMkZ5AVEmeFCa383E36JvMBlJ6B+4hAnKkhpCgFnJB6E/9BCv5SgCv/JHWUAFH4YCTx34jkDDoG8FKUgoMaRtBEnmQFRN6kbeqoQWSFrBIwZpI2AMYOu/5Obqn2Be2kjVO8n7HDzFkMFQZ6gNiInPxe5glDu6yVvxqfKTZx4Sm4qp2WDaEwqI+gGqrx/gxYqEnR1dXV1/S/6BzA0IDjtXgNsAAAAAElFTkSuQmCC"/>
          <span style={{textTransform:"capitalize"}}>{currentUser.first_name } {currentUser.last_name}</span>
        </div>
        <div className="logout">
            <LogoutIcon />
            {/* <small>Logout</small> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
