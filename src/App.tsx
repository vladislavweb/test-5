import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import { Home, News } from "pages";

const router = createBrowserRouter([
  {
    path: "/news/:newsId",
    element: <News />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const App = () => {
  return (
    <Container sx={{ marginTop: 3, marginBottom: 3 }}>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
