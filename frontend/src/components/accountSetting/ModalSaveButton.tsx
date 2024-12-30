const ModalSaveButton = ({
  handleSave,
  isLoading,
}: {
  handleSave: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="pt-3 flex justify-end border-t">
      <button
        type="button"
        onClick={handleSave}
        disabled={isLoading}
        aria-busy={isLoading}
        className={`px-4 py-3 w-28 text-white font-bold text-xl rounded-lg cursor-pointer ${
          isLoading ? "bg-neutral-800 cursor-not-allowed" : "bg-slate-950"
        }`}
      >
        {isLoading ? "...." : "Save"}
      </button>
    </div>
  );
};

export default ModalSaveButton;
