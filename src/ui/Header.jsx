import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
    position: relative;
    background-color: var(--color-grey-0);
    border-bottom: 1px solid var(--color-grey-200);
`;

function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
        </StyledHeader>
    );
}

export default Header;
