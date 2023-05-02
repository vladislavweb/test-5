import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import { Home, News } from "pages";
import { StoryProvider } from "providers";
import { StoryService } from "./services";

const router = createBrowserRouter([
  {
    path: "/news/:newsId",
    element: <News />,
    loader: async ({ params }) => {
      try {
        const response = await StoryService.getStory(params.newsId as any);

        return response.data;
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
      <StoryProvider>
        <RouterProvider router={router} />
      </StoryProvider>
    </Container>
  );
};

export default App;
