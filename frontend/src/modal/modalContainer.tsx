import { useSelector } from "react-redux";
import Signup from "./signup";
import { selectModals } from "../redux/ModalReducer";

const ModalContainer = () => {
  const { isLoginPage, isVerifyPage, isSignupPage } = useSelector(selectModals);
  const isopen = isLoginPage || isVerifyPage || isSignupPage;

  return isopen ? <Signup /> : null;
};

export default ModalContainer;
