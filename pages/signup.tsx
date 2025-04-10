import SignUpForm from "../components/SignUpForm"

const NewUser = () => {
  const newUserForm = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  };
  return <SignUpForm formId="user-sign-up" signUpForm={newUserForm} />
}

export default NewUser;
