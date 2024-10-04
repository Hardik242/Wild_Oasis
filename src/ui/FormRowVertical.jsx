import styled, {css} from "styled-components";

const StyledFormRow = styled.div`
    display: flex;
    gap: 0.8rem;
    padding: 1.2rem 0;

    ${(props) =>
        props.type === "show" &&
        css`
            flex-direction: row;
            margin-left: 1rem;
            margin-top: -1rem;
        `}

    ${(props) =>
        props.type === "regular" &&
        css`
            flex-direction: column;
        `}
`;

StyledFormRow.defaultProps = {
    type: "regular",
};

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function FormRowVertical({label, error, children, type}) {
    if (type === "show")
        return (
            <StyledFormRow type={type}>
                {children}
                {label && <Label htmlFor={children.props.id}>{label}</Label>}
            </StyledFormRow>
        );
    return (
        <StyledFormRow type={type}>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRow>
    );
}

export default FormRowVertical;
