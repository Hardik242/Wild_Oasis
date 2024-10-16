import {useForm} from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({setShowForm, cabinToEdit = {}, onCloseModal}) {
    const {id: editId, ...editValues} = cabinToEdit;
    const toEditCabin = Object.keys(cabinToEdit).length !== 0;

    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: toEditCabin ? editValues : {},
    });
    const {errors} = formState;
    const {isCreating, createCabin} = useCreateCabin();
    const {isEditing, editCabin} = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(cabinData) {
        const image =
            typeof cabinData.image === "string"
                ? cabinData.image
                : cabinData.image[0];

        if (toEditCabin) {
            const oldCabinImage = cabinToEdit.image.replace(
                "https://sffirbrxnnzifrfpvwtr.supabase.co/storage/v1/object/public/cabins/",
                ""
            );
            editCabin(
                {
                    newCabinData: {...cabinData, image},
                    id: editId,
                    oldCabinImage,
                },
                {
                    onSuccess: () => {
                        onCloseModal();
                        reset();
                    },
                }
            );
        } else
            createCabin(
                {...cabinData, image},
                {
                    onSuccess: () => {
                        onCloseModal();
                        reset();
                    },
                }
            );
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Value must be greater than 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Value must be greater than 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            "Discount should be less than Regular Price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register("image", {
                        required: toEditCabin
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    disabled={isWorking}
                    variation="secondary"
                    onClick={() => onCloseModal?.()}
                    type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {toEditCabin ? "Edit Cabin" : "Create Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
