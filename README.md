# Django-React Spotify Music Controller

![Project Preview](screenshot.png)

This is a web application that allows users to control their Spotify playback remotely. It's built using Django on the backend and React on the frontend.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

1. Clone the repository:

git clone https://github.com/your-username/django-react-spotify-controller.git


2. Navigate to the project directory:

cd django-react-spotify-controller


3. Install backend dependencies:

pip install -r requirements.txt


4. Set up environment variables:
- Create a `.env` file in the root directory.
- Add your Spotify API credentials to the `.env` file:

  ```
  SPOTIFY_CLIENT_ID=your-client-id
  SPOTIFY_CLIENT_SECRET=your-client-secret
  ```

5. Navigate to the frontend directory:

cd frontend


6. Install frontend dependencies:

npm install


## Usage

1. Run the backend server:

python manage.py runserver


2. In a separate terminal, navigate to the frontend directory and start the development server:

npm run dev


3. Open your web browser and visit `http://localhost:3000` to access the Spotify Music Controller.

## Features

- Authenticate with Spotify account.
- Display current playback information (track, artist, album).
- Play, pause, skip, and control volume.
- View and select available devices.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request detailing your changes.

Please make sure to follow the [code of conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to me at bohdanputiak75@gmail.com
