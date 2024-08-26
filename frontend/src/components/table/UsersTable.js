import React from "react";
import { FaUsers } from "react-icons/fa";

const UsersTable = ({ users, registrations }) => (
  <div className="mt-8">
    <h3 className="text-3xl font-semibold mb-6 flex items-center">
      <FaUsers className="mr-3 text-blue-500" /> Gerenciar Usuários
    </h3>
    {users.length > 0 ? (
      <>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-8">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                Nome
              </th>
              <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-3xl font-semibold mb-6 flex items-center">
          <FaUsers className="mr-3 text-blue-500" /> Curso atrelado a cada
          usuário
        </h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                Usuário
              </th>
              <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                Cursos Associados
              </th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-6">{registration.name}</td>
                <td className="py-3 px-6">
                  {registration.courses && registration.courses.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-800">
                      {registration.courses.map((course, index) => (
                        <li key={index}>{course.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">
                      Nenhum curso associado
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <p className="text-gray-700">Nenhum usuário cadastrado.</p>
    )}
  </div>
);

export default UsersTable;
