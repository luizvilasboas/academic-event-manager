import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import useCourses from "../hooks/useCourses";

const Courses = () => {
  const { courses, listCourses } = useCourses();

  useEffect(() => {
    listCourses();
  }, [listCourses]);

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
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <FaBook className="w-10 h-10 text-white mr-4" />
              <h3 className="text-2xl font-semibold">{course.title}</h3>
            </div>
            <p className="text-gray-100">{course.description}</p>
          </Link>
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
