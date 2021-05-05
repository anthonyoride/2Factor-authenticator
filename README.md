# Backend Application Logic

The entry point to the app is the app.ts which calls the server.ts module and initialises the app.
When the user calls the request-otp endpoint to get an OTP, a six digit code will be generated within the createAuthCode method in the factorAuthenticationController class.
The generated code and the user's phone number is then committed into database for later verification.
After getting the OTP, the user attemps to verify by calling the verify-otp endpoint. At this point, the database will be queried to get the previous data(phone number and authentication code) saved for that same user, using the OTP enter by the user and the phone number already stored in the application state on the frontend when the user requested for the OTP.
If a match is found in the database, a check will be done to see if it's past 60secs since that record was inserted. If the check isn’t passed, the user will need to request for a new code

##things to note
The code generated was logged into the console rather than being sent to user's phone. The reason is because Plivo’s API is not supported in my region so i couldn’t create an account and i had issues trying to create a twillo account

I used PostgreSQL pooling rather than integrating with sequelize ORM for the sake of time 

