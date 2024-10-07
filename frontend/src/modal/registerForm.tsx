import { Link } from "react-router-dom";

interface RegisterFormProps {
  handleRegistrationSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    birthday?: string;
  };
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  birthday: string;
  setBirthday: (birthday: string) => void;
  loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleRegistrationSubmit,
  errors,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  birthday,
  setBirthday,
  loading,
}) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={handleRegistrationSubmit}
      noValidate
    >
      {errors.firstName && (
        <div className="flex gap-3  mb-4 border border-gray-300  p-2 rounded-xl">
          <svg
            className="w-10 h-10 fill-red-800 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <div className="flex flex-col">
            <h1>Let's try that again</h1>
            <p className=" text-sm text-gray-500">{errors.firstName}</p>
          </div>
        </div>
      )}
      <div className="mb-3">Legal name</div>
      <div className="flex flex-col border border-gray-300 rounded-md p-1">
        <label
          htmlFor="firstName"
          className={`text-gray-500 text-sm ${
            errors.firstName ? "text-red-700" : ""
          }`}
        >
          First name on id{" "}
        </label>
        <input
          className="focus:outline-none focus:ring-0"
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        />
      </div>
      <div className="flex flex-col border border-t-0  border-gray-300 rounded-md rounded-l-none  p-1 ">
        <label
          htmlFor="lastName"
          className={`text-gray-500 text-sm ${
            errors.firstName && errors.lastName ? "text-red-700" : ""
          }`}
        >
          Last name on id{" "}
        </label>
        <input
          className="focus:outline-none focus:ring-0"
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
        />
      </div>
      {errors.firstName && (
        <div className="flex mb-4">
          <svg
            className="w-3 h-3 self-center fill-red-800 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        </div>
      )}

      <div className="mb-2 mt-3">Date of Birth</div>
      <div className="flex flex-col border border-gray-300 rounded-md p-1">
        <label
          htmlFor="birthday"
          className={`text-sm text-gray-500 ${
            errors.birthday ? "text-red-500" : ""
          }  `}
        >
          Birthday{" "}
        </label>
        <input
          className="focus:outline-none focus:ring-0"
          id="birthday"
          name="birthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
      </div>
      {errors.birthday && (
        <div className="flex mb-4">
          <svg
            className="w-5 h-5 self-start pt-1 fill-red-800 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <p className="text-red-500 text-sm">{errors.birthday}</p>
        </div>
      )}
      {!errors.birthday && (
        <p className="text-sm text-gray-500 mb-4">
          To sign up, you need to be at least 18. Your birthday won’t be shared
          with other people who use Airbnb.
        </p>
      )}
      <div className="mb-2">Contact info</div>
      <div className="flex flex-col border border-gray-300 rounded-md p-1">
        <label
          htmlFor="email"
          className={`text-sm text-gray-500 ${
            errors.birthday ? "text-red-500" : ""
          }  `}
        >
          Email{" "}
        </label>
        <input
          className="focus:outline-none focus:ring-0"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      {errors.email && (
        <div className="flex mb-4">
          <svg
            className="w-3 h-3 self-center fill-red-800 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <p className="text-red-500 text-sm">{errors.email}</p>
        </div>
      )}
      <div className="text-sm text-gray-500 mb-4">
        We'll email you trip confirmations and receipts.
      </div>
      <div className=" flex  mb-4">
        <p className="text-sm  text-gray-700">
          By selecting Agree and continue, I agree to Airbnb’s{" "}
          <span>
            <Link to={""} className="underline text-blue-500">
              Terms of Service,
            </Link>
            <Link to={""} className="underline text-blue-500">
              Payments Terms of Service
            </Link>
            , and
            <Link to={""} className="underline text-blue-500">
              Nondiscrimination Policy
            </Link>{" "}
            and acknowledge the{" "}
            <Link to={""} className="underline text-blue-500">
              Privacy Policy
            </Link>
          </span>
          .
        </p>
      </div>

      <button
        disabled={loading}
        className={` ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }bg-pink-600 p-2 rounded-xl mb-3 hover:bg-pink-700  `}
        type="submit"
      >
        Agree and Continue
      </button>
    </form>
  );
};

export default RegisterForm;
