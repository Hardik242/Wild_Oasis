import styled from "styled-components";
import Button from "./Button";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useLogout} from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
    const {isLoading, logout} = useLogout();

    return (
        <StyledHeader>
            <Button onClick={logout} disabled={isLoading}>
                {isLoading ? (
                    <SpinnerMini />
                ) : (
                    <>
                        Logout <HiArrowRightOnRectangle />
                    </>
                )}
            </Button>
        </StyledHeader>
    );
}

export default Header;
