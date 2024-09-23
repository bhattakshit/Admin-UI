


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, selectAll, deselectAll, deleteSelected, setSearchQuery } from "./Store/slice";
import Display from "./Components/Display";
import Pagination from "./Components/Pagination";
import Search from "./Components/Search";

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isLoading, checke, searchQuery, selectedUserIds } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(user.length / 10)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSelectAll = () => {
    if (checke) {
      dispatch(deselectAll());
    } else {
      dispatch(selectAll());
    }
  };

  const filteredUsers = user.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="h-screen ">
      <div className="flex flex-col justify-center items-center w-[70%] m-auto mt-[5%] overflow-sm-scroll">
        <Search />
        <table className="w-full border-collapse">
          <thead className="w-full text-start">
            <tr>
              <th>
                <input type="checkbox" checked={checke} onChange={handleSelectAll} />
              </th>
              <th>Id</th>
              <th className="text-start">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((u) => <Display key={u.id} usee={u} />)
            ) : (
              <tr>
                <td colSpan="5">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
        <button  className="absolute top-[36rem] border border-red-600 left-[200px] bg-red-500 rounded-md p-1 hover:bg-red-300 cursor-pointer"
          onClick={() => dispatch(deleteSelected())} 
          disabled={selectedUserIds.length === 0}
        >
          Delete Selected
        </button>
        <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default App;

