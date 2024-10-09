import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
    const {mutate: signUp, isLoading} = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            console.log(data);
            toast.success("Account Successfully created");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Unexpected error occured");
        },
    });

    return {signUp, isLoading};
}
