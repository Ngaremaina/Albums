import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegisterUserErrors } from "../../helpers/UserValidation";
import FormTemplate from "../../components/forms/FormTemplate";
import InputField from "../../components/forms/InputTemplate";
import { registerUser } from "../../services/Users";
import { RegisterRequest } from "../../models/requests/UserRequest";

function RegisterUser(){
    const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState<RegisterRequest>({
    name: '',
    username: '',
    emailAddress: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    emailAddress: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const validateForm = () => {
    let valid = true;
    const newErrors: RegisterUserErrors = {
      name: '',
      username: '',
      emailAddress: '',
      password: '',
    };
  
    if (!registerForm.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!registerForm.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    
    if (!registerForm.emailAddress.trim()) {
      newErrors.emailAddress = 'Email Address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerForm.emailAddress)) {
      newErrors.emailAddress = 'Email Address is invalid';
      valid = false;
    }
    if (!registerForm.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }
  
    setErrors(newErrors); 
    return valid;
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const data = registerUser(registerForm,  navigate)
      console.log(data)
      
    }
  };

    return(
        <FormTemplate handleSubmit={handleSubmit} heading="Register User">
            <InputField
                name="name"
                id="name"
                placeholder="John Doe"
                value={registerForm.name}
                onChange={handleChange}
                label="Your Full Names"
                type="text"
                error={errors.name}
            />

            <InputField
                name="username"
                id="username"
                placeholder="johndoe"
                value={registerForm.username}
                onChange={handleChange}
                label="Your Username"
                type="text"
                error={errors.username}
            />
            <InputField
                name="emailAddress"
                id="emailAddress"
                placeholder="johndoe@example.com"
                value={registerForm.emailAddress}
                onChange={handleChange}
                label="Your Email Address"
                type="email"
                error={errors.emailAddress}
            />
            <InputField
                name="password"
                id="password"
                placeholder="********"
                value={registerForm.password}
                onChange={handleChange}
                label="Your Password"
                type="password"
                error={errors.password}
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
            </p>
        </FormTemplate>
    )

}

export default RegisterUser;