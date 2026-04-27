"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UserControlPage() {
  const { allUsersData, updateUser, removeUser } = useContext(AuthContext);

  const handleToggleAdmin = async (email, isAdmin) => {
    try {
      await updateUser(email, !isAdmin);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Admin status updated for ${email}`,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleDeleteUser = async (email) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete User?",
      text: "This action cannot be undone",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await removeUser(email);
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "User deleted successfully",
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

      {allUsersData && allUsersData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Role</th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsersData.map((user) => (
                <tr key={user._id} className="border-b border-slate-200">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        user.isAdmin
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleToggleAdmin(user.email, user.isAdmin)
                        }
                        className="text-[#037092] hover:text-blue-700"
                      >
                        {user.isAdmin ? (
                          <FaToggleOn size={20} />
                        ) : (
                          <FaToggleOff size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
          <p className="text-gray-600">No users found</p>
        </div>
      )}
    </div>
  );
}
