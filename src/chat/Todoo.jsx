import React, { useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([
    {
      name: "Default Task",
      desc: "Default Description",
      done: false,
    },
  ]);
  const [error, setError] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Both Title and Description are required.");
      return;
    }
    setError("");
    const inputData = {
      name: title,
      desc: description,
      done: false,
    };
    setItems([inputData, ...items]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleDone = (index) => {
    const updatedItems = [...items];
    updatedItems[index].done = !updatedItems[index].done;
    setItems(updatedItems);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditTitle(items[index].name);
    setEditDescription(items[index].desc);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = (index) => {
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Both fields must be filled for editing.");
      return;
    }
    const updatedItems = [...items];
    updatedItems[index].name = editTitle;
    updatedItems[index].desc = editDescription;
    setItems(updatedItems);
    cancelEdit();
    setError("");
  };

  return (
    <>
      {/* Add Task Form */}
      <div className="mt-4 min-w-[80%] flex flex-col items-center shadow-xl bg-white rounded-xl mx-[10px]">
        <h2 className="text-center font-bold text-2xl mt-2">Add Task</h2>
        <form onSubmit={handleSubmit} className="mx-2 my-3 p-3 min-w-full">
          <div>
            <label htmlFor="title" className="text-lg m-1">Enter Title</label>
            <br />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="title"
              placeholder="Title"
              className="bg-white h-8 min-w-[90%] my-2 mb-3 outline-none rounded-[5px] border border-gray-300 px-2"
            />
            <br />
          </div>
          <div>
            <label htmlFor="description" className="text-lg">Enter Description</label>
            <br />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              id="description"
              placeholder="Description"
              className="bg-white h-8 min-w-[90%] my-2 mb-3 outline-none rounded-[5px] border border-gray-300 px-2"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm mb-2 font-medium">{error}</p>
          )}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer focus:outline-none"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="mt-[50px] min-w-[80%] shadow-xl bg-white rounded-xl mx-[10px] my-[8px] pb-[7px]">
        <div className="space-y-4 p-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-xl shadow-2xl border border-gray-200">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(index)}
                      className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-1.5"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-3 py-1.5"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={`text-xl font-bold ${item.done ? "line-through text-gray-500" : ""}`}>
                    {item.name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <h3 className={`${item.done ? "line-through text-gray-500" : ""}`}>
                      {item.desc}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(index)}
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-1.5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-2 py-1.5"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleDone(index)}
                        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-2 py-1.5"
                      >
                        {item.done ? "Undo" : "Done"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;

