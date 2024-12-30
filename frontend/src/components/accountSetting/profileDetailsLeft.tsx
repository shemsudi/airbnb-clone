import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../pages/userProfile";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const ProfileDetailsLeft = ({ user }: { user: User }) => {
  let firstName = "";
  let email = "";
  let phone = "";
  if (user) {
    firstName = user?.firstName;
    email = user?.email;
    phone = user?.phone || "";
    console.log(user);
  }
  return (
    <div className=" w-full md:w-2/6 m-6 flex flex-col ">
      <div className=" rounded-2xl shadow-lg py-10 px-4 flex justify-center items-center">
        <div className="w-1/2 flex gap-2 flex-col items-center justify-center">
          <div className="bg-black flex justify-center  items-center     size-20 rounded-full ">
            <span className=" text-white font-bold text-5xl flex justify-center  items-center ">
              {firstName[0]}
            </span>
          </div>
          <div className="text-4xl font-medium">{firstName}</div>
          <div className="font-roboto text-lg">Guest</div>
        </div>

        <div className=" flex  flex-col justify-center w-1/2">
          <span className="text-3xl">7</span>
          <div className="font-semibold">Months on airbnb</div>
        </div>
      </div>

      <div className=" rounded-2xl shadow-lg py-16 px-8 flex flex-col mt-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-semibold text-3xl mb-4">
            {firstName}'s confirmed information
          </h1>
          <span className="flex  gap-5 items-center">
            {email ? (
              <FontAwesomeIcon className="size-6" icon={faCheck} />
            ) : (
              <FontAwesomeIcon className="size-6" icon={faXmark} />
            )}
            Email Address
          </span>
          <span className="flex  gap-5 items-center">
            {phone ? (
              <FontAwesomeIcon className="size-6" icon={faCheck} />
            ) : (
              <FontAwesomeIcon className="size-6" icon={faXmark} />
            )}{" "}
            Phone number{" "}
          </span>{" "}
        </div>
        <hr />
        <div className="flex flex-col mt-8 gap-4">
          <h1 className="font-semibold text-3xl">Verify your identity</h1>
          <p className="text-gray-600">
            Before you book or host on Airbnb, you’ll need to complete this
            step.
          </p>
          <button className="px-6 py-3 border border-black rounded-lg w-fit text-xl font-medium">
            Get verified
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsLeft;
