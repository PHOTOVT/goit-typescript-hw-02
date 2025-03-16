import css from "./LoadMoreButton.module.css";

type Props = {
  onNext: () => void;
};

const LoadMoreButton = ({ onNext }: Props) => {
  return (
    <div className={css.loadButton}>
      <button type="button" onClick={onNext}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;
