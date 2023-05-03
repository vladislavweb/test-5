import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import { Home, News } from "pages";
import { StoryService } from "./services";

const router = createBrowserRouter([
  {
    path: "/news/:newsId",
    element: <News />,
    loader: async ({ params }) => {
      try {
        return await StoryService.getStory(params.newsId as any);
      } catch (error) {
        return undefined;
      }
    },
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
