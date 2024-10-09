import './Error.css';
import { BsArrowUpLeft } from "react-icons/bs";
import { Button } from 'react-bootstrap';

const Error = () => {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div className="error_page">
        <div className="error_div">
          <h1>404</h1>
          <div className="inline">
            <p>This page could not be found.</p>
          </div>
        </div>
        <div className="sparkle-button">
          <Button className="home_button" onClick={()=>handleClick()} variant="light">
            <BsArrowUpLeft /> Go Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default Error;