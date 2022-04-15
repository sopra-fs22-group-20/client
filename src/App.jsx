import React from 'react';
import 'helpers/firebase';
import AppRouter from 'components/routing/routers/AppRouter';
import { CookiesProvider } from 'react-cookie';
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */

function App() {
  return (
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>
  );
}

export default App;
