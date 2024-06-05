import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";

import axiosInstance from "../../../axiosinstances.js";
import Toast from "../../components/ToastMessage/Toast.jsx";
import EmptyCard from "../../components/Cards/EmptyCard.jsx";
import AddNoteImg from "../../../public/landing_career_guide.svg";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, SetAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  //Edit user open modal option
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  //On show toast
  const showToastMessage = (message, type) => {
    setShowToast({ isShown: true, message, type });
  };

  //On toast close
  const handleCloseToast = () => {
    setShowToast({ isShown: false, message: "" });
  };

  //Api call Get userInfo

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get all notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");

      if (response.data && response.data.notes) {
        SetAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Something went wrong, please try again");
    }
  };

  //Delete note

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/notes/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.error) {
        console.log(error.response.message);
      }
      console.log("Something went wrong, Please try again");
    }
  };

  //Search Notes

  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search-notes/", { params: { query } });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        SetAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Clear Search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  //Pin note
  const handleNotePin = async (noteItem) => {
    try {
      if (noteItem.isPinned === false) {
        noteItem.isPinned = true;
      } else {
        noteItem.isPinned = false;
      }

      const response = await axiosInstance.put("/notes/update-isPinned/" + noteItem._id, {
        isPinned: noteItem.isPinned,
      });

      if (response.data && response.data.note) {
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.error) {
        console.log(error.response.message);
      }
      console.log("Something went wrong, Please try again.");
    }
  };

  //Runs only once we the page is rendered
  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearch={onSearchNotes} onClear={handleClearSearch} />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                _id={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => {
                  deleteNote(item);
                }}
                onPinNote={() => {
                  handleNotePin(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={AddNoteImg} message="Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!" />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          ariaHideApp={false}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast isShown={showToast.isShown} message={showToast.message} type={showToast.type} onClose={handleCloseToast} />
    </>
  );
}
