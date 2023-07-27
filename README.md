# TeamMe - Online Application for Gamers Seeking Teammates

Team-Up is a web application designed for gamers who are looking for teammates to form teams in online games such as League of Legends, CSGO, and VALORANT. The concept is similar to a classifieds portal, where each logged-in user can create a team offer, specifying the details of the players they are looking for and the game they want to play.

Logged-in users can also apply to join any team created by other users. Additionally, users can set their preferences for the teams they are interested in. When a team offer that matches their preferences is created, they will receive an email notification. Team creators will be able to view and manage the users who apply to join their teams, accepting or rejecting their applications.

Once a user's application to a team is accepted, they will gain access to a real-time chat where all team members can communicate and discuss further details. Each team member will have access to a panel that displays the current team membership. If a team creator, they will also have the ability to manage team members.

Additionally, the application will feature an administrator panel, granting users with administrator privileges the ability to manage all users and teams. Any team offer must be approved by an administrator before becoming visible to all users.

## Technologies Used

### Backend

- Express.js: Web application framework for Node.js.
- MongoDB and Mongoose: Database and ODM for managing data.
- Socket.io: Real-time communication for chat functionality.
- JSON Web Tokens (JWT) and bcrypt: User authentication and password hashing.
- Nodemailer: For sending email notifications.
- Concurrently: For running both backend and frontend servers concurrently during development.

### Frontend

- React: Frontend framework for building user interfaces.
- React Router: For routing and navigation within the application.
- Axios: For making HTTP requests to the backend API.
- Socket.io Client: For real-time communication with the backend server.
- Tailwind CSS: Utility-first CSS framework for styling the application.
- Form validation using Yup and React Hook Form.
- React Modal: For displaying modal dialogs in the application.

## How to Get Started

1. Clone the repository to your local machine.
2. Install the backend and frontend dependencies by running `npm install` in both the main and "client" directories.
3. Copy the `.env.example` file from the "backend" directory and rename it to `.env`. Fill in the necessary data in the `.env` file.
4. From the main directory, run `npm run start` to start both the backend and frontend servers.

## About

This project is part of my bachelor's degree and was created to demonstrate my skills in full-stack web development. If you have any questions or feedback, feel free to contact me via email or connect with me on social media.
