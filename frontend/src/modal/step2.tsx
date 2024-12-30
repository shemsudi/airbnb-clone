import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import { verifyOtp } from "../redux/authAction.js";
import { useAppDispatch, useAppSelector } from "../redux/store.js";
import { closeVerifyPage, openLoginPage } from "../redux/ModalReducer.js";

import {
  selectCurrentError,
  //   selectLoading,
  setErrors,
} from "../redux/AuthReducer.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import ModalWrapper from "./modalWrapper.js";

interface Step2Props {
  countryCode: string;
  phoneNumber: string;
}

const Step2: React.FC<Step2Props> = (props) => {
  // const user = useSelector((state) => state.auth.user);
  const [otp, setOtp] = useState("");
  const errors = useAppSelector(selectCurrentError) || {};
  //   const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const handleVerifyOtp = async () => {
    console.log(props.countryCode, props.phoneNumber);
    const fullPhoneNumber = props.countryCode + props.phoneNumber;
    const formData: { phoneNumber: string; enteredOtp: string } = {
      phoneNumber: fullPhoneNumber,
      enteredOtp: otp,
    };
    console.log(formData);

    await dispatch(verifyOtp(formData)).unwrap();
  };
  function backToStep1() {
    dispatch(closeVerifyPage());
    dispatch(openLoginPage());
    dispatch(setErrors({}));
  }

  return (
    <ModalWrapper onClose={backToStep1}>
      <div className=" fixed  w-full h-1/2 md:h-auto  md:w-1/3 bottom-0  md:top-1/2 md:left-1/2 rounded-xl border shadow-md bg-white md:-translate-x-1/2 md:-translate-y-1/2">
        <div className=" flex flex-col h-full justify-between">
          <div className="flex p-3 justify-between ">
            <button onClick={backToStep1}>
              <FontAwesomeIcon icon={faBackward} className="w-6 h-6" />
            </button>

            <div>Confirm your Number</div>
            <div></div>
          </div>
          <hr />
          <div className="flex flex-col p-3">
            <p className="text-sm m-2">
              Enter the code we sent over SMS to{" "}
              {props.countryCode + " " + props.phoneNumber}:
            </p>

            <Form>
              <div className="mb-4 flex flex-col items-start">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-3 w-40 ml-2 p-2  border border-gray-300 rounded-md"
                  maxLength={6}
                />
                {errors.Otp && (
                  <div className="text-red-500 text-sm p-2 ">{errors.Otp}</div>
                )}
              </div>
            </Form>
          </div>

          <hr />
          <div className="flex m-1   justify-between p-3">
            <Link
              to={""}
              onClick={backToStep1}
              className="underline self-center"
            >
              More Options
            </Link>
            <button
              className=" bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-xl  "
              onClick={handleVerifyOtp}
            >
              continue
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Step2;
