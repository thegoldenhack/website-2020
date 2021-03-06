import React from "react";

const strings = {
  application: {
    notComplete: "The following fields have not been completed or are invalid:",
    invalidPhoneNumber: "Invalid phone number entered",
    invalidBirthDate: "Invalid birthday entered",
    invalidGithubURL: "Invalid GitHub URL entered",
    invalidLinkedInURL: "Invalid LinkedIn URL entered",
    invalidDribbbleURL: "Invalid Dribbble URL entered",
    invalidPersonalURL: "Invalid Personal URL entered",
    invalidResumeURL: "Invalid Resume URL entered",
    overCharLimit: "Over 1000 character limit for 'Why Golden Hack'",
    submitSuccessful: "Successfully submitted application!",
    saveSuccessful: "Successfully saved application!",
    submitUnsuccessful:
      "There was a problem submitting your application. Please try again later.",
    saveUnsuccessful:
      "There was a problem saving your application. Please try again later.",
  },
  confirmAccount: {
    confirmFailure:
      "An error occurred. Please ensure that you entered the correct confirmation code.",
    confirmSuccess: [
      "You have successfully confirmed your registration! Please click ",
      <a href="/login">here</a>,
      " to login to your account.",
    ],
    confirmationCodeFailure:
      "Please ensure that the confirmation code that you entered is 6 digits long.",
  },
  forgotPassword: {
    noCode: [
      "You haven't requested to change your password! Please click ",
      <a href="/forgotpassword">here</a>,
      " to begin the password reset process.",
    ],
    noMatch: "Please ensure that passwords match.",
    somethingWentWrong:
      "Please ensure that your password is at least 7 characters long, has at least one capital letter and at least one digit.",
    success: [
      "You have successfully changed your password! Please click ",
      <a href="/login">here</a>,
      " to login to your account.",
    ],
    recoveryCodeError:
      "Please ensure that you have entered the correct recovery code.",
    badEmail: "Please enter a valid email.",
    tooManyAttempts: "You have try too many times. Please try again later.",
  },
  login: {
    incorrectLoginDetails: "Email or Password is Incorrect.",
  },
  register: {
    notComplete: "Not all fields have been filled out.",
    passwordsDontMatch: "Password fields do not match",
    genericError: "Oops! An error occurred on our end. Please try again later.",
    passwordPolicy:
      "Please ensure that your password is at least 7 characters long, has at least one capital letter and at least one digit.",
    emailAlreadyExists: "An account with this email already exists.",
  },
  rsvp: {
    submitUnsuccessful: "There was a problem submitting your RSVP response. Please try again later.",
    submitSuccessful: "RSVP response successfully submitted!"
  }
};

export default strings;
