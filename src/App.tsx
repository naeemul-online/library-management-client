import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
