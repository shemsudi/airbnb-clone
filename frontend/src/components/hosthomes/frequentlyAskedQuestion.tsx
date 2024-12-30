import questions from "../../data/questions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FrequentlyAskedQuestion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggling the index between null and the current index
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-4 px-5 py-5 lg:px-40 md:px-10 md:py-16 w-full border-x-2 lg:mb-6">
      <div className="md:w-1/2 w-full pt-8 pb-12">
        <h1 className="text-4xl font-medium">Your questions,</h1>
        <h1 className="text-4xl font-medium">answered</h1>
      </div>
      <div className="md:w-1/2 w-full">
        {questions.map((question, index) => (
          <div key={index} className="flex flex-col">
            <div
              onClick={() => handleToggle(index)}
              className="flex justify-between w-full my-4 hover:cursor-pointer"
              aria-expanded={openIndex === index ? "true" : "false"} // Accessibility improvement
            >
              <h1 className="py-2 text-base">{question.question}</h1>
              <h1 className="text-3xl font-light self-center">
                <FontAwesomeIcon
                  icon={openIndex === index ? faChevronDown : faChevronUp}
                  className="h-5 w-5"
                />
              </h1>
            </div>
            {openIndex === index && (
              <p className="text-sm mb-3 text-justify text-gray-500">
                {question.answer}
              </p>
            )}
            {index < 4 && <div className="w-full border border-gray-200"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestion;
