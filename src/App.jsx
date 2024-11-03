import {Route, Routes} from "react-router-dom";
import AuthLayout from "@/components/auth/layout.jsx";
import AuthLogin from "@/pages/auth/login.jsx";
import AuthRegister from "@/pages/auth/register.jsx";
import AdminLayout from "@/components/admin-view/layout.jsx";
import AdminDashboard from "@/pages/admin-view/dashboard.jsx";
import AdminProducts from "@/pages/admin-view/products.jsx";
import AdminOrders from "@/pages/admin-view/orders.jsx";
import AdminFeatures from "@/pages/admin-view/features.jsx";
import ShoppingLayout from "@/components/shopping-view/layout.jsx";
import NotFound from "@/pages/not-found/index.jsx";
import ShoppingHome from "@/pages/shopping-view/home.jsx";
import ShoppingListing from "@/pages/shopping-view/listing.jsx";
import ShoppingCheckout from "@/pages/shopping-view/checkout.jsx";
import ShoppingAccount from "@/pages/shopping-view/account.jsx";
import CheckAuth from "@/components/common/check-auth.jsx";
import UnAuthPage from "@/pages/unauth-page/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAuth, logoutUser} from "@/store/auth-slice/index.js";
import Loader from "@/components/common/Loader.jsx";

function App() {

    const {isAuthenticated, user, isLoading} = useSelector(state => state.auth)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])


    if (isLoading) return <Loader/>


    return (
        <div className="flex flex-col overflow-hidden bg-white">
            <h1 onClick={() => dispatch(logoutUser())}>Header Component - Click to logout</h1>

            <Routes>
                <Route path="/"
                       element={<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>}
                />

                <Route path="/auth"
                       element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}
                >
                    <Route path="login" element={<AuthLogin/>}/>
                    <Route path="register" element={<AuthRegister/>}/>
                </Route>

                <Route path="/admin"
                       element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}
                >
                    <Route path="dashboard" element={<AdminDashboard/>}/>
                    <Route path="products" element={<AdminProducts/>}/>
                    <Route path="orders" element={<AdminOrders/>}/>
                    <Route path="features" element={<AdminFeatures/>}/>
                </Route>

                <Route path="/shop"
                       element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}
                >
                    <Route path="home" element={<ShoppingHome/>}/>
                    <Route path="listing" element={<ShoppingListing/>}/>
                    <Route path="checkout" element={<ShoppingCheckout/>}/>
                    <Route path="account" element={<ShoppingAccount/>}/>
                </Route>

                <Route path="/unauth-page" element={<UnAuthPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App
