import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings";
import {useSearchParams} from "react-router-dom";
import {globals} from "../../utils/globals";

export default function useBookings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const filterValue = searchParams.get("status");
    const sortValue = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortValue.split("-");
    let {PAGE_SIZE} = globals;

    //FILTER
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : {field: "status", value: filterValue, method: "eq"};

    //SORT
    const sortBy = {field, direction};

    //PAGINATION
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    //QUERY
    const {isLoading, data: {data: bookings, count} = {}} = useQuery({
        queryKey: ["bookings", filter, sortBy, page, PAGE_SIZE],
        queryFn: () => getBookings({filter, sortBy, page}),
    });

    //PREFETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1, PAGE_SIZE],
            queryFn: () => getBookings({filter, sortBy, page: page + 1}),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1, PAGE_SIZE],
            queryFn: () => getBookings({filter, sortBy, page: page - 1}),
        });

    return {isLoading, bookings, count};
}
