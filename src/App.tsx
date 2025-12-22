import { useState } from "react";

// full control value
export default function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>{inputValue}</p>
    </>
  );
}
