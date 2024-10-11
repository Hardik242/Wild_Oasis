import styled, {css, keyframes} from "styled-components";
import {useLogout} from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import {HiArrowRightOnRectangle, HiOutlineUser} from "react-icons/hi2";

const show = keyframes`
  from {
    opacity: 0;
    top:15rem;
  }
  to {
    opacity: 1;
    top: 7rem;
  }
`;

export const StartMenuHeader = styled.div`
    position: absolute;
    z-index: 2;
    right: 0;
    width: 28rem;
    flex-wrap: wrap;
    border-radius: 1.4rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg2);

    ${(props) =>
        props.isMenuActive
            ? css`
                  display: block;
                  animation: ${show} 0.5s ease-in-out;
              `
            : css`
                  display: none;
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
            background-color: var(--color-brand-50);
            &:hover {
                color: var(--color-grey-900);
                background-color: var(--color-brand-100);
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
    flex-wrap: wrap;
    text-overflow: ellipsis;
    gap: 0.4rem;
    padding: 1rem 2rem;
    margin: 1rem 0.6rem;

    & h3 {
        font-size: 1.9rem;
    }

    & span {
        font-size: 1.5rem;
    }
`;

export default function HeaderMenu({isMenuActive}) {
    const {isLoading, logout} = useLogout();

    return (
        <StartMenuHeader isMenuActive={isMenuActive}>
            <StyledUl>
                <StyledLi>
                    <UserDetails>
                        <h3>Hardik Goel</h3>
                        <span>hardikgoel242@gmail.com</span>
                    </UserDetails>
                </StyledLi>
                <StyledLi>
                    <LiItem>
                        Account <HiOutlineUser />
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
