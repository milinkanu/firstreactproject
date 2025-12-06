export default function ShowData({ users, deleteUser, editUser , updateUser}) {


  return (
    <div className="table-wrap">
      <div className="card table-card" style={{width: '900px'}}>
      <h2>Stored User Data</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.username}</td>
              <td>{u.password}</td>

              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => { editUser(i)}}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteUser(i)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      </div>
    </div>
  );
}
