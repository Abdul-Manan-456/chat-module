const admin = require("firebase-admin");

// Initialize the Firebase admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Define the message payload
// const message = {
//   notification: {
//     title: "Title of the notification",
//     body: "Body of the notification",
//   },
//   token: "registrationToken",
// };


// Create a message
// const message = {
//   notification: {
//     title: 'Hello from Node.js',
//     body: 'This is a test notification sent from Node.js!',
//   },
//   token: 'femOIWbCRc2mD_qId7fSDd:APA91bHhjvnzzkVMwbMo2bs0krDuva1E9xPaUMh1cYpdqVLImwdrUJaw_1bWLAX9vGwDGGCQd469YL8SfK9lEvp2qj4-Bm1ImdD4tZMZmkrTVd6hU8GaDgcMCr1cpO0jOK79vWFD2gOE', 
// };

// // Send the message
// admin.messaging().send(message)
//   .then((response) => {
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.error('Error sending message:', error);
//   });

