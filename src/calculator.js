import React, { useState } from "react";

export const Calculator = () => {
  const operations = [
    "AC",
    "+/-",
    "%",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "=",
  ];
  const [num, setNum] = useState("");
  const [cal, setCal] = useState({
    a: "",
    sign: "",
    b: "",
  });
  const enterNum = (event) => {
    let n = event.target.textContent;
    if (n === "AC") {
      setNum("");
      setCal({
        a: "",
        sign: "",
        b: "",
      });
    } else {
      setNum(num.concat(n));
      let numberValue;
      if (n === "0" && cal.a === 0) {
        numberValue = "0";
      } else {
        numberValue = cal.a + n;
      }
      setCal({ ...cal, a: numberValue });
    }
  };
  const enterOperator = (event) => {
    if (event.target.textContent === "=") {
      getResult();
    } else {
      setNum(num.concat(event.target.textContent));
      setCal({
        a: "",
        sign: event.target.textContent,
        b: !cal.b && cal.a ? cal.a : cal.b,
      });
    }
  };
  const getResult = () => {
    if (cal.b && cal.a) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => String(Number(a) + Number(b)),
          "-": (a, b) => String(Number(a) - Number(b)),
          "*": (a, b) => String(Number(a) * Number(b)),
          "/": (a, b) => String(Number(a) / Number(b)),
        };
        return result[sign](a, b);
      };
      setNum(math(cal.a, cal.b, cal.sign));
      setCal({
        b: math(cal.a, cal.b, cal.sign),
        sign: "",
        a: 0,
      });
    }
  };
  console.log(cal);
  return (
    <div className="cal">
      <div className="screen">{num}</div>
      <div className="calc">
        {operations.map((operation) => (
          <div>
            {["/", "*", "-", "+", "="].includes(operation) ? (
              <button className="operator" onClick={(e) => enterOperator(e)}>
                {operation}
              </button>
            ) : (
              <button className="btn" onClick={(e) => enterNum(e)}>
                {operation}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
