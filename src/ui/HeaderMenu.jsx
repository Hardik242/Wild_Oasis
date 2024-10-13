import styled, {css} from "styled-components";
import {useLogout} from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import {HiArrowRightOnRectangle, HiOutlineUser} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import {useUser} from "../features/authentication/useUser";
import DarkModeToggle from "./DarkModeToggle";
import {useDarkMode} from "../context/DarkModeContext";

export const StartMenuHeader = styled.div`
    position: absolute;
    z-index: 2;
    right: 0;
    width: 28rem;
    top: 5.5rem;
    flex-wrap: wrap;
    border-radius: 1.4rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg2);
    transition: all 0.5s ease-in-out;

    ${(props) =>
        props.isMenuActive
            ? css`
                  opacity: 1;
                  transform: translateX(0);
              `
            : css`
                  opacity: 0;
                  transform: translateX(100%);
              `}
`;

const StyledUl = styled.ul`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: var(--color-grey-50);
`;

const StyledLi = styled.li`
    display: flex;
    flex-direction: column;
`;

const LiItem = styled.div`
    font-size: 1.6rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.5s;

    ${(props) =>
        props.type === "primary" &&
        css`
            background-color: var(--color-grey-50);
            &:hover {
                color: var(--color-grey-900);
                background-color: var(--color-grey-100);
                box-shadow: var(--shadow-md);
                font-weight: 600;
            }
        `}

    ${(props) =>
        props.type === "logout" &&
        css`
            background-color: var(--color-red-700);
            color: var(--color-brand-50);
            &:hover {
                background-color: var(--color-red-800);
                box-shadow: var(--shadow-md);
                font-weight: 600;
            }
        `}
`;

LiItem.defaultProps = {
    type: "primary",
};

const UserDetails = styled.div`
    text-align: center;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;
    gap: 0.4rem;
    padding: 1rem 2rem;
    margin: 1rem 0.6rem;
    word-wrap: break-word;

    & img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        outline: 2px solid var(--color-grey-500);
        outline-offset: 0.2rem;
    }

    & div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
    }

    & h3 {
        font-size: 1.9rem;
    }

    & span {
        font-size: 1.5rem;
    }
`;

export default function HeaderMenu({isMenuActive, handleMenuToggle}) {
    const {user} = useUser();
    const {isDarkMode, toggleDarkMode} = useDarkMode();
    const {
        user_metadata: {fullName, avatar},
        email,
    } = user;
    const {isLoading, logout} = useLogout();
    const navigate = useNavigate();

    return (
        <StartMenuHeader isMenuActive={isMenuActive}>
            <StyledUl>
                <StyledLi>
                    <UserDetails>
                        <div>
                            <img
                                src={avatar || "/default-user.jpg"}
                                alt={`${fullName} profile`}
                            />
                        </div>
                        <h3>{fullName}</h3>
                        <span>{email}</span>
                    </UserDetails>
                </StyledLi>
                <StyledLi>
                    <LiItem
                        onClick={() => {
                            navigate("account");
                            handleMenuToggle();
                        }}>
                        Account <HiOutlineUser />
                    </LiItem>
                </StyledLi>

                <StyledLi>
                    <LiItem onClick={toggleDarkMode}>
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                        <DarkModeToggle />
                    </LiItem>
                </StyledLi>

                <StyledLi>
                    <LiItem type="logout" onClick={logout} disabled={isLoading}>
                        {isLoading ? (
                            <SpinnerMini />
                        ) : (
                            <>
                                Logout <HiArrowRightOnRectangle />
                            </>
                        )}
                    </LiItem>
                </StyledLi>
            </StyledUl>
        </StartMenuHeader>
    );
}
