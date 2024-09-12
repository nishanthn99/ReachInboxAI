# ReachInBox Assignment

## Hello all, Due to the time constraint the some part of the assignment was pending.
## Server
The assignment is to build a tool that will parse and check the emails in a Google email ID, and
respond to the e-mails based on the context using AI. Use BullMQ as the tasks scheduler
This is a server-based application built with Node.js and Express. It uses various packages such as  `openai` for AI functionalities, `googleapis` for Google APIs, and `axios` for HTTP requests and `bullMQ` to process queues.

## Note
1. This is a server-based application, so it will be deployed on a server. The server will be configured to run the application continuously.
<br>
2. You need to Run the `Redis` Server Before Runinng the File. Redis is in-memory database which holdes the message Queue data and BullMQ is bult on top of Redis.

## Video links :
Video link for demo of this Application -[Loom Link](https://www.loom.com/share/fc3a428368e5482783304b07ad2717d4?sid=be310aca-5038-4adf-b68b-9c248a101bf0/)



# technologies used:
- Node.js - Creating the sserver
- Express.js - For building endpoint
- OpenAI -For AI promt replay
- Google APIs -For Oauth
# npm packages used
- dotenv - getting environment variables
- Axios - Making Promis Based Request
- bullMQ - For the Message Queue implementation
- google-auth-library - For google oauth, to get the access tokens
- ioredis - For building the connection with redis server

<br>

## Installation setup
1. Clone the repository to your local machine
```bash
git clone https://github.com/nishanthn99/ReachInboxAI.git
```

2. Run `npm install` to install all the dependencies(Refer package.json file for more Details about required library)

4. Create a `.env` file in the root directory with the same IDs as specified in the documentation.

## Running the server
1. To start the server, run the following command in your terminal
```bash
npm start
```
*This will start the server at localhost:3000 (or whatever port you have specified).*
or we can use backend deployed link also.

2. Run the index.html File with opening a file or `GO Live`
Then Click on the Open with Google Button which will redirect to the `Google oatuh` page.

## API Endpoints

### For Google's OAuth2.0:
- `http://localhost:3000/auth/google` - GET for google authentication
- `http://localhost:3000/api/mail/userInfo/:email` - GET request to view user profile
- `http://localhost:3000/api/mail/allDrafts/:email` - GET request to view all drafts mail.
- `http://localhost:3000/api/mail/read/:email/message/:message` - GET request to read a Specific message (message refers to message id)


## Sample .env sample:
```
PORT = ***
GOOGLE_CLIENT_ID = ***
GOOGLE_CLIENT_SECRET = ***
GOOGLE_REDIRECT_URI = ***
GOOGLE_REFRESH_TOKEN = ***
OPENAI_SECRECT_KEY = ***
redis_port = ***(default 6379)
redis_host = ***(default= http://127.0.0.1)
```