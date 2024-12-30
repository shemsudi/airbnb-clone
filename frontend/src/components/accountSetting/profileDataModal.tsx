import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const Modal = ({
  isOpen,
  onClose,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: JSX.Element | null;
}) => {
  const modalref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (!isOpen) {
  //     return;
  //   }
  //   const handleClick = (e: MouseEvent) => {
  //     if (modalref.current && !modalref.current.contains(e.target as Node)) {
  //       console.log("click outside");
  //       onClose();
  //     }
  //   };
  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [onClose, isOpen]);
  if (!isOpen) return null;

  return (
    <div
      ref={modalref}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-2/5 min-h-fit p-5 ">
        <div className="flex flex-col justify-start items-start ">
          <button
            className=" text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <FontAwesomeIcon className="size-5" icon={faClose} />
          </button>
          {/* Modal Content */}
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
