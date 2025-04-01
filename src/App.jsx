import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MinecraftApi from "./pages/minecraftApi";
import Redirect from "./pages/redirect";
import Color from "./pages/color";
import Cards from "./pages/cards";
import Poke from "./pages/poke";
import Index from "./pages/Index";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="minecraftapi" element={<MinecraftApi />} />
                <Route path="redirect" element={<Redirect />} />
                <Route path="color" element={<Color />} />
                <Route path="cards" element={<Cards />} />
                <Route path="poke" element={<Poke />} />
            </Routes>
        </BrowserRouter>
    );
}
