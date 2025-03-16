import PropagateLoader from "react-spinners/PropagateLoader";
import css from "./Loader.module.css";

type Props = {
  loading: boolean;
};

const Loader = ({ loading }: Props) => {
  return (
    <>
      <PropagateLoader
        className={css.loaderWrap}
        color="navy"
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Loader;
