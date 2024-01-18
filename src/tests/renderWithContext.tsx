import { render } from "@testing-library/react";
import StarProvider from "../context/provider";

const renderWithContext = (element: React.ReactElement) => {
  return (
    render (
    <StarProvider>
      { element }
    </StarProvider>
    )
  )
}

export default renderWithContext;