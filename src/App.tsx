import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
