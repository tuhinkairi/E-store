// src/hooks/useValidateToken.ts
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
        state.user?.token ? state.user?.token : state.user
    )?.toString();
    
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector((s) => s.user);
    const loading = useAppSelector((s) => s.loading.isLoading);
    
    const [isValid, setIsValid] = useState<boolean>(!!userData?.isLoggedIn);
    const [error, setError] = useState<string | null>(null);
    
    // Use ref to prevent unnecessary re-renders
    const isExecutingRef = useRef(false);
    
    const validateAndFetchData = useCallback(async (forceValidation = false) => {
        // Prevent concurrent executions
        if (isExecutingRef.current) return;
        
        // Short-circuit if already logged in and not forcing validation
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
            const response = await getUser();

            if (response) {
                // Fetch additional data in parallel for better performance
                const [wishlist, orders] = await Promise.allSettled([
                    getWishlist(),
                    getUserOrders()
                ]);

                // Add wishlist if successful
                if (wishlist.status === 'fulfilled' && wishlist.value) {
                    response.wishlist = wishlist.value;
                }

                // Add orders if successful
                if (orders.status === 'fulfilled' && orders.value) {
                    response.orders = orders.value;
                }
                
                response.token = token;
                response.isLoggedIn = true;
                dispatch(setUserAuth(response));
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
        } finally {
            dispatch(setLoading(false));
            isExecutingRef.current = false;
        }
    }, [dispatch, token, navigate, location.pathname, userData?.isLoggedIn]);

    useEffect(() => {
        const isDashboardRoute = location.pathname.includes('/dashboard');
        
        // For dashboard routes, always validate the token
        // For other routes, only validate if not already logged in
        const shouldValidate = isDashboardRoute || !userData?.isLoggedIn;
        
        if (shouldValidate) {
            validateAndFetchData(isDashboardRoute);
        }
        
        // Set loading to false when component mounts
        dispatch(setLoading(false));
    }, [validateAndFetchData, location.pathname, userData?.isLoggedIn, dispatch]);

    return { isValid, userData, loading, error };
};