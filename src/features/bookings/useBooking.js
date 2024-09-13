import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings";
import {useSearchParams} from "react-router-dom";

export default function useBooking() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("status");

    const filter =
        !filterValue || filterValue === "all"
            ? null
            : {field: "status", value: filterValue, method: "eq"};

    const {isLoading, data: bookings} = useQuery({
        queryKey: ["bookings", filter],
        queryFn: () => getBookings({filter}),
    });

    return {isLoading, bookings};
}
