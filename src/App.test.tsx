import { render } from "@testing-library/react";

import App from "./App";

test("renders correctly", () => {
  const app = render(<App />);

  expect(app.container).toBeInTheDocument();
});
