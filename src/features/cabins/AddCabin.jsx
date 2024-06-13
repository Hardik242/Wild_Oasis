import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

export default function AddCabin() {
    return (
        <Modal>
            <Modal.Open open="cabin-form">
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window new="cabin-form">
                <CreateCabinForm />
            </Modal.Window>

            <Modal.Open open="cabin-table">
                <Button>Show Table</Button>
            </Modal.Open>
            <Modal.Window new="cabin-table">
                <CabinTable />
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
