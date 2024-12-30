import { useEffect, useRef } from "react";

const ModalWrapper: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 z-10 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
