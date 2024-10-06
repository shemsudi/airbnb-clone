import { isLength } from "validator";
import isEmpty from "./is-empty.js";
// @ts-ignore
import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";

interface ValidatePhoneNumberData {
  countryCode: string;
  phoneNumber: string;
}

interface ValidationResult {
  errors: {
    phoneNumber?: string;
    longPhoneNumber?: string;
    invalidPhoneNumber?: string;
  };
  isValid: boolean;
}

export default function validatePhoneNumber(
  data: ValidatePhoneNumberData
): ValidationResult {
  const { countryCode, phoneNumber } = data;
  let errors: {
    phoneNumber?: string;
    longPhoneNumber?: string;
    invalidPhoneNumber?: string;
  } = {};
  console.log(data);
  const fullPhoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(
    countryCode + phoneNumber
  );
  console.log(phoneNumber);
  if (isEmpty(phoneNumber)) {
    errors.phoneNumber = "Phone number is required.";
  } else if (isLength(phoneNumber, { max: 5 })) {
    errors.phoneNumber =
      "Phone number is too short or contains invalid characters.";
  } else if (isLength(countryCode + phoneNumber, { min: 15 })) {
    errors.longPhoneNumber =
      "That phone number is either too short or too long. Make sure you've entered the right number and try again.";
  } else if (!fullPhoneNumber || !fullPhoneNumber.isValid()) {
    errors.invalidPhoneNumber =
      "We can't send a code to this phone number. Try different one.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
