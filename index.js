import ReactDOM from "react-dom";
import OEEReporting from './App';
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import reportWebVitals from './reportWebVitals';

const App = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <div className="bg-gray-200 p-6">
      <button
        type="button"
        className="bg-gray-500 border border-gray-500 p-2 mb-4"
        onClick={handlePrint}
      >
        {" "}
        Print screen1
        screen2
        screen3{" "}
      </button>
      <OEEReporting ref={componentRef} />
    </div>
  );
};

ReactDOM.render(<App />,document.getElementById('root'));

reportWebVitals();
