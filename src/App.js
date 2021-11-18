import { SnackbarProvider } from 'notistack';
import AppProvider from './contexts/App';
import MacroGrid from './grid/Grid';

const App = () => (
  <div>
    <SnackbarProvider>
      <AppProvider>
        <MacroGrid />
      </AppProvider>
    </SnackbarProvider>
  </div>
);

export default App;
