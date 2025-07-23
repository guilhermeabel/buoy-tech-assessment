import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppLayout, AppConfigProvider } from "components";
import { IntlAppProvider } from "intl";
import Pages from "pages";
import { ThemeProvider } from "theme";
import { store } from "store";
import { AuthenticationProvider } from "components/providers/authenticationProvider";
import { EnvironmentConfigProvider } from "components/providers/environmentConfigProvider";
import { QueryClientProvider } from "components/providers/queryClientProvider";
import "app.css";

function App() {
  return (
    <Provider store={store}>
      <EnvironmentConfigProvider>
        <IntlAppProvider>
          <BrowserRouter>
            <QueryClientProvider>
              <ThemeProvider>
                <AuthenticationProvider>
                  <AppConfigProvider>
                    <AppLayout>
                      <Pages />
                    </AppLayout>
                  </AppConfigProvider>
                </AuthenticationProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </BrowserRouter>
        </IntlAppProvider>
      </EnvironmentConfigProvider>
    </Provider>
  );
}

export default App;
