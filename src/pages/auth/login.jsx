import CommonForm from "@/components/common/form.jsx";
import {useState} from "react";
import {loginFormControls} from "@/config/index.js";
import {Link} from "react-router-dom";

const initialState = {
    email: "",
    password: ""
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);

    }


    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                <p className="mt-2">
                    Don't have an account?
                    <Link to="/auth/register" className="ml-2 font-bold text-blue-700 hover:text-accent-foreground">
                        Register
                    </Link>
                </p>
            </div>

            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Sign In"}
                onSubmit={handleSubmit}
            />

        </div>
    );
}

export default AuthLogin;