// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import CommonForm from "@/components/common/form.jsx";
import {registerFormControls} from "@/config/index.js";
import {useDispatch} from "react-redux";
import {registerUser} from "@/store/auth-slice/index.js";
import {useToast} from "@/hooks/use-toast.js";

const initialState = {
    userName: "",
    email: "",
    password: ""
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData))
            .then((data) => {
                if (data?.payload?.success) {
                    toast({title: data?.payload?.message})
                    navigate("/auth/login")
                } else {
                    toast({title: data?.payload?.message || "server error", variant: "destructive"})
                }
            });

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

            <p className="italic">
                To test this app you can either register as a new user and login OR just login with the following
                credentials for user role or admin role:
            </p>
            <p>Email: <span className="text-blue-700 ml-2 mr-2 italic">testuser@test.com</span>
                Password: <span className="text-blue-700 ml-2">test%pwrd</span>

            </p>
            <i>Email: <span className="text-blue-700 ml-2 mr-2 italic">testadmin@test.com</span>
                Password: <span className="text-blue-700 ml-2">test%pwrd</span>
            </i>

        </div>
    );
}

export default AuthRegister;