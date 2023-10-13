import Header from "./components/Header";
import ModeSelector from "./components/ModeSelector";
import Timer from "./components/Timer";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <ModeSelector />
      <Timer />
    </>
  );
}

export default App;
