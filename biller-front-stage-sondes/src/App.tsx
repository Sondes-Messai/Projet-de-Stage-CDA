import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./pages/dashboard";
import Customers from "./pages/customers";
import Services from "./pages/services";
import Invoices from "./pages/invoices";
import EditCustomerForm from "./pages/customers/EditCustomerForm";
import EditServiceForm from "./pages/services/EditServiceForm";
import EditInvoiceForm from "./pages/invoices/EditInvoiceForm";
import Settings from "./pages/settings";
import Login from "./pages/login";
import Balance from "./pages/balance";
import Calendar from "./pages/calendar";
import EditMovementForm from "./pages/balance/EditMovementForm";
import AuthenticationService from "./services/AuthenticationService";
import Loading from "./components/global/Loading";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated
  );
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function fetchdata() {
      await AuthenticationService.isStarted().then((value) =>
        setIsReady(value)
      );
    }

    fetchdata();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isReady ? (
            isAuthenticated ? (
              <Box>
                <header>
                  <Topbar />
                </header>
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route
                      path="/customer/:id"
                      element={<EditCustomerForm />}
                    />
                    <Route path="/customer/" element={<EditCustomerForm />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/service/:id" element={<EditServiceForm />} />
                    <Route path="/service/" element={<EditServiceForm />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route
                      path="/invoice/:id/:copy"
                      element={<EditInvoiceForm />}
                    />
                    <Route path="/invoice/" element={<EditInvoiceForm />} />
                    <Route path="/balance" element={<Balance />} />
                    <Route path="/movement/" element={<EditMovementForm />} />
                    <Route
                      path="/movement/:id"
                      element={<EditMovementForm />}
                    />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Routes>
                </main>
              </Box>
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          ) : (
            <Loading />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
