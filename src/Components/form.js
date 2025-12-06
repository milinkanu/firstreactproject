import { useState, useEffect } from "react";
import Loading from "./loading";
import { toast } from "react-toastify";

export default function Form({
  users,
  addUser,
  updateUser,
  loginLoading,
  isEditing,
  editingUser,
  successMsg
}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isEditing && editingUser) {
      setUsername(editingUser.username);
      setPassword(editingUser.password);
    }
  }, [isEditing, editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!username.trim()) {
      toast.error("Username is required", { theme: "colored" });
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      toast.error("Password is required", { theme: "colored" });
      newErrors.password = "Password is required";
    }
    const isDuplicate = users.some((u, index) => {
    if (isEditing && index === editingUser.index) {
      return false;
    }
    return u.username.toLowerCase() === username.toLowerCase();
  });

  if (isDuplicate) {
    toast.error("Username already exists!!", { theme: "colored" });
    newErrors.username = "Username already exists!";
  }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({ username: "", password: "" });
    if (isEditing) {
      updateUser({ username, password });
    } else {
      addUser({ username, password });
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {errors.username && (
            <p style={{ color: "red", marginTop: "-5px", marginBottom: "10px" }}>
              {errors.username}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p style={{ color: "red", marginTop: "-5px", marginBottom: "10px" }}>
              {errors.password}
            </p>
          )}

          <button type="submit" disabled={loginLoading}>
            {isEditing ? (
              'Update'
            ) : (
              !loginLoading ? ('Login') :
              ( 
                <span>
                  <Loading type="oval" />
                </span>
              )
              )}
          </button>


          {successMsg && (
            <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
              {successMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
