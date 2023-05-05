import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Container } from "@mui/material";

import { Home, News } from "pages";
import { store } from "app/store";

const App = () => {
  return (
    <Container sx={{ height: "100vh", paddingTop: 3, paddingBottom: 3 }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:newsId" element={<News />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Container>
  );
};

export default App;
