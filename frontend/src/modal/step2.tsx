import { useRef, useState, useEffect } from "react";
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
  const verifyModalref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        verifyModalref.current &&
        !verifyModalref.current.contains(event.target as Node)
      ) {
        backToStep1();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleVerifyOtp = async () => {
    console.log(props.countryCode, props.phoneNumber);
    const fullPhoneNumber = props.countryCode + props.phoneNumber;
    const formData = { phoneNumber: fullPhoneNumber, enteredOtp: otp };
    console.log(formData);

    try {
      await dispatch(verifyOtp(formData));
    } catch (error) {
      throw error;
    }
  };
  function backToStep1() {
    dispatch(closeVerifyPage());
    dispatch(openLoginPage());
    dispatch(setErrors({}));
  }

  return (
    <div
      ref={verifyModalref}
      className=" relative   w-1/3 top-1/2 left-1/2 rounded-xl border shadow-md bg-white -translate-x-1/2 -translate-y-1/2"
    >
      <div className=" flex flex-col">
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
          <Link to={""} onClick={backToStep1} className="underline self-center">
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
  );
};

export default Step2;
