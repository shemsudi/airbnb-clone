interface DescriptionInputProps {
  description: string;
  onChange: (value: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  onChange,
}) => (
  <div className="sm:min-w-[500px] flex flex-col justify-center mx-6">
    <h1 className="text-2xl">Create your description</h1>
    <small className="text-gray-600">
      Share what makes your place special.
    </small>
    <textarea
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-40 border border-gray-300 rounded-lg p-2 mt-4"
      value={description}
      maxLength={600}
    />
    <small>{description.length}/600</small>
  </div>
);

export default DescriptionInput;
