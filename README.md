# Feed Organizer

Instagram feed organizer. Upload your images and try rearranging them to get the best looking feed, ordered according to color patterns.
The app is published [here](https://feed-dnd.vercel.app/).

## Usage

The app contains a 3x3 grid emulating an Instagram feed, and a list of the images that were uploaded by the user. Both are empty when you open the app for the first time:

![image](https://user-images.githubusercontent.com/35512873/142730575-746173f9-6bf8-480d-8804-1780f149459f.png)

Using the ```+``` button, you can select images to upload. The grid button on the lower right corner allows you to select different feed templates (a blank template, an 'X' template and a diagonal template). You can then drag each image to put it in the position you prefer.

![image](https://github.com/tcortes55/feed-dnd/blob/master/public/feed-dnd-demo.gif)

The app runs with anonymous authentication. If you click in the login button (lower left corner), you can choose whether you want to login with your e-mail or continue as guest. In case you choose to register with e-mail, your images are stored and loaded again when you log in from another device.

![image](https://user-images.githubusercontent.com/35512873/142732627-dd062d98-d4d5-4a60-919d-170c7a0acd27.png)

## Implementation

The application state (containing the positions of all the uploaded images) is stored in an object called ```imagePositions```, which has an array for the existing places in the feed and another one for the places in the carousel. The arrays have null values in the positions that do not contain images, and the image URL in those that do contain an image.

The application's main component is the ```Board```, which can be roughly separated in three parts: ```Feed```, ```Carousel``` and ```Menu```. ```Feed``` and ```Carousel``` are composed by ```Squares```, which are components used to render the background color according to the selected template.

The ```Board``` receives the ```imagePositions``` object and passes to each ```Square``` its corresponding value in the array. In case a ```Square``` receives an image URL instead of a null value, the image is rendered.

### Drag and Drop functionality

The application uses [React DnD library](https://react-dnd.github.io/react-dnd/about) for the drag and drop functionality.
In ```PictureManager```, there is a function named ```observe``` which subscribes to the state of ```imagePositions```. ```PictureManager``` exposes method ```movePicture``` (which is called on the drop event to change the values in the arrays) and others.

### Image upload

Once you click ```+``` and select an image to upload, the images are resized and cropped (there's no need to spend storage with high resolution images; we just need a small thumbnail in order to organize the feed).

The images are saved to Google's Firebase storage. The upload method returns the image's URL, which is then added to the ```imagePositions``` corresponding array.

### Authentication

The application uses [FirebaseUI](https://github.com/firebase/firebaseui-web) library. It was configured to automatically use anonymous authentication on page load, thus, the user is able to use the app without needing to log in. When you click in the login button, there's the option to continue as guest or to login/register with e-mail. The process that follows the login/register action is handled by ```FirebaseUI```.

### Hosting

The app is published to [Vercel](https://vercel.com/) and is integrated to Github; all changes to the master branch are automatically deployed to http://feed-dnd.vercel.app/

## References
- [React DnD library](https://react-dnd.github.io/react-dnd/about)
- [FirebaseUI](https://github.com/firebase/firebaseui-web)
- [Vercel](https://vercel.com/)
