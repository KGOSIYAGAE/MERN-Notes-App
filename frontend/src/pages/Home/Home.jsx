import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";

import axiosInstance from "../../../axiosinstances.js";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, SetAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //Edit user open modal option

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
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

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
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
              onDelete={() => {}}
              onPinNote={() => {
                handleNotePin(item);
              }}
            />
          ))}
        </div>
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
        />
      </Modal>
    </>
  );
}
