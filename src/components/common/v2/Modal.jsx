
import ReactModal from 'react-modal';
import cross from "../../../assets/img/icons/cross.svg";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        zIndex: 50,
        transform: 'translate(-50%, -50%)',
    },
};

const Modal = ({ title = 'Notice!', message, showHtml = false, bgColor = 'warning', customWidth = '', hideCloseBtn = false, modalIsOpen = false }) => {
    const closeModal = () => {
        modalIsOpen = false;
    }
    return (
        <ReactModal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={title}
        >
            <div className="text-right">
                <h3 className="text-lg font-bold md:mt-2">{title}</h3>
                <button onClick={closeModal}>
                    <img className="w-6 h-6" src={cross} />
                </button>
            </div>
            <div className={customWidth}>
                {
                    showHtml ? (<div className="py-4" dangerouslySetInnerHTML={{ __html: message }}></div>) : (<p className="py-4">{message}</p>)
                }
            </div>
        </ReactModal>
    )
}

export default Modal