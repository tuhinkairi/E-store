import type { OnboardingResponse } from "../../types/login";
import type { UserProps } from "../../types/user";
import axiosClient from "../axiosClient";

export default async function onboarding(data: UserProps):Promise<OnboardingResponse | null> {
    const newUser = await axiosClient.post("/user/register", data)
    if (newUser.data) {
        return newUser.data
    }
    return null
}
