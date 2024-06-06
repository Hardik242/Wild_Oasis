import {useMutation, useQueryClient} from "@tanstack/react-query";
import {insertEditCabin} from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
    const queryClient = useQueryClient();

    const {isLoading: isEditing, mutate: editCabin} = useMutation({
        mutationFn: ({newCabinData, id}) => insertEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin Successfully Edited");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {isEditing, editCabin};
}
