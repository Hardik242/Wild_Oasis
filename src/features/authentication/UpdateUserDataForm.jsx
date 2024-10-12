import {useState} from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import {useUser} from "./useUser";
import useUpdateUser from "./useUpdateUser";
import {useForm} from "react-hook-form";

function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: {fullName: currentFullName, avatar: prevAvatar},
        },
    } = useUser();

    const {reset} = useForm();

    const {isUpdating, updateUser} = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const oldAvatar =
            prevAvatar === "" && avatar === null ? null : prevAvatar;
        updateUser(
            {fullName, avatar, oldAvatar},
            {
                onSuccess: reset,
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                    required
                />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    disabled={isUpdating}
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
            </FormRow>
            <FormRow>
                <Button
                    type="reset"
                    variation="secondary"
                    disabled={isUpdating}>
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
