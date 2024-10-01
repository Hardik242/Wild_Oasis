import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

const StyledConfirmDelete = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

export default function ConfirmCheckOut({
    resourceName,
    onConfirm,
    disabled,
    onCloseModal,
}) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Check Out {resourceName}</Heading>
            <p>
                Are you sure you want to Check Out this {resourceName}{" "}
                permanently? This action cannot be undone.
            </p>

            <div>
                <Button
                    variation="secondary"
                    onClick={onCloseModal}
                    disabled={disabled}>
                    Cancel
                </Button>
                <Button
                    variation="primary"
                    onClick={() => {
                        onConfirm();
                        onCloseModal();
                    }}
                    disabled={disabled}>
                    Check out
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}
