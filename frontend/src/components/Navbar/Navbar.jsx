import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axiosInstance from "../../../axiosinstances";

export default function Navbar({ userInfo, onSearch, onClear }) {
  const [SearchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = async () => {
    if (SearchQuery) {
      onSearch(SearchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    onClear();
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-6 drop-shadow">
      <h2 className="text-lg font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={SearchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}
