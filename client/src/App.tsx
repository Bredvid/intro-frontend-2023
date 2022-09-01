import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { New } from "./pages/New";
import { SinglePost } from "./pages/Post";
import { Posts } from "./pages/Posts";
import "./index.css";

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts />}>
          <Route path="ny" element={<New />} />
          <Route path=":postId" element={<SinglePost />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
