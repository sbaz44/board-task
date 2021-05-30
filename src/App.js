import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter{counter}</h1>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>ADD</button>
        <button
          onClick={() => dispatch({ type: "DECREMENT", value: "shahbaz" })}
        >
          SUB
        </button>
      </header>
    </div>
  );
}

export default App;
