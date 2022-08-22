import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leaderboard } from "./pages/Leaderboard";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddMember } from "./pages/AddMember";
import { LoginPage } from "./pages/LoginPage";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="member/add" element={<AddMember />} />
          </Routes>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
