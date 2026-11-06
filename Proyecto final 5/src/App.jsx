import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Container maxWidth="md">
      <Outlet />
    </Container>
  );
};

export default App;