import { useState } from "react";
import { useSelector } from "react-redux";
import { selectModals } from "../redux/ModalReducer.js";

import Step1 from "./step1.js";
import Step2 from "./step2.js";
import Step3 from "./step3.js";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+251");

  const { isSignUp_LoginPageOpen, isLoginPage, isVerifyPage, isSignupPage } =
    useSelector(selectModals);

  console.log(isSignUp_LoginPageOpen, isLoginPage, isVerifyPage, isSignupPage);

  return (
    isSignUp_LoginPageOpen && (
      <div
        className={`fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 z-10`}
      >
        {isLoginPage && (
          <Step1
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
          />
        )}
        {isVerifyPage && (
          <Step2 phoneNumber={phoneNumber} countryCode={countryCode} />
        )}
        {isSignupPage && (
          <Step3 phoneNumber={phoneNumber} countryCode={countryCode} />
        )}
      </div>
    )
  );
};

export default Signup;
