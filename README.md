# ClearPass Endpoint Manager

A simple web application to add MAC addresses as endpoints in ClearPass.

## Prerequisites

- Python 3.7+
- ClearPass API credentials with endpoint management permissions

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-project
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your ClearPass API credentials:
   
   - `CLEARPASS_BASE_URL`: The base URL of your ClearPass server (e.g., `https://your-clearpass-server.example.com`)
   - `CLEARPASS_CLIENT_ID`: Your ClearPass API client ID
   - `CLEARPASS_CLIENT_SECRET`: Your ClearPass API client secret

## Running the Application

Start the application:
```
python app.py
```

Access the web interface at http://localhost:5000

## Features

- Simple web interface to add MAC addresses as endpoints in ClearPass
- Input validation for MAC address format
- Error handling and user feedback

## API Usage

The application exposes a simple API endpoint:

- `POST /api/add-endpoint`
  - Body: `{"mac_address": "00:11:22:33:44:55"}`
  - Response: JSON with success/error information