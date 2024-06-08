import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting as updateSettingApi} from "../../services/apiSettings";

export default function useUpdateSetting() {
    const queryClient = useQueryClient();

    const {isLoading: isUpdating, mutate: updateSetting} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Settings Successfully Edited");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {isUpdating, updateSetting};
}
