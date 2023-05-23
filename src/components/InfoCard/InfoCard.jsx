import React, { useState ,useEffect} from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import * as UserApi from "../../api/UserRequest.js";
import ProfileModal from "../ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {
  const dispatch = useDispatch();
  // basically in router link we have id of user.
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);


  const handleLogOut = ()=> {
    dispatch(logout())
  }

// the logic behind this is that a person can see anyones profile so if it asking to see its own profile than if part will be executed if not than else par
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        // console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        
      }
    };
    // to prevent infinite we have user in dependency array.
    fetchProfileUser();
  }, [user]);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId?(<div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>):""}
        
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default InfoCard;