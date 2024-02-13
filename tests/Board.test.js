import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Board from "../src/components/Board"

describe('Board component', () => {
    test('renders mine counter and board with cells', async () => {
      // Mock props
      const apiClient = {
        getLevel: jest.fn().mockResolvedValue({
          rows: 10,
          columns: 10,
          mines: 10,
        }),
      };
      const level = 1;
  
      // Render the component
      render(<Board apiClient={apiClient} level={level} />);
  
      // Expect mine counter to be present
      const minesRemainingText = screen.getByText(/Mines remaining/i);
      expect(minesRemainingText).toBeInTheDocument();
  

    });
  });