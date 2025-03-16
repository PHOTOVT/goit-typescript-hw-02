import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { RefObject } from "react";
import { Image } from "../../App";
import { ModalTypes } from "../../App";

type Props = {
  data: Image[];
  onModal: ({ url, alt, descr, author, likes }: ModalTypes) => void;
  lastImageRef: RefObject<HTMLImageElement>;
};

const ImageGallery = ({ data, onModal, lastImageRef }: Props) => {
  return (
    <div className={css.imgGallery}>
      {data && (
        <ul>
          {data.map((item, index) => {
            return (
              <li key={item.id}>
                <ImageCard
                  ref={index === data.length - 1 ? lastImageRef : null}
                  imgData={item}
                  onModal={onModal}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ImageGallery;
