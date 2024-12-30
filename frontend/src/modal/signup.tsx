import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectModals } from "../redux/ModalReducer";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+251");

  const { isLoginPage, isVerifyPage, isSignupPage } = useSelector(selectModals);

  // Reset phoneNumber and countryCode when modal step changes
  useEffect(() => {
    if (!isLoginPage && !isVerifyPage && !isSignupPage) {
      setPhoneNumber(""); // Clear state when modal is closed
      setCountryCode("+251"); // Reset to default country code
    }
  }, [isLoginPage, isVerifyPage, isSignupPage]);

  const modal = useMemo(() => {
    if (isLoginPage) {
      return (
        <Step1
          setPhoneNumber={setPhoneNumber}
          setCountryCode={setCountryCode}
        />
      );
    } else if (isVerifyPage) {
      return <Step2 phoneNumber={phoneNumber} countryCode={countryCode} />;
    } else if (isSignupPage) {
      return <Step3 phoneNumber={phoneNumber} countryCode={countryCode} />;
    }
    return null;
  }, [isLoginPage, isVerifyPage, isSignupPage, phoneNumber, countryCode]);

  return modal;
};

export default Signup;
