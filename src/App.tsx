import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import { Home } from "pages";
import { StoryProvider } from "providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App = () => {
  return (
    <Container sx={{ marginTop: 3, marginBottom: 3 }}>
      <StoryProvider>
        <RouterProvider router={router} />
      </StoryProvider>
    </Container>
  );
};

export default App;
