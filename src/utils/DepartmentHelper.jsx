import { useNavigate } from "react-router-dom";

const Columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 text-white bg-green-600"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 text-white bg-red-600"
        onClick={() => onDepartmentDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};

export { Columns, DepartmentButtons };
