import {useMutation, useQueryClient} from "@tanstack/react-query";
import {insertEditCabin} from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
    const queryClient = useQueryClient();

    const {isLoading: isCreating, mutate: createCabin} = useMutation({
        mutationFn: insertEditCabin,
        onSuccess: () => {
            toast.success("New Cabin Successfully Added");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {isCreating, createCabin};
}
