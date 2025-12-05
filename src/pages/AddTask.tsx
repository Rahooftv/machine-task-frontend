import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

interface TaskForm {
  title: string;
  dueDate: string;
  status: string;
  attachment?: FileList;
}

const AddTask: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<TaskForm>();

  const onSubmit = async (data: TaskForm) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("dueDate", data.dueDate);
      formData.append("status", data.status);

      if (data.attachment && data.attachment[0]) {
        formData.append("attachment", data.attachment[0]); 
      }

      await api.post("/task/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Task created successfully");
      navigate("/tasks");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Task</h1>

        
        <div>
          <label className="font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

       
        <div>
          <label className="font-medium">Due Date</label>
          <input
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
        </div>

       
        <div>
          <label className="font-medium">Status</label>
          <select
            {...register("status")}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        
        <div>
          <label className="font-medium">Attachment (image/PDF)</label>
          <input
            type="file"
            {...register("attachment")}
            className="w-full p-2 border mt-1 rounded"
            accept="image/*,application/pdf"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
