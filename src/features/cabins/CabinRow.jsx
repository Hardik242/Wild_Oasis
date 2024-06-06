import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin} from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import {useState} from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;
    position: relative;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

const SpinnerDiv = styled.div`
    position: absolute;
    backdrop-filter: blur(1.4px);
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function CabinRow({cabin}) {
    const [showForm, setShowForm] = useState(false);

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
    } = cabin;

    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate} = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success("Cabin successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return (
        <>
            <TableRow role="row">
                {isDeleting && (
                    <SpinnerDiv>
                        <Spinner variations="isDeleting" />
                    </SpinnerDiv>
                )}
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits upto {maxCapacity} people </div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}
                <div>
                    <button onClick={() => setShowForm((s) => !s)}>Edit</button>
                    <button onClick={() => mutate(cabinId)}>Delete</button>
                </div>
            </TableRow>
            {showForm && (
                <CreateCabinForm
                    setShowForm={setShowForm}
                    cabinToEdit={cabin}
                />
            )}
        </>
    );
}
