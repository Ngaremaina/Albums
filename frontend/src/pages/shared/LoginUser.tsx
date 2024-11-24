import FormTemplate from "../../components/forms/FormTemplate";
import InputField from "../../components/forms/InputTemplate";
import { useContext, useState } from "react";
import { AuthContext } from "../../helpers/authContext";
import { LoginUserValidationErrors } from "../../helpers/UserValidation";
import ProgressSpinner from "../../components/loader/ProgressSpinner";
import { Link } from "react-router-dom";

function LoginUser(){
    const { handleLogin, isLoading } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        emailAddress: "",
        password: ""
    });

    const [errors, setErrors] = useState<LoginUserValidationErrors>({
        emailAddress: '',
        password: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors: LoginUserValidationErrors = {
            emailAddress: '',
            password: '',
        };
      
        if (!loginForm.emailAddress.trim()) {
            newErrors.emailAddress = 'Email Address is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(loginForm.emailAddress)) {
            newErrors.emailAddress = 'Email Address is invalid';
            valid = false;
        }
      
        if (!loginForm.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (loginForm.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }
      
        setErrors(newErrors); // Set the validation errors
        return valid;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.name;
        const value = event.target.value;

        setLoginForm({ ...loginForm, [input]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateForm()) {
            handleLogin(loginForm.emailAddress, loginForm.password);
        } else {
            console.log('Login form is invalid, show errors.');
        }
    };

    return(
        <>
            {isLoading ? (
                <ProgressSpinner/>
            ) : (
                <FormTemplate handleSubmit={handleSubmit} heading="Login User">
                    <InputField
                        name="emailAddress" 
                        id="emailAddress" 
                        placeholder="johndoe@example.com" 
                        value={loginForm.emailAddress}
                        onChange={handleChange}
                        label="Your Email"
                        type="email"
                        error={errors.emailAddress}  
                    />

                    <InputField
                        name="password" 
                        id="password" 
                        placeholder="********" 
                        value={loginForm.password}
                        onChange={handleChange}
                        label="Your Password"
                        type="password"
                        error={errors.password}  
                    />

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </FormTemplate>
            )}
        </>
    )
}

export default LoginUser;