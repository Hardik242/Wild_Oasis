import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateUser as updateUserApi} from "../../services/apiAuth";

export default function useUpdateUser() {
    const queryClient = useQueryClient();

    const {isLoading: isUpdating, mutate: updateUser} = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            toast.success("User Data Successfully Updated");
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
        onError: () => {
            toast.error("There was an error while updating user data");
        },
    });

    return {isUpdating, updateUser};
}
