import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useCheckIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {isLoading: isCheckingIn, mutate: checkIn} = useMutation({
        mutationFn: (id) =>
            updateBooking(id, {status: "checked-in", isPaid: true}),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} Successfully Checked-in`);
            queryClient.invalidateQueries({active: true});
            navigate("/app");
        },
        onError: () => {
            toast.error("There was an error while checking in");
        },
    });

    return {isCheckingIn, checkIn};
}
