import React, { useEffect, useRef, useState } from "react";
import X from "./../src/assets/X.png";
import O from "./../src/assets/O.png";

function TicTacToe() {
  const boxs = Array.from({ length: 9 }, () => useRef(null));
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [result, setResult] = useState("Tic Tac Toe");
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    D: 0,
  });
  function handleClick(e, num) {
    if (data[num - 1] != "" || lock) return;
    const temp = [...data];
    temp[num - 1] = count % 2 == 0 ? "X" : "O";
    setData(temp);
    e.currentTarget.innerHTML = `<img src=${
      count % 2 == 0 ? X : O
    } alt="Image" />`;
    setCount((prev) => prev + 1);
  }
  const handleResult = (num) => {
    setLock(true);
    if (num == "D") {
      setResult(`Match Draw`);
      setScore((prev) => ({ ...prev, [num]: prev[num] + 1 }));
    } else {
      setResult(`${data[num]} has Win`);
      console.log(score[data[num]]);
      setScore((prev) => ({ ...prev, [data[num]]: prev[data[num]] + 1 }));
    }
  };
  useEffect(() => {
    if (data[0] !== "" && data[0] === data[1] && data[1] === data[2]) {
      handleResult(0);
    } else if (data[3] !== "" && data[3] === data[4] && data[4] === data[5]) {
      handleResult(3);
    } else if (data[6] !== "" && data[6] === data[7] && data[7] === data[8]) {
      handleResult(6);
    } else if (data[0] !== "" && data[0] === data[3] && data[3] === data[6]) {
      handleResult(0);
    } else if (data[1] !== "" && data[1] === data[4] && data[4] === data[7]) {
      handleResult(1);
    } else if (data[2] !== "" && data[2] === data[5] && data[5] === data[8]) {
      handleResult(2);
    } else if (data[0] !== "" && data[0] === data[4] && data[4] === data[8]) {
      handleResult(0);
    } else if (data[2] !== "" && data[2] === data[4] && data[4] === data[6]) {
      handleResult(2);
    } else if (data.every((cell) => cell !== "")) {
      handleResult("D");
    }
  }, [data]);
  const handleClear = () => {
    setData(Array(9).fill(""));
    setResult("Tic Tac Toe");
    boxs.map((data) => {
      data.current.innerHTML = "";
    });
    setLock(false);
  };
  return (
    <div className="container">
      <h1 className="txt-title">{result}</h1>
      <div className="h-box">
        <h1 className="txt-title l-score">{`X Win's ${score.X}`}</h1>

        <div className="box-container">
          {boxs.map((ref, id) => (
            <div
              key={id}
              ref={ref}
              onClick={(e) => {
                handleClick(e, id + 1);
              }}
              className="box"
            ></div>
          ))}
        </div>

        <h1 className="txt-title r-score">{`O Win's ${score.O}`}</h1>
      </div>
      <h1 className="txt-title b-score">{`Draw's ${score.D}`}</h1>
      <button onClick={handleClear} className="btn">
        Clear
      </button>
    </div>
  );
}

export default TicTacToe;
