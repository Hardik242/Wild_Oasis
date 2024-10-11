import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
    position: relative;
    background-color: var(--color-grey-0);
    padding: 0.5rem 4.5rem;
    border-bottom: 1px solid var(--color-grey-200);
    height: 7rem;
`;

function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            {/* <HeaderMenu /> */}
        </StyledHeader>
    );
}

export default Header;
