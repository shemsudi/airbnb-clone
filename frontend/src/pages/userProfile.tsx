import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../configs/api";
import Footer from "../components/hosthomes/footer";
import AccountHeader from "../components/accountSetting/accountHeadre";
import ProfileDetailsLeft from "../components/accountSetting/profileDetailsLeft";
import EditUser from "../components/accountSetting/editUser";
import { intialProfileDataProps } from "../data/profileData";
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<intialProfileDataProps | null>(null);
  console.log(profile, user);
  const [editMode, setEditMode] = useState(false);
  const { userId } = useParams();
  useEffect(() => {
    if (!userId) return;
    const getUserById = async () => {
      const response = await api.get(`/user`);
      setUser(response.data);
    };
    getUserById();
  }, [userId]);
  useEffect(() => {
    if (userId) {
      api
        .get(`/user/profile/${userId}`)
        .then((response) => {
          if (response.data) {
            setProfile(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, editMode]);
  return (
    <div className="flex flex-col h-full">
      <div
        className="sticky top-0 z-10
       right-0 left-0 bg-white"
      >
        <AccountHeader />
      </div>
      {!editMode ? (
        <div className=" mx-5 md:mx-10  xl:mx-28 my-20 gap-4 flex flex-col md:flex-row  ">
          <ProfileDetailsLeft user={user!} />
          {!profile ? (
            <div className="  w-full md:w-4/6 flex flex-col justify-center items-center ">
              <div className="w-72  border-t flex flex-col gap-2 py-8  ">
                <h1 className="font-medium text-2xl ">
                  It's time create your profile
                </h1>
                <p className="text-gray-500">
                  Your Airbnb profile is an important part of every reservation.
                  Create yours to help other Hosts and guests get to know you.
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="py-3 px-5 w-fit active:scale-95  bg-primary text-white rounded-lg font-medium"
                >
                  Create Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">About {user?.firstName}</h1>
              <button
                onClick={() => setEditMode(true)}
                className="py-3 px-5 w-fit active:scale-95 border rounded-xl font-medium"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <EditUser profile={profile} setEditMode={setEditMode} user={user!} />
      )}

      <Footer />
    </div>
  );
};

export default UserProfile;
