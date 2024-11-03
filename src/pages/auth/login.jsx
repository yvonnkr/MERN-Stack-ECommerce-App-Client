// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

import CommonForm from "@/components/common/form.jsx";
import {useState} from "react";
import {loginFormControls} from "@/config/index.js";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useToast} from "@/hooks/use-toast.js";
import {loginUser} from "@/store/auth-slice/index.js";

const initialState = {
    email: "",
    password: ""
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const {toast} = useToast();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(formData))
            .then((data) => {
                if (data?.payload?.success) {
                    toast({title: data?.payload?.message})
                } else {
                    toast({title: data?.payload?.message || "server error", variant: "destructive"})
                }
            })
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

export default AuthLogin;