import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings";

export default function useBooking() {
    const {isLoading, data: bookings} = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings,
    });

    return {isLoading, bookings};
}
