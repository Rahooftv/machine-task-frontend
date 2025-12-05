import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface TaskCardProps {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  attachment?: string;
  onDelete?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  title,
  status,
  dueDate,
  attachment,
  onDelete,
}) => {
  const navigate = useNavigate();

  const statusColor: Record<string, string> = {
    "todo": "bg-blue-100 text-blue-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
    "completed": "bg-green-100 text-green-700",
    "overdue": "bg-red-100 text-red-700"
  };

  const isImage =
    attachment &&
    (attachment.endsWith(".png") ||
      attachment.endsWith(".jpg") ||
      attachment.endsWith(".jpeg") ||
      attachment.endsWith(".gif") ||
      attachment.endsWith(".webp"));

  return (
    <div className="p-5 rounded-xl shadow border bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-xl text-indigo-500 font-semibold mb-1">{title}</h2>

 
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${
            statusColor[status] || "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>

        <p className="text-sm text-gray-500 mt-2">
          Due Date: {new Date(dueDate).toLocaleDateString()}
        </p>

        {attachment && (
          <div className="mt-3">
            {isImage ? (
              <img
                src={`http://localhost:5000${attachment}`}
                alt="task attachment"
                className="w-full h-40 object-cover rounded-lg border"
              />
            ) : (
              <a
                href={`http://localhost:5000${attachment}`}
                target="_blank"
                className="text-blue-600 underline text-sm"
              >
                📄 View PDF Attachment
              </a>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <Button
          variant="secondary"
          onClick={() => navigate(`/task/update/${_id}`)}
          className="px-4 py-2"
        >
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete?.(_id)}
          className="px-4 py-2"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
