## Document Manager

# Summary 

This project is a React.js application styled using Tailwind CSS, simulating the functionality of a document management interface. The application loads a static JSON file with 5 document types and displays them as cards, divided into two rows (3 cards in the first row and 2 in the second). Each card has unique thumbnail images representing the document type. Here are the key features and technologies used:

# Key Features:

Static JSON Data: The application loads a static JSON file containing document types (e.g., Bank Draft, Invoice, Bill of Lading) using mswjs to mock the API calls. <br />

Card Layout: The document types are displayed as 5 cards in a responsive grid layout (3 cards in the first row, 2 in the second). <br />

Thumbnail & Spinner: Each document card has a different thumbnail image, with a placeholder spinner displayed while the image is loading.<br />

Drag-and-Drop: The cards can be rearranged via drag-and-drop functionality. <br />

Overlay Image Display: Clicking on a card displays the associated image as an overlay in the center of the webpage. Pressing the "ESC" key closes the overlay. <br />

Containerization: The app is containerized using Docker, allowing easy deployment. A Dockerfile and a YAML file are included for setting up the environment.

# Snippet 

<img src="/src//assets/snippet.png" />

# Tech Stack 

ReactJS, Docker, Tailwind CSS, React-Beautiful-DND, MSWJS, YAML





