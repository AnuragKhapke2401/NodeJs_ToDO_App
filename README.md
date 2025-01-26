# Setup This Project Locally

## Clone the Git Repository
  
      git clone https://github.com/AnuragKhapke2401/NodeJs_ToDO_App.git

**Navigate to the Project Folder**

      cd chat-app

**Navigate to the Backend Folder**

      cd backend

**Edit the .env File According to Your System**

**Make the following changes in the .env file:**

       DB_HOST="localhost"
       DB_USER="root"
       DB_PASSWORD="Anurag234"
       DB_NAME="chat_db"
       DB_PORT=3307
       REDIS_HOST="localhost"
       REDIS_PORT=6379

**Install Backend Dependencies**

**Run the following command to install dependencies:**

       npm install

**Start the Backend Server**

**Start the backend using:**

      node server.js

**Navigate to the Frontend Folder**

      cd frontend

**Edit the Frontend .env File**

**Ensure the .env file contains the following configuration:**

      REACT_APP_API_URL=http://localhost:5000/api/messages

**Install Frontend Dependencies**

**Run the following command to install frontend dependencies:**

      npm install

**Start the Frontend**

**Start the frontend using:**

      npm start

**Database Setup in MySQL**

**Login to MySQL Workbench or CLI.**

**Create the database and use it:**

      CREATE DATABASE chat_db;
      USE chat_db;

**Create the necessary table inside the database:**

      CREATE TABLE messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

**Install Redis Server**

**Ensure that Redis is installed and running on your system to use this project.**
