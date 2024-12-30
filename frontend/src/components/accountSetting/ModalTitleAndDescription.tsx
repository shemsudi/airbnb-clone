const ModalTitleAndDescription = ({
  question,
  description,
}: {
  question: string;
  description: string;
}) => {
  return (
    <>
      <h1 className="text-3xl font-medium">{question}</h1>
      <p className="tracking-wide text-start text-lg text-neutral-500 font-medium">
        {description}
      </p>
    </>
  );
};

export default ModalTitleAndDescription;
