import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import DetailMovie from "./Pages/DetailMovie/DetailMovie";
import BookingMovie from "./Pages/BookingMovie/BookingMovie";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import HomePage from "./Pages/HomePage/HomePage";
import Layout from "./Layout/Layout";
import HistoryBooking from "./Pages/HistoryBooking/HistoryBooking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout contenPage={<HomePage />} />} />
          <Route path="/login" element={<Layout contenPage={<Login />} />} />
          <Route
            path="/register"
            element={<Layout contenPage={<Register />} />}
          />
          <Route
            path="/detail/:id"
            element={<Layout contenPage={<DetailMovie />} />}
          />
          <Route
            path="/booking/:id"
            element={<Layout contenPage={<BookingMovie />} />}
          />
          <Route path="/history" element={<Layout contenPage={<HistoryBooking/>}/>}></Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
