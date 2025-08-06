# Greenbank Tutor System

## Deployment on Render

This project is configured for deployment on Render. Follow these steps to deploy:

### 1. Connect to GitHub
- Fork or clone this repository to your GitHub account
- Ensure the repository is public (for free Render plan)

### 2. Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub account and select this repository
4. Configure the service:
   - **Name**: `greenbank-tutor-system`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Set Environment Variables
In your Render dashboard, add these environment variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `EMAIL_USER`: `greenbanktutorsystem@gmail.com`
- `EMAIL_PASS`: Your Gmail app password
- `NODE_ENV`: `production`

### 4. Deploy
Click "Create Web Service" and wait for the deployment to complete.

## Local Development Setup

Create a `.env` file in the project root with the following variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
EMAIL_USER=greenbanktutorsystem@gmail.com
EMAIL_PASS=your_gmail_app_password
JWT_SECRET=your_secure_jwt_secret
```

---

# Tutor System

A comprehensive web-based tutoring system that allows students to book sessions with qualified tutors, and managers to oversee the entire operation.

## Features

### For Students
- User registration and login with first name, surname, and email
- Browse available subjects
- View approved tutors for each subject
- Book tutoring sessions with time period and description
- View booking history and status
- Update profile information
- Edit and cancel bookings with email notifications

### For Tutors
- Tutor registration with subjects and description
- Application approval system by manager
- Receive booking requests via email
- View assigned bookings in Tutor Panel
- Accept bookings and send messages to students
- Complete sessions with duration tracking

### For Managers
- Admin panel with manager credentials (greenbanktutorsystem@gmail.com / Academic123)
- Approve/reject tutor applications
- Assign tutors to multiple subjects
- Remove tutors and subjects
- View all bookings across the system
- Receive email notifications for new tutor registrations

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Bootstrap 5
- **Deployment**: Render

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Gmail account with App Password
- Render account (for deployment)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Greenbank-tutor/tutorsystem.git
   cd tutorsystem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the project root
   - Add the required environment variables (see above)

4. **Start the server**
   ```bash
   npm start
   ```
   or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:3000`

## Default Manager Account

The system automatically creates a default manager account:
- **Email**: greenbanktutorsystem@gmail.com
- **Password**: Academic123

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `PUT /api/profile` - Update user profile

### Subjects & Tutors
- `GET /api/subjects` - Get all subjects
- `GET /api/tutors/:subject` - Get approved tutors for a subject
- `GET /api/tutors` - Get all approved tutors
- `POST /api/tutor/register` - Tutor registration

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/tutor` - Get tutor's bookings
- `PUT /api/bookings/:id` - Update booking (user only)
- `DELETE /api/bookings/:id` - Cancel booking (user only)
- `PUT /api/bookings/:id/accept` - Accept booking (tutor only)
- `PUT /api/bookings/:id/complete` - Complete session (tutor only)
- `POST /api/bookings/:id/message` - Send message to student (tutor only)

### Admin (Manager)
- `GET /api/admin/tutors` - Get all tutors (pending and approved)
- `PUT /api/admin/tutors/:id/approve` - Approve a tutor
- `PUT /api/admin/tutors/:id/assign-multiple` - Assign multiple subjects to tutor
- `PUT /api/admin/tutors/:id/reject` - Reject tutor application
- `DELETE /api/admin/tutors/:id/remove` - Remove tutor
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/tutor-requests` - Get pending tutor requests
- `POST /api/admin/subjects` - Add subject
- `DELETE /api/admin/subjects/:id` - Remove subject

## Database Schema

### User
- firstName (String, required)
- surname (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- isAdmin (Boolean, default: false)

### Tutor
- firstName (String, required)
- surname (String, required)
- email (String, required, unique)
- subjects (Array of Strings, required)
- description (String, required)
- isApproved (Boolean, default: false)
- createdAt (Date, default: now)

### Subject
- name (String, required, unique)

### Booking
- user (ObjectId, ref: User, required)
- tutor (ObjectId, ref: Tutor, required)
- subject (String, required)
- timePeriod (String, required)
- description (String, required)
- date (Date, required)
- status (String, enum: ['pending', 'accepted', 'completed', 'cancelled'])
- createdAt (Date, default: now)

## Usage Guide

### For Students
1. Register with your first name, surname, and email
2. Login to access the dashboard
3. Browse available subjects
4. Select a subject to see available tutors
5. Click "Book Session" to schedule a tutoring session
6. Fill in the booking details (date, time period, description)
7. View your bookings in the "My Bookings" tab
8. Edit or cancel bookings as needed

### For Tutors
1. Go to the "Become a Tutor" tab
2. Fill in your details including subjects and description
3. Submit your application
4. Wait for manager approval
5. Once approved, access the "Tutor Panel" to view bookings
6. Accept bookings and communicate with students

### For Managers
1. Login with the manager credentials
2. Access the "Manager Panel" tab
3. Review pending tutor applications
4. Approve qualified tutors and assign subjects
5. Monitor all bookings in the system
6. Remove tutors or subjects as needed

## Email Notifications

The system sends email notifications for:
- New tutor registrations (to manager)
- Tutor approval confirmations (to tutors)
- New booking requests (to tutors)
- Booking updates and cancellations (to tutors)
- Booking acceptances (to students)
- Session completions (to manager)
- Messages between tutors and students

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS protection
- Admin-only routes protection
- Cache control headers

## Customization

### Adding Subjects
Subjects can be added through the manager panel or directly to the MongoDB database.

### Email Templates
Email templates can be customized in the `index.js` file in the respective email sending sections.

### Styling
The frontend uses Bootstrap 5 and can be customized by modifying the CSS in `public/style.css`.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB Atlas is properly configured
   - Check if the connection URL is correct
   - Verify IP whitelist settings

2. **Email Not Sending**
   - Verify email credentials in the configuration
   - Check if 2FA is enabled on Gmail (use app password)
   - Ensure the email service is properly configured

3. **Render Deployment Issues**
   - Check build logs in Render dashboard
   - Verify environment variables are set correctly
   - Ensure the repository is public (for free plan)

### Logs
Check the console output for detailed error messages and debugging information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team. 