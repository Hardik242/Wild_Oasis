import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();

    const {isUpdating, updateSetting} = useUpdateSetting();

    function handleUpdate(event, fieldName) {
        const {value} = event.target;
        console.log(event);

        if (!value || fieldName === value) return;

        updateSetting({[fieldName]: value});
    }

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
