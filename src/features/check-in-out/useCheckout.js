import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings";
import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";

export function useCheckout() {
    const queryClient = useQueryClient();
    //     const navigate = useNavigate();

    const {isLoading: isCheckingout, mutate: checkout} = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} Successfully Checked-out`);
            queryClient.invalidateQueries({active: true});
            // navigate("/app");
        },
        onError: () => {
            toast.error("There was an error while checking in");
        },
    });

    return {isCheckingout, checkout};
}
