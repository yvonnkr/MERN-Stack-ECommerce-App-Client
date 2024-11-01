import {Link} from "react-router-dom";
import {useState} from "react";
import CommonForm from "@/components/common/form.jsx";
import {registerFormControls} from "@/config/index.js";

const initialState = {
    userName: "",
    email: "",
    password: ""
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);

    }


    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
                <p className="mt-2">
                    Already have an account?
                    <Link to="/auth/login" className="ml-2 font-bold text-blue-700 hover:text-accent-foreground">
                        Login
                    </Link>
                </p>
            </div>

            <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Sign Up"}
                onSubmit={handleSubmit}
            />

        </div>
    );
}

export default AuthRegister;