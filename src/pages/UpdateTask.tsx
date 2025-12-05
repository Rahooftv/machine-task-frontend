import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

interface TaskForm {
  title: string;
  status: string;
  dueDate: string;
  attachment?: FileList;
}

const UpdateTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [existingAttachment, setExistingAttachment] = useState<string | null>(null);

const { register, handleSubmit, reset } = useForm<TaskForm>({
  defaultValues: {
    title: "",
    status: "todo",
    dueDate: "",
  },
});


 
  const fetchTask = async () => {
    try {
      const res = await api.get(`/task/${id}`);
      const task = res.data.task;
      console.log(task)

      
      reset({
        title: task.title,
        status: task.status,
        dueDate: task.dueDate.split("T")[0],
      });

      setExistingAttachment(task.attachment || null);
    } catch (err) {
      console.error(err);
      alert("Unable to load task details");
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  fetchTask();
}, []);



  const onSubmit = async (data: TaskForm) => {
    try {
      const formData = new FormData();

   
      formData.append("title", data.title);
      formData.append("status", data.status);
      formData.append("dueDate", data.dueDate);

     
      if (data.attachment?.[0]) {
        formData.append("attachment", data.attachment[0]);
      }

      await api.put(`/task/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Task updated successfully!");
      navigate("/tasks");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading task...
      </div>
    );

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Update Task</h1>

    
        <div>
          <label className="font-medium">Title</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

       
        <div>
          <label className="font-medium">Status</label>
          <select {...register("status")} className="w-full p-2 border rounded mt-1">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

    
        <div>
          <label className="font-medium">Due Date</label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {existingAttachment && (
          <div>
            <p className="text-gray-600">Existing Attachment:</p>

            {existingAttachment.endsWith(".pdf") ? (
              <a
                href={`http://localhost:5000${existingAttachment}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                📄 View PDF
              </a>
            ) : (
              <img
                src={`http://localhost:5000${existingAttachment}`}
                className="w-32 h-32 object-cover rounded border"
                alt="Current Attachment"
              />
            )}
          </div>
        )}

       
        <div>
          <label className="font-medium">Replace Attachment (Optional)</label>
          <input
            type="file"
            {...register("attachment")}
            accept="image/*,application/pdf"
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
