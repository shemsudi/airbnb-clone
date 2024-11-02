interface titleInputProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const TitleInput: React.FC<titleInputProps> = ({ title, onTitleChange }) => {
  return (
    <div className="flex flex-col md:min-w-[480px] mt-10  md:justify-center">
      <h1 className="text-2xl font-base">
        {" "}
        Now, let's give your house a title{" "}
      </h1>
      <small className="text-gray-600">
        Short titles work best. Have fun with it—you can always change it later.
      </small>
      <textarea
        onChange={(e) => onTitleChange(e.target.value)}
        className=" border border-gray-500 rounded-md p-2 mt-5 h-32"
        name=""
        id=""
        value={title}
        maxLength={32}
      ></textarea>
      <small>{title.length}/32</small>
    </div>
  );
};

export default TitleInput;
