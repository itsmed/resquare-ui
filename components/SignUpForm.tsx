import React, { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Error from "next/error";

interface SignUpFormData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
}

interface Error {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
}

type Props = {
  formId: string;
  signUpForm: SignUpFormData;
}

const SignUpForm = ({ formId, signUpForm }) => {
  const router = useRouter();
  const contentType = "application/json"
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({});

  const [form, setForm] = useState({
    userName: signUpForm.userName,
    firstName: signUpForm.firstName,
    lastName: signUpForm.lastName,
    email: signUpForm.email,
    password: signUpForm.password,
    confirmPassword: signUpForm.confirmPassword,
    dob: signUpForm.dob,
  });

  const postData = async (form: SignUpFormData) => {
    try {
      const res = await fetch("/api/users/new", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json()
      if (!res.ok) {
        setMessage("failed to add user");
        setErrors({ ...errors, json })
      }

      // router.push("/");
    } catch (err) {
      setMessage("failed to add user");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = e.target;
    const name = target.name
    const value = target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const formValidate = () => {
    let err: Error = {};
    if (!form.userName) err.userName = "Username is required";
    if (!form.firstName) err.firstName = "First name is required";
    if (!form.lastName) err.lastName = "Last name is required";
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    if (!form.confirmPassword || form.confirmPassword !== form.password) err.confirmPassword = "Passwords do not match";
    if (!form.dob) err.dob = "Birthday is required";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length == 0) {
      postData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          maxLength={20}
          name="userName"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          maxLength={30}
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">lastName</label>
        <input
          type="text"
          maxLength={30}
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          maxLength={40}
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="dob">Birthday</label>
        <input
          type="date"
          maxLength={20}
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          maxLength={20}
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          maxLength={20}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <div>
        {
          Object.values(errors).map(err => {
            return Object.values(err).map((e: Any) => <li>{e}</li>)
          })
        }
      </div>
    </>
  )

}

export default SignUpForm;
