import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Index />
      </div>
    </BrowserRouter>
  );
};

export default App;