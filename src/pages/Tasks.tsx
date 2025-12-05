import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import TaskCard from "../components/ui/Taskcard";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  attachment?: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task", {
        params: { page, limit, status, search },
      });

      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, search]);

  useEffect(() => {
    const handleFocus = () => fetchTasks();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/task/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
      alert("Task deleted successfully!");
    } catch (err) {
      alert("Failed to delete task");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading tasks...
      </div>
    );

  return (
   <div className="min-h-screen p-6 max-w-5xl mx-auto">

     <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">


      <div className="flex flex-col gap-10 md:flex-row md:items-center">

        
        <h1 className="text-3xl font-bold">Your Tasks</h1>

       
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full md:w-60"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

   
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded md:w-50"
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <Button
        onClick={() => navigate("/task/add")}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Add Task
      </Button>

    </div>



      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              _id={task._id}
              title={task.title}
              status={task.status}
              dueDate={task.dueDate}
              attachment={task.attachment}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

   {/* pagination */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

    </div>
  );
};

export default Tasks;
