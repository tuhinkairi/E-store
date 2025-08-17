// src/hooks/useValidateToken.ts
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import getUser from "../axios/auth/getUser";
import { setLoading } from "../store/features/GlobalSlice";
import { logout, setUserAuth } from "../store/features/UserSlice";
import { useNavigate } from "react-router-dom";

export const useValidateToken = () => {
    const token = useAppSelector((state) =>
        state.user?.token ? state.user?.token : state.user
    )?.toString();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector((s) => s.user);
    const [isValid, setIsValid] = useState<boolean>(!!userData?.isLoggedIn);
    const loading = useAppSelector((s) => s.loading.isLoading);
    const [error, setError] = useState<string | null>(null);

    const validate = useCallback(async () => {
        // 🚀 Short-circuit if already logged in
        if (userData?.isLoggedIn) {
            setIsValid(true);
            return;
        }

        if (!token) {
            setIsValid(false);
            setError("No token found");
            navigate("/login");
            return;
        }

        dispatch(setLoading(true));
        setError(null);

        try {
            const response = await getUser();

            if (response) {
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
        }
    }, [token, userData?.isLoggedIn, navigate, dispatch]);

    useEffect(() => {
        validate();
        dispatch(setLoading(false));
    }, [validate, dispatch]);

    return { isValid, userData, loading, error, refetch: validate };
};
