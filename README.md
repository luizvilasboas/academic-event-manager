# academic-event-manager

> An academic event management system developed in PHP and React. It allows users to register for courses, participate in events, and earn points based on their participation.

## About the Project

This project was created to manage academic events, allowing the administration of users, courses, and events. Users can register for courses, earn points, and view detailed reports on their participation.

Key features include:
*   **User Management:** Create, edit, and delete users with administrative privileges.
*   **Event & Course Management:** Add, update, and remove events and their associated courses.
*   **Course Registration:** Users can register and unregister from courses, with validation to prevent schedule conflicts.
*   **Scoring System:** Users accumulate points for registering in courses and lose points for unregistering.
*   **Reports & Ranking:** Detailed reports for users, events, courses, and participation, including a ranking system based on accumulated points.

## Tech Stack

The main technologies and libraries used in this project are:

*   **Backend:** [PHP](https://www.php.net/), [MySQL](https://www.mysql.com/), [Composer](https://getcomposer.org/)
*   **Frontend:** [React](https://react.dev/), [Axios](https://axios-http.com/), [React Router](https://reactrouter.com/), [React Icons](https://react-icons.github.io/react-icons/)
*   **Environment:** [Node.js](https://nodejs.org/)

## Usage

Below are the instructions for you to set up and run the project locally.

### Prerequisites

You need to have the following software installed to run this project:

*   [PHP](https://www.php.net/manual/en/install.php) (v7.4 or higher)
*   [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) (v5.7 or higher)
*   [Node.js](https://nodejs.org/en/download) (v14 or higher)
*   [Composer](https://getcomposer.org/download/)
*   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js)

### Installation and Setup

This project is divided into a `backend` and a `frontend` directory. Please refer to the `README.md` file inside each directory for specific installation and setup instructions.

*   [Backend README](https://github.com/luizvilasboas/academic-event-manager/tree/main/backend)
*   [Frontend README](https://github.com/luizvilasboas/academic-event-manager/tree/main/frontend)

### Workflow

1.  Access the backend at the configured URL (e.g., `http://localhost:8000`).
2.  Access the frontend at the default React URL (e.g., `http://localhost:3000`).

## API Endpoints

### Authentication
- `POST /auth/login`: Logs in a user.
- `POST /auth/register`: Registers a new user.

### Events
- `GET /event/list`: Lists all events.
- `GET /event/{id}`: Returns details for a specific event (admins only).
- `POST /event/create`: Creates a new event (admins only).
- `PATCH /event/update/{id}`: Updates event details (admins only).
- `DELETE /event/delete/{id}`: Deletes an event (admins only).

### Courses
- `GET /course/list`: Lists all courses.
- `GET /course/{id}`: Returns details for a specific course.
- `POST /course/create`: Creates a new course (admins only).
- `PATCH /course/update/{id}`: Updates course details (admins only).
- `DELETE /course/delete/{id}`: Deletes a course (admins only).
- `POST /course/{courseId}/register`: Registers the authenticated user in a specific course.
- `DELETE /course/{courseId}/unregister`: Unregisters the authenticated user from a specific course.

### Users
- `GET /user/list`: Lists all users.
- `GET /user/me`: Returns details of the authenticated user.
- `PATCH /user/{id}`: Updates details for a specific user.
- `DELETE /user/{id}`: Deletes a specific user.
- `GET /user/courses`: Lists courses associated with the authenticated user.
- `GET /user/events`: Lists events associated with the authenticated user.

### Scores
- `GET /scores`: Lists the scores of all users.

### Registrations
- `GET /registration`: Lists all users with their associated courses.

## Database Details

### Triggers
- **Add Points on Registration:** Adds 10 points to a user upon registering for a course.
- **Subtract Points on Unregistration:** Subtracts 10 points when a user unregisters from a course.
- **Initialize User Score:** Sets the initial score to 0 when a new user is created.

### Views
- **Participation Ranking:** Displays a user ranking based on their score.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
