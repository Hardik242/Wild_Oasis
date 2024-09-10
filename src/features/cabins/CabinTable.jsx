import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Menus from "../../ui/Menus";
import {useSearchParams} from "react-router-dom";
import Empty from "../../ui/Empty";
import toast from "react-hot-toast";

const Table = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

const EmptyDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: large;
    padding: 1.2rem 0;
`;

export default function CabinTable() {
    const {isLoading, cabins} = useCabin();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (!cabins?.length)
        return (
            <EmptyDiv>
                <Empty resourceName="Cabins" />
            </EmptyDiv>
        );

    const filterValue = searchParams.get("discount") || "all";
    const sortBy = searchParams.get("sortBy") || "name-asc";

    let filteredCabins;
    switch (filterValue) {
        case "all":
            filteredCabins = cabins;
            break;
        case "with-discount":
            filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
            break;
        case "no-discount":
            filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
            break;
        default:
            filteredCabins = cabins;
            toast.error("Misspelled search parameter");
    }

    const [field, direction] = sortBy.split("-");

    const modifier = direction === "asc" ? 1 : -1;

    const sortedCabins =
        field !== "name"
            ? filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier)
            : direction === "asc"
            ? //If field is Name due to string
              filteredCabins?.sort((a, b) => a.name.localeCompare(b.name))
            : filteredCabins?.sort((a, b) => b.name.localeCompare(a.name));

    return (
        <>
            <Menus>
                <Table role="table">
                    <TableHeader role="row">
                        <div></div>
                        <div>Cabin</div>
                        <div>Capacity</div>
                        <div>Price</div>
                        <div>Discount</div>
                        <div></div>
                    </TableHeader>
                    {sortedCabins
                        // ?.sort((a, b) => a.name.localeCompare(b.name))
                        .map((cabin) => (
                            <CabinRow cabin={cabin} key={cabin.id} />
                        ))}
                </Table>
            </Menus>
        </>
    );
}
