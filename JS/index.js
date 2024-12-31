const LoggedInUserName = document.getElementById("LoggedInUserName");
/*************** Handling Login User ************************/
function isloggedIn() {
  if (
    localStorage.getItem("loggedinUser") == null ||
    localStorage.getItem("loggedinUser") == "null" ||
    localStorage.getItem("loggedinUser") == undefined ||
    localStorage.getItem("loggedinUser") == "" ||
    localStorage.getItem("loggedinUser") == " "
  ) {
    return false;
  } else {
    console.log("Logged In:", localStorage.getItem("loggedinUser"));
    return true;
  }
}

function controlLogin() {
  if (isloggedIn()) {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));
    LoggedInUserName.textContent = `${loggedinUser.firstName} ${loggedinUser.surname}`;
  } else {
    window.location.href = "./HTML/login.html";
  }
}

const btnSignOut = document.getElementById("btnSignOut");
btnSignOut.onclick = function () {
  localStorage.removeItem("loggedinUser");
  window.location.href = "./HTML/login.html";
};
/******************* First Loading ***************************/
let userListById = [];
let userList = [];
let skip = 0;
const limit = 5;

window.onload = () => {
  controlLogin();
  getUsers();
};

/********************* Handling Chat Friends******************* */
/* 
<li class="nav-item btn btn-dark">
          <img
            src="./Resources/Images/images.jpeg"
            alt="Profile Image"
            width="50px"
            height="50px"
            class="rounded-circle"
          />
          <span class="fw-bold">AbdAlla Aboelmagd</span>
        </li>
  */
/***************************** */
const chat = document.getElementById("chat");
function setChat(userList) {
  for (let user in userList) {
    let name = `${userList[user].first_name} ${userList[user].last_name}`;
    let img = userList[user].avatar;

    let li = document.createElement("li");
    li.classList.add(
      "nav-item",
      "btn",
      "btn-dark",
      "d-flex",
      "justify-content-start",
      "align-items-center",
      "p-2"
    );
    let imgTag = document.createElement("img");
    imgTag.src = img;
    imgTag.style.width = "50px";
    imgTag.style.height = "50px";
    imgTag.classList.add("rounded-circle");

    let div = document.createElement("div");
    div.classList.add("fw-bold", "ms-4");
    div.textContent = name;
    li.appendChild(imgTag);
    li.appendChild(div);
    chat.appendChild(li);
  }
}

/************************* Handling Stories ********************/
/*
                  <div class="carousel-item">
                    <div class="row ps-4 pe-4">
                      <img
                        src="./Resources/Images/images.jpeg"
                        class="col-3"
                        alt="..."
                      />
                      <!-- Up to 4 Images -->
                    </div>
                  </div>
*/
/********************************* */
const parentStories = document.getElementById("parentStories");
// const firstChildStories = document.getElementById("firstChildStories");
let storiesCounter = 1;
function setStories(userList) {
  let images = [];
  for (let user in userList) {
    images.push(userList[user].avatar);
  }

  for (let i = 0; i < images.length; i += 4) {
    let div = document.createElement("div");
    if (i == 0) {
      div.classList.add("carousel-item", "active");
    } else {
      div.classList.add("carousel-item");
    }
    let row = document.createElement("div");
    row.classList.add("row", "ps-4", "pe-4");
    for (let j = 0; j < 4; j++) {
      if (i + j < images.length) {
        if (userList[i + j]) {
          let img = document.createElement("img");
          img.src = images[i + j];
          img.classList.add("col-3");
          row.appendChild(img);
        } else {
          let img = document.createElement("img");
          img.src = "./Resources/Images/images.jpeg";
          img.classList.add("col-3");
          row.appendChild(img);
        }
      } else {
        let img = document.createElement("img");
        img.src = images[images.length - i - j];
        img.classList.add("col-3");
        row.appendChild(img);
      }
    }
    div.appendChild(row);
    parentStories.appendChild(div);
  }
}

/********************* Handling Eazy Load ***************************/
window.onscroll = scrollHandler;

function scrollHandler() {
  let postsList = document.getElementById("postsList");
  // Getting The Current Height Of The Content Already Displayed
  let contentHeight = postsList.offsetHeight;
  console.log(contentHeight);
  // Getting The Horizontal Scrolling Position
  let scrollPosition = window.scrollY;
  console.log(scrollPosition);
  // Getting The Height Of The Window and + The scrolling position to it ,
  // If the scrollPosition + window height equals to content Height
  // that means we reached to the end of the content
  if (scrollPosition + window.innerHeight >= contentHeight) {
    // postsList.innerHTML += '<div class="newdata"></div>';
    // // Call the function to load new data;
    posts(limit, skip, userListById);
    skip += limit;
  }
}

/********************************************************************/

function getUsers() {
  var XHRusers = new XMLHttpRequest();
  let usersList;
  XHRusers.onreadystatechange = function () {
    if (XHRusers.readyState == 4) {
      if (XHRusers.status == 200) {
        usersList = JSON.parse(XHRusers.responseText);
        for (let user of usersList.data) {
          userListById[user.id] = user;
          userList.push(user);
        }
        posts(limit, skip, userListById);
        skip += limit;
        setChat(userListById);
        setStories(userListById);
      }
    }
  };

  XHRusers.open("GET", "https://reqres.in/api/users");

  XHRusers.send("");
}

/*********************** Handling Getting Posts ****************************/
function posts(limit, skip, userListById) {
  fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Next 10 Posts:", data);
      for (let post of data.posts) {
        let user = userListById[Math.ceil(Math.random() * 6)];
        displayPosts(post, user);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

/************************** Handling Showing Posts  ******************************/
function displayPosts(post, user) {
  let userFullName = `${user.first_name} ${user.last_name}`;
  let userImg = user.avatar;

  const postsList = document.getElementById("postsList");
  const postDiv = document.createElement("div");
  postDiv.classList.add("bg-dark");
  postDiv.classList.add("card");
  postDiv.classList.add("text-white");
  postDiv.classList.add("p-3");
  postDiv.classList.add("m-3");

  const userDiv = document.createElement("div");
  // userDiv.classList.add("bg-danger");

  const userAvatar = document.createElement("img");
  userAvatar.src = userImg;
  userAvatar.classList.add(
    "userImg",
    "me-2",
    "border",
    "border-0",
    "rounded-circle"
  );

  const userName = document.createElement("p");
  userName.textContent = userFullName;
  userName.classList.add("userName", "fw-bold", "fs-4");

  userDiv.appendChild(userAvatar);
  userDiv.appendChild(userName);

  const postContent = document.createElement("div");
  postContent.classList.add("post-content");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title;

  const postBody = document.createElement("p");
  postBody.textContent = post.body;

  const postImage = document.createElement("img");
  postImage.src = userImg;
  postImage.style.width = "100%";

  const postFooterContainer = document.createElement("div");
  postFooterContainer.classList.add("row", "p-1", "justify-content-center");

  const postFooter = document.createElement("div");
  postFooter.classList.add("row");

  const likeDiv = document.createElement("button");
  likeDiv.classList.add(
    "col-3",
    "btn",
    "btn-outline-primary",
    "border-0",
    "d-flex",
    "flex-row",
    "justify-content-center"
  );
  const likeIcon = document.createElement("i");
  likeIcon.classList.add("bi", "bi-hand-thumbs-up-fill");
  const likeTxt = document.createElement("span");
  likeTxt.textContent = "Like";
  likeDiv.appendChild(likeIcon);
  likeDiv.appendChild(likeTxt);

  const commentDiv = document.createElement("button");
  commentDiv.classList.add(
    "col-3",
    "btn",
    "btn-outline-primary",
    "border-0",
    "d-flex",
    "flex-row",
    "justify-content-center"
  );
  const commentIcon = document.createElement("i");
  commentIcon.classList.add("bi", "bi-chat");
  const commentTxt = document.createElement("span");
  commentTxt.textContent = "Comment";
  commentDiv.appendChild(commentIcon);
  commentDiv.appendChild(commentTxt);

  const msgDiv = document.createElement("div");
  msgDiv.classList.add(
    "col-3",
    "btn",
    "btn-outline-primary",
    "border-0",
    "d-flex",
    "flex-row",
    "justify-content-center"
  );
  const msgIcon = document.createElement("i");
  msgIcon.classList.add("bi", "bi-whatsapp");
  const msgTxt = document.createElement("span");
  msgTxt.textContent = "Send";
  msgDiv.appendChild(msgIcon);
  msgDiv.appendChild(msgTxt);

  const shareDiv = document.createElement("div");
  shareDiv.classList.add(
    "col-3",
    "btn",
    "btn-outline-primary",
    "border-0",
    "d-flex",
    "flex-row",
    "justify-content-center"
  );
  const shareIcon = document.createElement("i");
  shareIcon.classList.add("bi", "bi-share");
  const shareTxt = document.createElement("span");
  shareTxt.textContent = "Send";
  shareDiv.appendChild(shareIcon);
  shareDiv.appendChild(shareTxt);

  postFooter.appendChild(likeDiv);
  postFooter.appendChild(commentDiv);
  postFooter.appendChild(msgDiv);
  postFooter.appendChild(shareDiv);

  postFooterContainer.appendChild(postFooter);

  postContent.appendChild(postTitle);
  postContent.appendChild(postBody);
  postContent.appendChild(postImage);
  postDiv.appendChild(userDiv);
  postDiv.appendChild(postContent);
  postDiv.appendChild(postFooterContainer);
  postsList.appendChild(postDiv);
}
