import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/form";
import ShowData from "./Components/showdata";
import FetchAPIData from "./Components/fetchapidata";
import Loading from "./Components/loading";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editingUser, setEditingUser] = useState(null);



  useEffect(() => {
    setTimeout(() => setInitialLoading(false), 3000);
  }, []);

  const editUser = (index) => {
    const user = users[index];

    // Pass this into form state
    setEditingUser({ ...users[index], index });
    setIsEditing(true);
    setEditIndex(index);
  };

  const updateUser = (updatedUser) => {
    const newUsers = [...users];
    newUsers[editIndex] = updatedUser;
    setUsers(newUsers);

    toast.success("User updated!");

    // Reset editing
    setIsEditing(false);
    setEditIndex(null);
    setEditingUser(null);
  };

  const deleteUser = (index) => {
    const filtered = users.filter((_, i) => i !== index);
    setUsers(filtered);

    toast.error("User deleted!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const addUser = (user) => {
    setLoginLoading(true);

    setTimeout(() => {
      setUsers([...users, user]);
      setShowTable(true);
      setLoginLoading(false);

      setSuccessMsg("Login Successful!");
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setTimeout(() => setSuccessMsg(""), 3000);
    }, 3000);
  };

  if (initialLoading) {
    return (
      <div className="fullscreen-loader">
        <Loading type="dna" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className={`main-layout ${showTable ? "side-by-side" : ""}`}>
        <Form
          users={users}
          successMsg={successMsg}
          addUser={addUser}
          updateUser={updateUser}
          loginLoading={loginLoading}
          isEditing={isEditing}
          editingUser={editingUser}
        />

        {showTable && <ShowData
          users={users}
          deleteUser={deleteUser}
          editUser={editUser}
          updateUser={updateUser}
        />}
      </div>

      <FetchAPIData />
    </>
  );
}
