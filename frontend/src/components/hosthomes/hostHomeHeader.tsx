import { Link } from "react-router-dom";

const HostPageHeader = () => {
  return (
    <header className="sticky top-0 left-0 w-full z-10 bg-white">
      <div className="flex justify-between items-center w-full px-5 lg:px-40 md:px-10 py-4">
        {/* Airbnb Logo Link */}
        <Link
          to={"/"}
          className="flex items-center gap-2"
          aria-label="Go to Airbnb homepage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-8 h-8 fill-primary"
            role="img"
          >
            <path d="M16 1c2 0 3.46.96 4.75 3.27l.53 1.02a424.58 424.58 0 0 1 7.1 14.84l.15.35c.67 1.6.9 2.48.96 3.4v.41l.01.23c0 4.06-2.88 6.48-6.36 6.48-2.22 0-4.55-1.26-6.7-3.39l-.26-.26-.17-.17h-.02l-.17.18c-2.05 2.1-4.27 3.42-6.42 3.62l-.28.01-.26.01c-3.48 0-6.36-2.42-6.36-6.48v-.47c.03-.93.23-1.77.83-3.24l.22-.53c.97-2.3 6.08-12.98 7.7-16.03C12.55 1.96 14 1 16 1zm0 2c-1.24 0-2.05.54-2.99 2.21l-.52 1a422.57 422.57 0 0 0-7.03 14.7l-.35.84a6.86 6.86 0 0 0-.6 2.24l-.01.33v.2C4.5 27.4 6.41 29 8.86 29c1.77 0 3.87-1.24 5.83-3.35-2.3-2.94-3.86-6.45-3.86-8.91 0-2.92 1.94-5.39 5.18-5.42 3.22.03 5.16 2.5 5.16 5.42 0 2.45-1.56 5.96-3.86 8.9 1.97 2.13 4.06 3.36 5.83 3.36 2.45 0 4.36-1.6 4.36-4.48v-.4a7.07 7.07 0 0 0-.72-2.63l-.25-.6C25.47 18.41 20.54 8.12 19 5.23 18.05 3.53 17.24 3 16 3zm.01 10.32c-2.01.02-3.18 1.51-3.18 3.42 0 1.8 1.18 4.58 2.96 7.04l.2.29.18-.24c1.73-2.38 2.9-5.06 3-6.87v-.22c0-1.9-1.17-3.4-3.16-3.42z"></path>
          </svg>
        </Link>

        {/* Call to Action for becoming a host */}
        <div className="gap-3 items-center hidden sm:flex">
          <h1 className="text-lg">Ready to airbnb it?</h1>
          <Link
            to={"/became-a-host/overview"}
            className="flex gap-2 items-center bg-primary px-4 py-2 rounded-md text-white hover:bg-primary-dark transition-colors"
            aria-label="Go to Airbnb host setup page"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M11.0639 7.63177V11.1393H7.51713V13.028H11.0639V16.5356H13.0048V13.028H16.5516V11.1393H13.0048V7.63177H11.0639Z"
                fill="white"
              ></path>
              <path
                d="M13.734 0.684168C13.2611 0.240904 12.6404 0 12 0C11.3596 0 10.7389 0.240904 10.266 0.674532L0 10.7251L1.36946 12.0549L2.10837 11.3321V19.9661C2.10837 20.4094 2.29557 20.8334 2.61084 21.1418C2.92611 21.4501 3.35961 21.6332 3.81281 21.6332H20.1773C20.6305 21.6332 21.064 21.4598 21.3892 21.1418C21.7143 20.8238 21.8916 20.3998 21.8916 19.9565V11.3032L22.6305 12.0259L24 10.7251L13.734 0.684168ZM4.03941 19.7542V9.4049L11.6355 1.97542C11.6847 1.92723 11.734 1.88869 11.803 1.86942C11.8621 1.84051 11.931 1.83087 12 1.83087H12.0099C12.0788 1.83087 12.1478 1.84051 12.2069 1.86942C12.266 1.89833 12.3251 1.92723 12.3744 1.97542L19.9704 9.4049V19.7542H4.03941Z"
                fill="white"
              ></path>
            </svg>
            <span>Airbnb Setup</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HostPageHeader;
