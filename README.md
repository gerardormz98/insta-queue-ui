# InstaQueue App ⏱️

![InstaQueue](https://github.com/gerardormz98/insta-queue-ui/assets/20232727/d85d36d3-db1c-4cd5-bba4-dd6d536fa37b)

InstaQueue is a real-time waitlist manager for restaurants and businesses. Users can join the waitlist, see their position in real-time, get notified when their table is ready, and more!

Inspired by Yelp's Guest Manager. Built by me 😊.

## Main Features
**Admins (Waitlist hosts)**

 - Create a new waitlist
 - Access admin features by password.
 - Edit waitlist.
 - View all users in waitlist.
 - Notify (buzz) users.
 - Kick users from the waitlist.
 - Mark user's party as completed.
 - Generate QR code to invite new users to join.

**Users**

 - Join waitlist by code or QR scan.
 - See current waitlist position, but hiding the information from other users.
 - Leave waitlist at any time.
 - Receive notifications from the administrator.
 - See total wait time.

## Try it live!
You can test the project here: https://instaqueue.netlify.app/. 

Ideally, you want to test with two devices: one acting as the administator and the other one as the user. I suggest you try the following flow:

 1. Create waitlist with the admin device.
 2. Generate QR code.
 3. Scan QR with user's device.
 4. Join the waitlist with user's device.
 5. Verify that user appears in admin dashboard.
 6. Send a notification to the user.
 7. Mark the user as completed.
 8. See total wait time on user's device.
 9. Close the waitlist with the admin device.

## Technology stack
This app was built in Angular 17 + .NET in the back-end. It uses Microsoft SignalR to achieve real-time functionalities, and a regular REST API for the other stuff.

Back-end source: https://github.com/gerardormz98/insta-queue-server.

Here's the details of the technologies used:

 - `Angular 17`
 - `.NET 7`
 - `Microsoft SignalR`
 - `Entity Framework Core`
 - `Json Web Token`
 - `Tailwind CSS`
 - `Microsoft Azure`
 - `Netlify`

## Note 
This is a practice project I built in my free time to challenge my development skills. It is not intended to be used in a production environment (yet) and all the data captured will be removed eventually.

Feel free to test it and report any bugs you find. Suggestions or comments are also welcome!

Thank you!
