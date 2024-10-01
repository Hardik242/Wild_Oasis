import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import Checkbox from "../../ui/Checkbox";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import {useEffect, useState} from "react";
import {formatCurrency} from "../../utils/helpers";
import {useCheckIn} from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState();
    const [addBreakfast, setAddBreakfast] = useState(false);

    const {booking, isLoading} = useBooking();
    const {isCheckingIn, checkIn} = useCheckIn();
    const {settings, isLoading: isLoadingSetting} = useSettings();

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    const moveBack = useMoveBack();

    if (isLoading || isLoadingSetting) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const {breakfastPrice} = settings;
    const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!addBreakfast) checkIn({bookingId, breakfast: {}});
        else
            checkIn({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    totalPrice: optionalBreakfastPrice + totalPrice,
                    extrasPrice: optionalBreakfastPrice,
                },
            });
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((addBreakfast) => !addBreakfast);
                            setConfirmPaid((confirmPaid) => !confirmPaid);
                        }}
                        id={"breakfast"}>
                        Want to add Breaskfast for{" "}
                        {formatCurrency(breakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() =>
                        setConfirmPaid((confirmPaid) => !confirmPaid)
                    }
                    disabled={confirmPaid || isCheckingIn}
                    id={"confirm"}>
                    I confirm that the guest {guests.fullname} has paid the
                    total amount of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
