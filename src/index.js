import "./styles.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsersData, getUserData } from "./user-service.js";
import UserModal from "./user-modal";
import User from "./user.js";

const userListContainer = document.getElementById("user-list-container");
const userModal = new UserModal(document.getElementById("userModal"));
const button = document.getElementById("newProfileButton");

button.addEventListener("click", () => {
  const data = {
    id: "0",
    first_name: "",
    last_name: "",
    email: "",
    avatar: ""
  };
  const user = new User(data);
  showUserModal(user);
});

const showUserModal = (user) => {
  userModal.showModal(user);
};

const renderUserList = (userList) => {
  let userListTemplate = "";

  for (let user of userList) {
    userListTemplate += user.getTemplate();
  }

  userListContainer.innerHTML = userListTemplate;
  userListContainer.querySelectorAll(".profile-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      getUserData(e.currentTarget.dataset.id).then((responseData) => {
        const user = new User(responseData.data);
        showUserModal(user);
      });
    })
  );
};

getUsersData().then((responseData) => {
  let userList = [];

  for (let u of responseData.data) {
    let user = new User(u);
    userList.push(user);
  }

  renderUserList(userList);
});
