import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarVisibilityProvider } from "./context/VisibilityContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import LinkedGen from "./pages/LinkedGen";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Posts from "./pages/Posts";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <SidebarVisibilityProvider>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="users" element={<Users />} />
                  <Route path="linkedgen" element={<LinkedGen />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="postings" element={<Posts />} />
                  <Route path="*" element={<PageNotFound />} />

                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </SidebarVisibilityProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
