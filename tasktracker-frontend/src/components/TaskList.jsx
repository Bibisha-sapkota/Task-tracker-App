const TaskList = ({ tasks, onDelete, ontogglecomplete, onEdit }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet. Add one above</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => ontogglecomplete(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                  className={`ml-4 text-base font-medium ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex space-x-2">
                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-yellow-500"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
                    if (confirmDelete) {
                      onDelete(task.id);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
