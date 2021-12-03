import { render } from "@testing-library/react"
import { AuthProvider } from "../../contexts/auth";
import Dashboard from "../../pages/dashboard";

describe('<Dashboard />', () => {
  it('Should crender the dashboard', () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
  })
})