import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

export default function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    );

    //     const [isOpenModal, setIsOpenModal] = useState(false);

    //     return (
    //         <div>
    //             <Button onClick={() => setIsOpenModal(true)}>Add new Cabin</Button>
    //             {isOpenModal && (
    //                 <Modal onClose={() => setIsOpenModal(false)}>
    //                     <CreateCabinForm
    //                         onCloseModal={() => setIsOpenModal(false)}
    //                     />
    //                 </Modal>
    //             )}
    //         </div>
    //     );
}
