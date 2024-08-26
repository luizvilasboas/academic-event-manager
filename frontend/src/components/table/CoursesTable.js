import React from "react";
import { FaBook, FaEdit, FaTrashAlt } from "react-icons/fa";

const CoursesTable = ({ courses, openCourseModal, deleteCourse }) => (
  <div className="mt-8">
    <h3 className="text-3xl font-semibold mb-6 flex items-center">
      <FaBook className="mr-3 text-purple-500" /> Gerenciar Cursos
    </h3>
    {courses.length > 0 ? (
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
              Curso
            </th>
            <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
              Descrição
            </th>
            <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-6">{course.title}</td>
              <td className="py-3 px-6">{course.description}</td>
              <td className="py-3 px-6 flex gap-4">
                <button
                  onClick={() => openCourseModal(course)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-700">Nenhum curso cadastrado.</p>
    )}
  </div>
);

export default CoursesTable;
