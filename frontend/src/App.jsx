import { Button, Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Container maxW="620px">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage/>} />
      </Routes>
    </Container>
  );
}

export default App;
