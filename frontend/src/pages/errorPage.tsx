import { useRouteError } from "react-router-dom";

interface ErrorResponse {
  statusText: string;
  message: string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  return (
    <div className="text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
