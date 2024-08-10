import React from "react";
import { FaBook } from "react-icons/fa";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

const courses = [
  {
    id: 1,
    name: "Introdução a Algoritmos",
    description: "Aprenda os fundamentos de algoritmos e estruturas de dados.",
  },
  {
    id: 2,
    name: "Matemática Discreta",
    description:
      "Um curso essencial sobre matemática discreta para ciência da computação.",
  },
  {
    id: 3,
    name: "Sistemas Operacionais",
    description: "Entenda os fundamentos dos sistemas operacionais.",
  },
  {
    id: 4,
    name: "Sistemas de Banco de Dados",
    description: "Aprenda sobre bancos de dados relacionais e SQL.",
  },
  {
    id: 5,
    name: "Redes de Computadores",
    description: "Introdução às redes de computadores e comunicação de dados.",
  },
  {
    id: 6,
    name: "Inteligência Artificial",
    description: "Explore os conceitos e aplicações da IA.",
  },
  {
    id: 7,
    name: "Aprendizado de Máquina",
    description: "Mergulhe no mundo dos algoritmos de aprendizado de máquina.",
  },
  {
    id: 8,
    name: "Desenvolvimento Web",
    description: "Aprenda a construir aplicações web modernas.",
  },
  {
    id: 9,
    name: "Desenvolvimento de Aplicativos Móveis",
    description: "Crie aplicativos para plataformas Android e iOS.",
  },
  {
    id: 10,
    name: "Cibersegurança",
    description: "Entenda os princípios da cibersegurança.",
  },
];

const Courses = () => {
  const coursesPerPage = 5;

  const {
    currentPage,
    currentItems: currentCourses,
    totalPages,
    paginate,
  } = usePagination(courses, coursesPerPage);

  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-12">
        Cursos Disponíveis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {currentCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <FaBook className="w-10 h-10 text-white mr-4" />
              <h3 className="text-2xl font-semibold">{course.name}</h3>
            </div>
            <p className="text-gray-100">{course.description}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default Courses;
