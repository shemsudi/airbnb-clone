import validator from "validator";
import isEmpty from "./is-empty.js";

interface RegisterInput {
  birthday: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ValidationResult {
  errors: Record<string, string>;
  isValid: boolean;
}

export default function validateRegisterInput(
  data: RegisterInput
): ValidationResult {
  let errors: Record<string, string> = {};
  console.log(data.birthday);

  if (validator.isEmpty(data.birthday)) {
    errors.birthday = "Birthday is required";
  } else {
    const birthDate: Date = new Date(data.birthday);
    let age: number = new Date().getFullYear() - birthDate.getFullYear();
    const monthDifference: number =
      new Date().getMonth() - birthDate.getMonth();
    const dayDifference: number = new Date().getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 18) {
      errors.birthday =
        "You must be 18 or older to use Airbnb. Other people won’t see your birthday.";
    }
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
