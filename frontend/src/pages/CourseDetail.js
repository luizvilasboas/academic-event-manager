import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCourses from "../hooks/useCourses";
import { FaArrowLeft, FaCalendarAlt, FaChalkboardTeacher, FaClock } from "react-icons/fa";

const CourseDetail = () => {
  const { id } = useParams();
  const { courses, listCourses } = useCourses();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    listCourses();
  }, [listCourses]);

  useEffect(() => {
    const selectedCourse = courses.find((course) => course.id === parseInt(id));
    setCourse(selectedCourse);
  }, [courses, id]);

  if (!course) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-16 p-10">
      <Link
        to="/courses"
        className="text-blue-500 flex items-center mb-8 hover:underline text-lg"
      >
        <FaArrowLeft className="mr-2" /> Voltar para os cursos
      </Link>
      <h2 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {course.title}
      </h2>
      <p className="text-xl text-gray-800 mb-10 leading-relaxed">{course.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="flex items-center bg-blue-100 p-6 rounded-lg shadow-md">
          <FaCalendarAlt className="text-blue-500 w-8 h-8 mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Data de Início</h4>
            <p className="text-gray-700">{course.startDate || "A definir"}</p>
          </div>
        </div>
        <div className="flex items-center bg-purple-100 p-6 rounded-lg shadow-md">
          <FaClock className="text-purple-500 w-8 h-8 mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Duração</h4>
            <p className="text-gray-700">{course.duration || "A definir"}</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 p-6 rounded-lg shadow-md">
          <FaChalkboardTeacher className="text-green-500 w-8 h-8 mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Instrutor</h4>
            <p className="text-gray-700">{course.instructor || "A definir"}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          to={`/courses/${id}/enter`}
          className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg hover:scale-110 transform transition-transform duration-300"
        >
          Entrar no Curso
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
