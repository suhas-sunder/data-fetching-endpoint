import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [graphData, setGraphData] = useState({});
  const initialized = useRef(false);

  useEffect(() => {
    const handleData = (data) => {
      const values = data.trim().split("\n").map(Number);
      const sortedValues = {};

      // Store each value and it's frequency as a key value pair in an object.
      for (const value of values) {
        sortedValues[value] ? sortedValues[value]++ : (sortedValues[value] = 1);
      }

      setGraphData(sortedValues);
    };

    const fetchData = async () => {
      await fetch(
        "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
      )
        .then((res) => res.text())
        .then((data) => {
          handleData(data);
        });
    };

    if (!initialized.current) {
      initialized.current = true;
      try {
        fetchData();
      } catch {
        console.log("Could not fetch data");
      }
    }
  }, [graphData]);

  return (
    <div className="App">
      <h1>Data fetching experiment</h1>
      <div className="wrapper">
        <h2>Values:</h2>
        <div>
          {/* Add line to top of values for x-axis */}
          {graphData &&
            Object.keys(graphData).map((value, index) => (
              <div className="data" key={index}>
                {value}
              </div>
            ))}
        </div>
        <h2>Repetitions:</h2>
        <div>
          {graphData &&
            Object.values(graphData).map((value, index) => (
              <div className="data" key={index}>
                {value}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
