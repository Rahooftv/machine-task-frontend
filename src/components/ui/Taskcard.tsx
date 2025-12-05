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
  const isOverdue = status === "overdue";


  const isImage =
    attachment &&
    (attachment.endsWith(".png") ||
      attachment.endsWith(".jpg") ||
      attachment.endsWith(".jpeg") ||
      attachment.endsWith(".gif") ||
      attachment.endsWith(".webp"));

  return (
    <div
      className={`p-5 rounded-xl shadow border flex flex-col justify-between 
      ${isOverdue ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"}
    `}
    >
      <div>
        <h2 className="text-xl font-semibold mb-1">{title}</h2>

        <p
          className={`font-medium ${
            isOverdue ? "text-red-600" : "text-gray-700"
          }`}
        >
          Status: {status}
        </p>

        <p className="text-sm text-gray-500 mt-1">
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
