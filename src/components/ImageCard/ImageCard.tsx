import { forwardRef } from "react";
import { Image } from "../../App";
import { ModalTypes } from "../../App";
import css from "./ImageCard.module.css";

type Props = {
  imgData: Image;
  onModal: ({ url, alt, descr, author, likes }: ModalTypes) => void;
};

const ImageCard = forwardRef<HTMLLIElement, Props>(
  ({ imgData, onModal }, ref) => {
    return (
      <li ref={ref ?? undefined} className={css.imgCard}>
        {" "}
        <img
          src={imgData.urls.small}
          alt={imgData.alt_description}
          onClick={() =>
            onModal({
              isOpen: true,
              url: imgData.urls.regular,
              alt: imgData.alt_description,
              descr: imgData.description,
              author: imgData.user.name,
              likes: imgData.likes,
            })
          }
        />
      </li>
    );
  }
);

export default ImageCard;
