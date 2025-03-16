type Props = {
  text: string;
};

const ErrorMessage = ({ text }: Props) => {
  return <>{text !== "" && <p style={{ fontSize: "20px" }}>{text}</p>}</>;
};

export default ErrorMessage;
