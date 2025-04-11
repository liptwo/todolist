# Note Taking App

A real-time note-taking application built with React and Firebase, allowing users to create, update, and delete notes seamlessly.

## Features

- ✨ Create new notes with title and content
- 🔄 Real-time updates using Firebase Realtime Database
- ✏️ Edit existing notes through a modal interface
- 🗑️ Delete notes with a simple click
- 📱 Responsive design for all devices

## Technologies Used

- React.js
- Firebase Realtime Database
- Tailwind CSS
- Material-UI Icons
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
bash
git clone https://github.com/liptwo/todolist.git
cd todolist

2. Install dependencies
bash
npm install

3. In file firebase you need create a project Realtimme database then create a new firebase in /src and copy pastes code firebase provide.
  
4. You need hide you key_api of firebase then you need pastes your api_key in  `.env ` and in `firebase.js` you need add it like `import.meta.env.NAME_KEY_IN_ENV`.

5. Start the development server
bash
npm run dev


## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##Demo

![image](https://github.com/user-attachments/assets/5b027f93-4017-48c4-b996-ba430119140c)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

Văn Huỳnh

## Acknowledgments

- Firebase for the real-time database functionality
- React community for the amazing ecosystem
- Tailwind CSS for the styling utilities
