import styled, {css} from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

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

const style1 = {
    display: "flex",
    gap: "2px",
};

export default function CabinRow({cabin}) {
    const {isCreating, createCabin} = useCreateCabin();

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    function handleDuplicate() {
        createCabin({
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
            name: `Copy of ${name}`,
        });
    }

    const {isDeleting, deleteCabin} = useDeleteCabin();

    return (
        <>
            <TableRow role="row">
                {(isDeleting || isCreating) && (
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
                <div style={style1}>
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={cabinId} />

                            <Menus.List id={cabinId}>
                                <Menus.Button
                                    onClick={handleDuplicate}
                                    icon={<HiSquare2Stack />}>
                                    Duplicate
                                </Menus.Button>

                                <Modal.Open opens="edit-form">
                                    <Menus.Button icon={<HiPencil />}>
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens="delete-cabin">
                                    <Menus.Button icon={<HiTrash />}>
                                        Delete
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>

                            <Modal.Window name="edit-form">
                                <CreateCabinForm cabinToEdit={cabin} />
                            </Modal.Window>

                            <Modal.Window name="delete-cabin">
                                <ConfirmDelete
                                    resourceName="cabin"
                                    disabled={isDeleting}
                                    onConfirm={() => deleteCabin(cabinId)}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>
                </div>
            </TableRow>
        </>
    );
}
