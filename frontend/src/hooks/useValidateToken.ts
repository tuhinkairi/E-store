// src/hooks/useValidateToken.ts
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import getUser from "../axios/auth/getUser";
import { setLoading } from "../store/features/GlobalSlice";
import { logout, setUserAuth } from "../store/features/UserSlice";
import { useNavigate } from "react-router-dom";

export const useValidateToken = () => {
    const token = useAppSelector((state) => state.user?.token? state.user?.token: state.user)?.toString()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const userData = useAppSelector(s=> s.user)
    const loading = useAppSelector(s=>s.loading)
    const [error, setError] = useState<string | null>(null);

    const validate = useCallback(async () => {
        console.log(token)
        if (!token) {
            setIsValid(false);
            setError("No token found");
            navigate("/login")
            return;
        }

        dispatch(setLoading(true));
        setError(null);

        try {
            const response = await getUser()

            if (response) {
                response.token = token;
                response.isLoggedIn = true
                console.log("response",response)
                dispatch(setUserAuth(response));
                setIsValid(true);
            } else {
                setIsValid(false);
                setError(response ?? "Token validation failed");
                logout()
            }
        } catch (err: any) {
            setIsValid(false);
            setError(err?.message || "Request failed");
            logout()
        } finally {
            dispatch(setLoading(false));
        }
    }, [token, navigate,dispatch]);

    useEffect(() => {
        validate();
    }, [validate]);

    return { isValid, userData, loading, error, refetch: validate };
};
