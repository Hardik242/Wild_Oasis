import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings";
import {useSearchParams} from "react-router-dom";

export default function useBooking() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filterValue = searchParams.get("status");
    const sortValue = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortValue.split("-");

    const filter =
        !filterValue || filterValue === "all"
            ? null
            : {field: "status", value: filterValue, method: "eq"};

    const sortBy = {field, direction};

    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const {isLoading, data: {data: bookings, count} = {}} = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({filter, sortBy, page}),
    });

    return {isLoading, bookings, count};
}
