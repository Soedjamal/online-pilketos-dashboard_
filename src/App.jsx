import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Candidates from "./components/Candidates";
import VoterCards from "./components/VoterCards";
import Navbar from "./components/Navbar";
import VotersX from "./components/VotersX";
import VotersXI from "./components/VotersXI";
import VotersXII from "./components/VotersXII";
import VotersTS from "./components/VotersTS";

function App() {
  return (
    <Router>
      <Navbar />
      <Container >
        <Routes>
          <Route path="/" element={<Candidates />} />
          <Route path="/voter-cards" element={<VoterCards />} />
          <Route path="/x-voters" element={<VotersX />} />
          <Route path="/xi-voters" element={<VotersXI />} />
          <Route path="/xii-voters" element={<VotersXII />} />
          <Route path="/ts-voters" element={<VotersTS />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
