import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi";
import useDarkMode from "../context/useDarkMode";

export default function DarkModeToggle() {
    const {isDarkMode} = useDarkMode();

    return <div>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</div>;
}
