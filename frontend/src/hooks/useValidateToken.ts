import { useEffect, useState, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import getUser from "../axios/auth/getUser";
import { setLoading } from "../store/features/GlobalSlice";
import { logout, setUserAuth } from "../store/features/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import getWishlist from "../axios/user/getWishlist";
import getUserOrders from "../axios/order/getOrders";

export const useValidateToken = () => {
    const token = useAppSelector((state) =>
        state.user === null ? null : state.user?.token ? state.user?.token : state.user?.toString())
    
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector((s) => s.user);
    const loading = useAppSelector((s) => s.loading.isLoading);
    
    const [isValid, setIsValid] = useState<boolean>(!!userData?.isLoggedIn);
    const [error, setError] = useState<string | null>(null);
    
    const isExecutingRef = useRef(false);
    
    const validateAndFetchData = useCallback(async (forceValidation = false) => {
        if (isExecutingRef.current) return;
        
        if (!forceValidation && userData?.isLoggedIn) {
            setIsValid(true);
            return;
        }

        if (!token) {
            setIsValid(false);
            setError("No token found");
            if (location.pathname.includes('/dashboard')) {
                navigate("/login");
            }
            return;
        }

        isExecutingRef.current = true;
        dispatch(setLoading(true));
        setError(null);
        
        try {
            const userResponse = await getUser();

            if (userResponse) {
                // Fetch additional data in parallel
                const [wishlist, orders] = await Promise.allSettled([
                    getWishlist(),
                    getUserOrders()
                ]);

                // Create new user object instead of mutating
                const completeUser = {
                    ...userResponse,
                    token,
                    isLoggedIn: true,
                    ...(wishlist.status === 'fulfilled' && wishlist.value ? { wishlist: wishlist.value } : {}),
                    ...(orders.status === 'fulfilled' && orders.value ? { orders: orders.value } : {})
                };
                
                dispatch(setUserAuth(completeUser));
                setIsValid(true);
            } else {
                setIsValid(false);
                setError("Token validation failed");
                dispatch(logout());
            }
        } catch (err: any) {
            setIsValid(false);
            setError(err?.message || "Request failed");
            dispatch(logout());
            // console.log(err);
        } finally {
            dispatch(setLoading(false));
            isExecutingRef.current = false;
        }
    }, [dispatch, token, navigate, location.pathname, userData?.isLoggedIn]);

    useEffect(() => {
        const isDashboardRoute = location.pathname.includes('/dashboard');
        const shouldValidate = isDashboardRoute || !userData?.isLoggedIn;
        
        if (shouldValidate) {
            validateAndFetchData(isDashboardRoute);
        }
        
        dispatch(setLoading(false));
    }, [validateAndFetchData, location.pathname, userData?.isLoggedIn, dispatch]);

    return { isValid, userData, loading, error };
};