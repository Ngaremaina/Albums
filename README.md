# 📸 Momentos App

**Momentos** is a user-friendly application that allows users to register, log in, and explore their cherished memories through albums and photos. Users can also manage their photo titles effortlessly.

## 🛠 Features

- **User Registration**: Create an account to start managing your memories.
- **User Login**: Secure login functionality to access personalized content.
- **Album Viewing**: Browse through your albums and relive your moments.
- **Photo Management**: View pictures within albums and update their titles for better organization.

## 🖥️ Tech Stack

### Backend
- **Spring Boot**: Handles the server-side logic and API development.
- **PostgreSQL**: Database for storing user, album, and photo data.

### Frontend
- **Vite**: Build tool for faster development and optimized production builds.
- **React**: Library for building a responsive and interactive user interface.

### Containerization
- **Docker**: Containerized deployment for easy setup and scalability.
- **Docker Compose**: Simplifies running the app locally with one command.

## 🚀 Getting Started

### Prerequisites
1. **Java 17+** installed.
2. **Node.js** (v16 or later) with npm or yarn installed.
3. **PostgreSQL** database set up.

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ngaremaina/Albums
   cd Albums
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Update the `application.yml` file with your PostgreSQL credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/momentos
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     ```
   - Build and run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

Alternatively:  
1. Open the `docker-compose.yml` file.  
   Update the environment variables under the backend service to match your database credentials:  

   ```yaml
   environment:
     - SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/momentos
     - SPRING_DATASOURCE_USERNAME=your-username
     - SPRING_DATASOURCE_PASSWORD=your-password
   ```

2. Build and run the app:  
   ```bash
   docker-compose up --build
   ```  

## 📂 Project Structure

### Backend
- `/src/main/java/com/momentos`: Contains controllers, services, and repository layers.
- `/src/main/resources`: Includes configuration files like `application.yml`.

### Frontend
- `/src/components`: React components for UI elements.
- `/src/pages`: Pages like Login, Register, Albums, and Photos.
- `/src/services`: API calls and client-side business logic.

## 📋 API Endpoints

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/v1/users/signup`    | Register a new user             |
| POST   | `/api/v1/users/login`     | Authenticate user               |
| GET    | `/api/v1/users/:username` | Get the user profile            |
| GET    | `/api/v1/albums/:id`      | Fetch album by id for the user  |
| POST   | `/api/v1/albums/add`      | Add a New Album                 |
| PUT    | `/api/photos/:id`         | Update photo title              |
| POST   | `api/v1/images/add`       | Add a New Image                 |

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.