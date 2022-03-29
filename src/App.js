import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";

const Welcome = (props) => {
  return <div>Hello world {props.author.name}</div>;
};
function App() {
  return (
    <Game/>
  );
}

export default App;
