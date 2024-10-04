import styled, {css, keyframes} from "styled-components";
import {BiLoaderAlt} from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
    width: 2.4rem;
    height: -webkit-fill-available;
    animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
