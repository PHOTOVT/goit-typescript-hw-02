import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

type Props = {
  data: {
    isOpen: boolean;
    url: string;
    alt: string;
    author: string;
    likes: number;
  };
  closeModal: () => void;
};

const ImageModal = ({ data, closeModal }: Props) => {
  return (
    <>
      {data && (
        <Modal
          isOpen={data.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className={css.modal}
          overlayClassName={css.overlay}
        >
          <img src={data.url} alt={data.alt} />
          <div className={css.modalWrap}>
            <div className={css.modalDescr}>
              <h2>{data.alt}</h2>
              <p>{`Author: ${data.author}`}</p>
              <p>{`Likes: ${data.likes}`}</p>
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ImageModal;
