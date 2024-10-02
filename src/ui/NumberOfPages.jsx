import styled from "styled-components";
import Select from "./Select";
import {useSearchParams} from "react-router-dom";
import {globals} from "../utils/globals";
import {useQueryClient} from "@tanstack/react-query";

const Label = styled.label`
    font-size: 1.4rem;
    margin-right: 1rem;

    & span {
        font-weight: 600;
    }
`;

export default function NumberOfPages({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    let {PAGE_SIZE} = globals;
    const rowPerPage = searchParams.get("rowPerPage") || PAGE_SIZE;
    const queryClient = useQueryClient();

    function handleChange(e) {
        globals.PAGE_SIZE = Number(e.target.value);
        queryClient.invalidateQueries({active: true});
    }

    return (
        <div>
            <Label>Rows per page</Label>
            <Select
                options={options}
                value={rowPerPage}
                type="white"
                onChange={handleChange}
            />
        </div>
    );
}
