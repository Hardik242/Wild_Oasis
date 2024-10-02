import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings";

export default function useDeleteBooking() {
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deletebooking} = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success(`Booking has been successfully deleted`);
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return {isDeleting, deletebooking};
}
