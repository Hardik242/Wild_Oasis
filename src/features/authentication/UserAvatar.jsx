import styled from "styled-components";
import {useUser} from "./useUser";
import HeaderMenu from "../../ui/HeaderMenu";
import {useState} from "react";

const StyledUserAvatar = styled.div`
    font-weight: 500;
    font-size: 1.4rem;
    padding: 1rem 1rem;
    color: var(--color-grey-600);
    float: right;
    margin-right: 2rem;
    position: relative;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;

    & span {
        text-transform: capitalize;
        font-size: 1.6rem;
        color: var(--color-grey-900);
    }
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-400);
    outline-offset: 1.5px;
`;

export default function UserAvatar() {
    const {user} = useUser();
    const {fullName, avatar} = user.user_metadata;
    const [isMenuActive, setIsMenuActive] = useState(false);

    function handleMenuToggle() {
        setIsMenuActive(!isMenuActive);
    }

    return (
        <StyledUserAvatar>
            <StyledDiv isMenuActive={isMenuActive} onClick={handleMenuToggle}>
                <Avatar
                    src={avatar || "/default-user.jpg"}
                    alt={`Avatar of ${fullName ? fullName : "default user"}`}
                />
                <span>{fullName || "Default User"}</span>
            </StyledDiv>

            <HeaderMenu
                isMenuActive={isMenuActive}
                handleMenuToggle={handleMenuToggle}
            />
        </StyledUserAvatar>
    );
}
