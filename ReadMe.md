# CodePen Clone App
![Imgur](https://i.imgur.com/GlqILyL.png)

## Description

This is a CodePen Clone app, a web-based IDE for front-end designers and developers. It provides a platform where users can create HTML, CSS, and JavaScript code snippets, also known as 'pens', and see the live preview of their code. It's a great tool for testing, showcasing, and sharing front-end code.

## Features

1. **Real-time Preview**: See the changes in real-time as you modify the code.
2. **Multi-Language Support**: Supports HTML, CSS, and JavaScript.
3. **Save Pens**: Users can save their 'pens' for future reference and modification.
4. **Dark Mode Interface**: Offers a dark mode interface to ease the strain on the eyes and enhance the coding experience.
5. **Responsive Design**: The app's layout is designed to work well on both desktop and mobile browsers.
## Installation and Setup

1. Clone the repository:
2. Navigate to the project directory: cd codepen-clone
3.  Install the necessary packages: npm install 
4. Run the application: npm start

5. The application should now be running at `http://localhost:3000`.


   
## Backend

The backend of the application is designed with Java Spring Boot, a robust and versatile framework for building the server-side components of the application. The backend communicates with a PostgreSQL database to store and manage user-generated content, facilitating efficient data management and retrieval.

### Setting up the Backend

1. Install [Java JDK](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html) (version 15 or later).
2. Install [Maven](https://maven.apache.org/) (for dependency management).
3. Set up your Spring Boot application by following the [official guide](https://spring.io/guides/gs/spring-boot/).

## Database

The project uses PostgreSQL as its database system. Follow these steps to set it up:

1. Install [PostgreSQL](https://www.postgresql.org/download/) and set up a new database.
2. Configure your `application.properties` file in your Spring Boot application to connect to your PostgreSQL database. 

## Setting up the Backend

1. Download and install Java JDK (version 15 or later) to develop and run the Java application.
2. Download and install Maven to manage project dependencies and builds effectively.
3. Initialize your Spring Boot application following the instructions in the official guide to set up the application structure and necessary configurations.
## Security and User Authentication
1. Security is a paramount aspect of this application, ensuring safe user data handling and secure interactions with the backend. Here are some features and strategies implemented to enhance security:

2. Secure Password Handling: User passwords are stored securely using modern cryptographic hashing algorithms.
3. JWT Authentication: Utilizes JSON Web Tokens (JWT) for secure, token-based user authentication.
4. Cross-Origin Resource Sharing (CORS): Implements CORS policies to prevent unauthorized domains from making requests to the backend.


## Usage

1. **Creating a New Pen**:
- Navigate to the home page and click on 'Create New Pen' to start creating your code snippet.
- Login or Register to save a new Pen!

2. **Editing a Pen**:
- Use the editor panels to add or modify HTML, CSS, and JavaScript code.
- Switch between different panels using the tabs at the top of the editor.

3. **Saving a Pen**:
- Click the 'Save Pen' button to save your pen.
- Provide a title for your pen before saving.

4. **Viewing a Pen**:
- All your saved pens can be viewed on the home page.
- Click on a pen to view or edit it.

## Contributing

We welcome contributions to the CodePen Clone project. Please follow the [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
![Imgur](https://i.imgur.com/svXdE1q.png)



 Happy Coding!
