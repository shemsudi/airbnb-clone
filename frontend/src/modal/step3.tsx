// src/components/Step3.js

import { useState } from "react";
import { closeSignUpPage, openLoginPage } from "../redux/ModalReducer";
// import { setErrors } from "../redux/errorReducer";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { registerUser } from "../redux/authAction";
import {
  selectCurrentError,
  selectLoading,
  setErrors,
} from "../redux/AuthReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "./registerForm";
import ModalWrapper from "./modalWrapper";

interface Step3Props {
  countryCode: string;
  phoneNumber: string;
}

const Step3: React.FC<Step3Props> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [optOutMarketing, setOptOutMarketing] = useState(false); // New state for the checkbox
  const errors = useAppSelector(selectCurrentError) || {};
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  function backToStep1() {
    dispatch(closeSignUpPage());
    dispatch(openLoginPage());
    dispatch(setErrors({}));
  }

  const handleRegistrationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const fullPhoneNumber = props.countryCode + props.phoneNumber;

    interface FormData {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      email: string;
      birthday: string;
      optOutMarketing: boolean;
    }

    const formData: FormData = {
      phoneNumber: fullPhoneNumber,
      firstName,
      lastName,
      email,
      birthday,
      optOutMarketing,
    };

    await dispatch(registerUser(formData)).unwrap();
  };
  function backToStep2() {
    dispatch(closeSignUpPage());
    dispatch(openLoginPage());
  }
  return (
    <ModalWrapper onClose={backToStep1}>
      <div
        onScroll={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className=" fixed  w-full md:max-w-xl z-50 h-5/6 bottom-0  md:top-1/2 md:left-1/2 rounded-xl border shadow-md bg-white md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between p-3 mb-1">
            <button onClick={backToStep2}>
              <FontAwesomeIcon icon={faBackward} className="w-6 h-6" />
            </button>
            <div>Finsh singning up</div>
            <div></div>
          </div>
          <hr />
          <div className="flex flex-col p-3    overflow-y-scroll">
            <RegisterForm
              handleRegistrationSubmit={handleRegistrationSubmit}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              birthday={birthday}
              setBirthday={setBirthday}
              errors={errors}
              loading={loading}
            />
            <hr />
            <div className="mt-3 text-sm text-gray-700 mb-3">
              Airbnb will send you members-only deals, inspiration, marketing
              emails, and push notifications. You can opt out of receiving these
              at any time in your account settings or directly from the
              marketing notification.
            </div>
            <div className="flex items-center mb-4">
              <input
                id="optOutMarketing"
                name="optOutMarketing"
                type="checkbox"
                checked={optOutMarketing}
                onChange={(e) => setOptOutMarketing(e.target.checked)}
                className="mr-2"
              />
              <label
                htmlFor="optOutMarketing"
                className="text-sm text-gray-700"
              >
                I don’t want to receive marketing messages from Airbnb.
              </label>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
export default Step3;
