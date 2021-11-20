# Feed Organizer

Instagram feed organizer. Upload your images and try rearranging them to get the best looking feed, ordered according to color patterns.
The app is published [here](https://feed-dnd.vercel.app/).

## Basic functioning

The app contains a 3x3 grid emulating an Instagram feed, and a list of the images that were uploaded by the user. Both are empty when you open the app for the first time:

![image](https://user-images.githubusercontent.com/35512873/142730575-746173f9-6bf8-480d-8804-1780f149459f.png)

Using the '+' button, you can select images to upload. The grid button on the lower right corner allows you to select different feed templates (a blank template, an 'X' template and a diagonal template). You can then drag each image to put it in the position you prefer.

![image](https://github.com/tcortes55/feed-dnd/blob/master/public/feed-dnd-demo.gif)

The app runs with anonymous authentication. If you click in the login button (lower left corner), you can choose whether you want to login with your e-mail or continue as guest. In case you choose to register with e-mail, your images are stored and loaded again when you log in from another device.

![image](https://user-images.githubusercontent.com/35512873/142732627-dd062d98-d4d5-4a60-919d-170c7a0acd27.png)



It was implemented using React.

React Dnd library
