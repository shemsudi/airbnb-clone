import { User } from "../../pages/userProfile";
import UserProfileData from "./UserProfileData";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./profileDataModal";
import ModalContent from "./modalContent";
import {
  userProfileQuestions,
  intialProfileData,
} from "../../data/profileData";
import DecadeIWasBornModal from "./DecadeIwasBornModal";
import AboutYouContent from "./AboutYouModalContent";
import WhereYouHaveBeen from "./whereYouHaveBeen";
import ProfilePhoto from "./ProfilePhoto";
import AboutYou from "./AboutYou";
import Interests from "./Interests";
import InterestsContent from "./interestsContent";

interface EditUserProps {
  profile: any;
  user: User;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUser: React.FC<EditUserProps> = ({ user, setEditMode, profile }) => {
  const doneRef = useRef<HTMLDivElement>(null);
  const [showDone, setShowDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [profileData, setProfileData] = useState(profile || intialProfileData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            setShowDone(true);
          } else {
            setShowDone(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (doneRef.current) {
      observer.observe(doneRef.current);
    }

    return () => {
      if (doneRef.current) {
        observer.unobserve(doneRef.current);
      }
    };
  }, [setShowDone]);
  const handleItemClick = useCallback(
    (questionTag: string) => {
      const details = userProfileQuestions[questionTag];

      if (details) {
        let content;

        if (questionTag === "decadeIWasBorn") {
          content = (
            <DecadeIWasBornModal
              title={details.title}
              tag={questionTag}
              description={details.description!}
              setProfileData={setProfileData}
              question={details.question!}
              allowedLength={details.allowedLength!}
              value={profileData[questionTag]}
              onclose={() => setIsModalOpen(false)}
            />
          );
        } else if (questionTag === "whatAreYouInto") {
          content = (
            <InterestsContent
              tag={questionTag}
              description={details.description!}
              setProfileData={setProfileData}
              question={details.question!}
              allowedLength={details.allowedLength!}
              value={profileData[questionTag] as string[]}
              onclose={() => setIsModalOpen(false)}
            />
          );
        } else if (questionTag === "aboutYou") {
          content = (
            <AboutYouContent
              tag={questionTag}
              description={details.description!}
              setProfileData={setProfileData}
              question={details.question!}
              allowedLength={details.allowedLength!}
              value={profileData[questionTag] || ""}
              onclose={() => setIsModalOpen(false)}
            />
          );
        } else {
          content = (
            <ModalContent
              title={details.title}
              tag={questionTag}
              description={details.description!}
              setProfileData={setProfileData}
              question={details.question!}
              allowedLength={details.allowedLength!}
              value={profileData[questionTag] || ""}
              onclose={() => setIsModalOpen(false)}
            />
          );
        }

        setModalContent(content);
      } else {
        setModalContent(<div>General modal content for {questionTag}</div>);
      }

      // Open the modal
      setIsModalOpen(true);
    },
    [profileData]
  );
  if (!user) return;

  return (
    <div className="flex relative flex-col md:flex-row mx-6 md:mx-12 xl:mx-28 mt-10">
      <ProfilePhoto
        profile={profileData}
        handleFileChange={setProfileData}
        firstLetter={user.firstName[0]}
      />

      <div className="flex flex-col w-full md:w-4/6 my-8 mx-2 ">
        <h1 className="text-4xl font-bold mb-5 ">Your profile</h1>
        <p className="text-gray-500 text-lg font-medium">
          The information you share will be used across Airbnb to help other
          guests and Hosts get to know you.{" "}
          <span className="underline text-gray-600">Learn more</span>
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-5">
          {Object.entries(userProfileQuestions)
            .slice(2)
            .map(([, question], index) => (
              <UserProfileData
                key={index}
                question={question}
                onClick={() => handleItemClick(question.tag)}
                value={profileData[question.tag] || ""}
              />
            ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={modalContent}
        />
        <AboutYou
          aboutYou={profileData.aboutYou}
          handleItemClick={handleItemClick}
        />
        <WhereYouHaveBeen
          setIsChecked={setProfileData}
          isCheked={profileData.whereYouHaveBeen}
        />

        <Interests
          handleItemClick={handleItemClick}
          interests={profileData.whatAreYouInto}
        />
        <div ref={doneRef} className="flex justify-end">
          <button
            onClick={() => setEditMode(false)}
            className="bg-black text-white font-bold py-3 px-5 rounded-xl mt-8 text-lg w-24"
          >
            {" "}
            Done
          </button>
        </div>
      </div>
      {showDone && (
        <div className="flex justify-end w-full fixed bottom-0 right-0 px-20 py-5 bg-white border-t">
          <button
            onClick={() => setEditMode(false)}
            className="bg-black text-white font-bold py-3 px-5 rounded-xl  text-lg w-24"
          >
            {" "}
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default EditUser;
