# Full Stack FeedbackAI - Nextjs

FeedbackAI is a user-friendly platform for anonymous feedback with AI-powered suggestions. Built with Next.js, Mongoose, Zod, TypeScript, and OpenAI, it prioritizes user privacy while providing intelligent recommendations. This repository contains the source code for a full-stack application featuring a custom authentication system with JWT tokens, sessions, and AI integration.

## Demo

- Live Preview: [https://feedback-ai-nextjs.vercel.app/](https://feedback-ai-nextjs.vercel.app/)

## Features

- Custom authentication system for User Registration
- Sign In / Logout with Nextjs Auth, JWT Tokens and sesssion
- OTP verification for new user account
- Check available Username at Runtime
- Resend email integration for email notifications
- User dashboard for managing anonymous messages
- User can accept/close messages.
- User can copy their message URL and share with peoples.
- AI feature integration for enhanced functionality
- Anonymous feedback submission with AI suggestions
- Responsive design using Tailwind CSS and Shadcn UI
- Dynamic routing and server-side rendering capabilities
- Form handling with React Hook Form and validation using ZOD

## Screenshots

![Home](https://i.ibb.co/vjSZFWg/feedback-AI-1.png)
- Home Page

![Login](https://i.ibb.co/kxMV97j/feedback-AI-6.png)
- Login Page

![Signup](https://i.ibb.co/sWP5cDn/feedback-AI-7.png)
- Signup Page

![Verify](https://i.ibb.co/q5nD40b/feedback-AI-6.png)
- OTP Verification

![Message](https://i.ibb.co/fdqxJPF/feedback-AI-4.png)
- Message Page

![Dashboard](https://i.ibb.co/FHD4mQr/feedback-AI-5.png)
- User Dashboard Page
  
## Run Locally

Clone the project

```bash
    https://github.com/Mshandev/FeedbackAI-Nextjs.git
```
Go to the project directory

```bash
    cd FeedbackAI-Nextjs
```
Install dependencies

```bash
    npm install
```

Setup Environment Vaiables

```Make .env file in "root" folder and store environment Variables
  MONGODB_URI= YOUR-MONGO-URL
  RESEND_API_KEY= YOUR-RESEND-API-KEY
  NEXTAUTH_SECRET=YOUR-SECRET-KEY
  OPENAI_API_KEY= YOUR-OPENAI-API-KEY
 ```

Start the server

```bash
    npm run dev
```

## Tech Stack
* [Nextjs](https://nextjs.org/)
* [Mongodb](https://www.mongodb.com/)
* [Resend](https://resend.com/)
* [OpenAI](https://openai.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [Shadcn](https://ui.shadcn.com/)
* [Zod](https://zod.dev/)

## Deployment

The application is deployed on Vercel.

## Contributing

Contributions are always welcome!
Just raise an issue, and we will discuss it.

## Feedback

If you have any feedback, please reach out to me [here](https://www.linkedin.com/in/muhammad-shan-full-stack-developer/)
