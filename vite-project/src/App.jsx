import { useState } from "react";
import "./App.css";
import { usePDF } from "react-to-pdf";

function App() {
  const [text, setText] = useState("");
  const [addHeader, setAddHeader] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [objURL, setObjUrl] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const Header = ({ addHeader, text, isBold, isItalic, isUnderline }) => {
    const style = {
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
      textDecoration: isUnderline ? "underline" : "none",
      margin: "30px",
      fontSize:
        addHeader == "h1"
          ? "36px"
          : addHeader == "h2"
          ? "30px"
          : addHeader == "h3"
          ? "24px"
          : addHeader == "h4"
          ? "18px"
          : addHeader == "h5"
          ? "12px"
          : "10px",
    };

    return <div style={style}>{text}</div>;
  };

  return (
    <>
      <div className="text-4xl text-red-500">PDF Creation Task</div>
      <form class="max-w-sm mx-auto">
        <div>
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-3"
          >
            Enter any text
          </label>
          <input
            type="text"
            id="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            onChange={(e) => {
              setText(e.target.value);
            }}
            required
          />
        </div>
        <div className=""></div>
        <div>
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an Header
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setAddHeader(e.target.value);
            }}
          >
            <option selected>Choose a Header</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H6</option>
            <option value="h6">H6</option>
          </select>
        </div>
        <div>
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Formatting Options
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              if (e.target.value == "bold") {
                setIsBold(true);
              } else {
                setIsBold(false);
              }
              if (e.target.value == "italic") {
                setIsItalic(true);
              } else {
                setIsItalic(false);
              }
              if (e.target.value == "underline") {
                setIsUnderline(true);
              } else {
                setIsUnderline(false);
              }
            }}
          >
            <option selected>Choose Formatting Options</option>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="underline">Underline</option>
          </select>
        </div>
        <div className="mb-7">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                let url = URL.createObjectURL(e.target.files[0]);
                setObjUrl(url);
              }
            }}
          />
        </div>
        <button
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => toPDF()}
        >
          Generate PDF
        </button>
        <div ref={targetRef}>
          <div>
            <Header
              addHeader={addHeader}
              text={text}
              isBold={isBold}
              isItalic={isItalic}
              isUnderline={isUnderline}
            />
            <img src={objURL} alt="" />
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
