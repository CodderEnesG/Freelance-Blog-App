import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Homepage from "./components/homepage";
import Article from "./components/article";
import Articles from "./components/articles";
import AllTestimonials from "./components/allTestimonials";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  const [blogs, setBlogs] = useState([]);
  /* eslint-disable */
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blogs?populate=*`
        );
        setBlogs(data.data.data);
      } catch (error) {
        setBlogs([]);
      }
    }
    fetchData();
  }, [refresh]);

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/service-comments?populate=*`
        );
        setTestimonials(data.data);
      } catch (error) {
        setTestimonials("error");
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
        <div className="App">
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Homepage testimonials={testimonials} blogs={blogs} />}
            />
            {blogs.map((blog, key) => {
              return (
                <Route
                  key={key}
                  path={`/articles/${blog.id}`}
                  element={<Article setRefresh={setRefresh} blog={blog} blogs={blogs} />}
                />
              );
            })}
            <Route path="/articles" element={<Articles blogs={blogs} />} />
            <Route path="/testimonials" element={<AllTestimonials />} />
          </Routes>

          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
