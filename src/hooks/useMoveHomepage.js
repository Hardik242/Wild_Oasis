import {useNavigate} from "react-router-dom";

export function useMoveHomepage() {
    const navigate = useNavigate();
    return () => navigate("app");
}
