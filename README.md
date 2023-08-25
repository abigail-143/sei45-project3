<a name="readme-top"></a>
<h1 align="center">
<img src="https://github.com/abigail-143/sei45-project3/assets/106907059/93019466-5784-4d63-bf32-6c27630e70fa" alt="beer" width="50" height="50"> Beer Time, Better Time <img src="https://github.com/abigail-143/sei45-project3/assets/106907059/93019466-5784-4d63-bf32-6c27630e70fa" alt="beer" width="50" height="50">
</h1>

## Table of Contents
1. [Introduction](#intro)
2. [The Platform](#platform)
3. [How to use](#use)
4. [Languages & Technology & Packages & Frameworks](#languages)
5. [Resources & References](#resources)

***
<a name="intro"></a>
## Introduction
A social media platform for beer enthusiast to share their favourite moments with their favourite drink. Platform users are able to interact with content from other users as well as upload content to the app to be shared with other users.
***
<a name="platform"></a>
## The Platform

#### Expectations

![Screenshot 2023-08-24 at 20 32 18](https://github.com/abigail-143/sei45-project3/assets/106907059/72d8437c-f71c-4742-9802-6a76c4e2e72e)


With inspiration taken from Pinterst and Instagram, we created a vision of what we wanted the social media platform to look like. There would be a landing page, an explore page where contents created by all platform users will be displayed as well as a user page where users will be able to view contents they have created as well as contents they have interacted with.


#### Landing Page - Register & Login

![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/7cbb92d9-3475-4e93-80e6-bc979b1b415a)


On the landing page, users will be able to have a sneak preview of the contents they can expect on the platform. They will also be able to register an account or proceed to login with an existing account.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/935dee56-2274-4a68-9d65-4d0f1415cb28)


To register, users will be able to upload their own profile photo and register an account with the platform using a username and password.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/22f1ae3e-fcf9-4a29-9a64-14938772b023)


To login, users can login to the site with their registered username and password, and if the login is successful, users will be directed to the explore page.



![Screenshot 2023-08-24 at 20 41 13](https://github.com/abigail-143/sei45-project3/assets/106907059/1d2e0192-4e25-4ef6-a05c-1d2e8098a59a)


If users try to login with an incorrect username or password, they will be prompt of an unauthorised login.


#### Explore Page - Search Bar & Like Content

![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/7f9597a4-3a0f-4b05-9183-3adb77f645d5)


On the explore page, user created content will be displayed in a Masonry layout. There is also a search bar and quick filter buttons that users can interact with. On the header, there is also a heart icon and a small icon of their profile photo. The heart icon will lead to the user's page where all the content they have liked will be displayed. The profile photo icon will lead to the user's page where all the content they have created will be displayed.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/cb4a0bfa-13f8-48ce-82ff-d39a382a04c5)


To interact with other user's content, the platform user can hover over the content display in the Masonry layout and click on the heart icon which will add the content to their Favourites tab.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/9fa450ee-b77c-47f2-9aad-7f65bd52ee14)


Else, users can also click on the content which will open up the content to display more information provided by the content creator. This includes the name of the drink, the place it was purchased from, a review of the drink as well as any unique hashtags they users wish to associate with the drink. Platform users will be able to upload comments to the content. A user is allowed to delete comments of other users on a post that they have created. The user is also allowed to delete their own comment from another user's post.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/31708f1f-68ca-437d-8b37-b413e9547ac8)


Users can also choose to search for specific drinks using the search bar of the quick filter buttons. This will show users content related to the search keywords that the users wish to look for.


#### User Page - Created Content / Favourite Content

![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/cfa72ebc-f740-4c5d-938b-72b2f5ddfecd)


On the platform user's own page, they will be able to view all contents that they have created and uploaded to the platform through the Created tab. Clicking into the content block will also show a pop up of the content which allows they to take a look at the comments left behind by other users. A user is also allowed to delete their own content from the platform.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/04d2dc1e-ed9a-4d77-805c-a120d168de87)


In the Favourite tabs, the user will be able to view all contents that they have liked through the Explore Page. Clicking into the content block will also allow users to take a deeper look into the content.


#### User Page - Update Profile / Submit Content

![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/292ea07e-3a5d-427d-9337-108dda2fc221)


Under the user profile photo and username, users can click on the Edit Profile button which allows users to change their username.



![Screenshot](https://github.com/abigail-143/sei45-project3/assets/106907059/135f5a8a-2ce0-48ab-9d74-af979de03a57)


There is also a Add Post button which allows users to created content to be uploaded to the platform and displayed on the Explore Page. The user will be able to upload an image and add write ups on the product they wish to share with the platform.

***
<a name="use"></a>
## How to Use / View
1. Download frontend folder, backend folder and .gitignore
2. Add individual .env files to both frontend folder and backend folder
3. .env file for frontend folder should include:
   >
   > VITE_SERVER=http://localhost:[port]
5. .env file for backend folder should include:
   >
   > PORT=[port]
   > 
   > DATABASE=mongodb://127.0.0.1:27017/[database *optional]
   >
   > ACCESS_SECRET=[any alphanumerical string]
7. npm install then npm run dev for both frontend and backend folders.
8. seed users, content and comments on Postman (or equivalent)
   >
   > seed users
   >> {{server}}/landing/seed
   >
   > seed contents
   >> {{server}}/fyp/seed-contents
   >
   > seed comments
   >> {{server}}/beer/comments/seed
***
<a name="languages"></a>
## Languages & Technology & Packages & Frameworks
- HTML
- CSS
- Javascript
- React (VITE)
- Express
- MongoDB
- Mongoose
- Material UI
- react-responsive-masonry
- Base64
***
<a name="resources"></a>
## Resources & References

1. Uploading Images (Base64)
- [https://www.youtube.com/watch?v=pfxd7L1kzio](https://www.youtube.com/watch?v=pfxd7L1kzio)
- [https://github.com/akashyap2013/ImageToBase64](https://github.com/akashyap2013/ImageToBase64)

2. Masonry Layout
- [https://github.com/cedricdelpoux/react-responsive-masonry/blob/master/README.md](https://github.com/cedricdelpoux/react-responsive-masonry/blob/master/README.md "smartCard-inline")
- [https://codesandbox.io/s/dawn-lake-hli6n-2-forked-t3y5w?file=/src/styles.scss:283-314](https://codesandbox.io/s/dawn-lake-hli6n-2-forked-t3y5w?file=/src/styles.scss:283-314 "smartCard-inline")
- [https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/](https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/ "smartCard-inline")
- [https://jsbin.com/cebego/1/edit?html,css,output](https://jsbin.com/cebego/1/edit?html,css,output "smartCard-inline")
- [https://www.npmjs.com/package/react-responsive-masonry](https://www.npmjs.com/package/react-responsive-masonry)

3. Navigating MongoDB / Mongoose
- [https://www.baeldung.com/java-mongodb-document-insert-array](https://www.baeldung.com/java-mongodb-document-insert-array)
- [https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)
- [https://www.mongodb.com/docs/manual/reference/operator/query/in/](https://www.mongodb.com/docs/manual/reference/operator/query/in/)
- [https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/ "smartCard-inline")
- [https://www.mongodb.com/community/forums/t/find-an-object-in-nested-array-of-object/172159](https://www.mongodb.com/community/forums/t/find-an-object-in-nested-array-of-object/172159 "smartCard-inline")
- [https://www.mongodb.com/docs/manual/reference/operator/update/pull/#:~:text=The%20%24pull%20operator%20removes%20from,an%20array%2C%20use%20dot%20notation.](https://www.mongodb.com/docs/manual/reference/operator/update/pull/#:~:text=The%20%24pull%20operator%20removes%20from,an%20array%2C%20use%20dot%20notation. "smartCard-inline")
- [https://stackoverflow.com/questions/62970436/query-nested-array-of-object-mongoose](https://stackoverflow.com/questions/62970436/query-nested-array-of-object-mongoose "smartCard-inline")
- [https://mongoosejs.com/docs/api/model.html#Model.find()](https://mongoosejs.com/docs/api/model.html#Model.find() "smartCard-inline")

4. CSS Styling
- [https://stackoverflow.com/questions/3029422/how-to-auto-resize-an-image-while-maintaining-aspect-ratio](https://stackoverflow.com/questions/3029422/how-to-auto-resize-an-image-while-maintaining-aspect-ratio "smartCard-inline")
- [https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert "smartCard-inline")
- [https://stackoverflow.com/questions/21555519/hide-the-child-element-of-a-div-on-hover](https://stackoverflow.com/questions/21555519/hide-the-child-element-of-a-div-on-hover "smartCard-inline")
- [https://codepen.io/sosuke/pen/Pjoqqp](https://codepen.io/sosuke/pen/Pjoqqp "smartCard-inline")
- [https://stackoverflow.com/questions/27784727/how-to-make-child-div-scrollable-when-it-exceeds-parent-height](https://stackoverflow.com/questions/27784727/how-to-make-child-div-scrollable-when-it-exceeds-parent-height "smartCard-inline")


5. Express / React
- [https://legacy.reactjs.org/docs/conditional-rendering.html](https://legacy.reactjs.org/docs/conditional-rendering.html "smartCard-inline")
- [https://bobbyhadz.com/blog/react-add-remove-class-on-click#:~:text=If%20you%20need%20to%20remove,remove%20method.](https://bobbyhadz.com/blog/react-add-remove-class-on-click#:~:text=If%20you%20need%20to%20remove,remove%20method. "smartCard-inline")
- [https://www.codeconcisely.com/posts/react-css-modules-multiple-classes/](https://www.codeconcisely.com/posts/react-css-modules-multiple-classes/ "smartCard-inline")
- [https://stackoverflow.com/questions/68776373/overflow-hidden-problem-in-react-js-front-end](https://stackoverflow.com/questions/68776373/overflow-hidden-problem-in-react-js-front-end "smartCard-inline")

6. Images Used
- [https://unsplash.com/](https://unsplash.com/)
- [https://picsum.photos/](https://picsum.photos/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
