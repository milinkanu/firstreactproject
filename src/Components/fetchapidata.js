import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./loading";
import { toast } from "react-toastify";

export default function FetchAPIData() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setData(res.data);
          toast.success("API Data Loaded Successfully!", {
            theme: "colored",
          });
        })
        .catch(() => {
          toast.error("Failed to load API data!", {
            theme: "colored",
          });
        })
        .finally(() => {
          setApiLoading(false);
        });
    }, 3000);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);

    const filteredUsers = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredUsers);
  };

  const sortAscending = () => {
    const sorted = [...data].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setData(sorted);
  };
  const sortDecending = () => {
    const sorted = [...data].sort((a, b) =>
      b.username.localeCompare(a.username)
    );
    setData( sorted);
  };

  if (apiLoading) {
    return (
      <div className="fullscreen-loader" style={{ marginTop: '10px' }}>
        <Loading type="dna" />
      </div>
    );

  }

  return (
    <div className="data-wrap" >
      <h2>API Data</h2>

      {!apiLoading &&
        <>
          <div style={{ display: "flex", justifyContent: 'flex-end', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => {handleSearch(e.target.value)}}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  marginBottom: "10px",
                  height: '100%'
                }}
              />
              <div style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: "absolute",
                top: "38px",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 10,
                maxHeight: "200px",
                overflowY: "auto",

              }}>
                {/* {filtered.map((item) => (
                  searchTerm ? (<div className="search-item" style={{ border: '1px solid black' }} key={item.id}>{item.username}</div>) : (<></>)
                ))} */}
              </div>
            </div>
            <button
              className="action-btn ascending-btn" onClick={sortAscending}
              style={{ marginLeft: "10px" }}
            >
              Ascending
            </button>

            <button
              className="action-btn decending-btn" onClick={sortDecending}
              style={{ marginLeft: "10px" }}
            >
              Decending
            </button>
          </div>
          <table style={{ marginTop: '10px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Address</th>
                <th>Geo</th>
                <th>Company</th>
              </tr>
            </thead>

            <tbody>
              
              { (filtered.length ? filtered : data).map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.website}</td>

                  {/* Address */}
                  <td>
                    {item.address.street}, {item.address.suite},
                    <br />
                    {item.address.city} - {item.address.zipcode}
                  </td>

                  {/* Geo */}
                  <td>
                    Lat: {item.address.geo.lat}
                    <br />
                    Lng: {item.address.geo.lng}
                  </td>

                  {/* Company */}
                  <td>
                    <b>{item.company.name}</b>
                    <br />
                    {item.company.catchPhrase}
                    <br />
                    <i>{item.company.bs}</i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    </div>
  );
}
