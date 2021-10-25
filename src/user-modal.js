import { processTemplate } from "./util.js";
import {
  createUserData,
  deleteUserData,
  updateUserData
} from "./user-service.js";
import User from "./user.js";
import { Modal } from "bootstrap";

export default class UserModal {
  constructor(root) {
    this.root = root;
    this.userModal = new Modal(root);
    this.confirmModal = new Modal(document.getElementById("confirmModal"));
    this.template = `
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{first_name} {last_name}</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div class="modal-body">
        <form class="modal-form" data-id="{id}">
          <input type="hidden" id="id" name="id" value="{id}">
          <input type="hidden" id="avatar" name="avatar" value="{avatar}">
          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input type="text" class="form-control" id="first_name" name="first_name" value="{first_name}">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="last_name" name="last_name" value="{last_name}">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" value="{email}">
        </div>
        </form>
      </div>

      <div class="modal-footer">
      <button id="delete-user" type="button" class="btn btn-primary" data-id="{id}">Delete</button>
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button id="save-user" type="button" class="btn btn-primary" data-id="{id}">Save changes</button>
      </div>`;

    /*this.initEventListeners = () => {};

    this.initEventListeners();*/
  }

  showModal(user) {
    const userTemplate = processTemplate(this.template, user.getData());
    this.root.querySelector(".modal-content").innerHTML = userTemplate;

    const saveUserButton = this.root.querySelector("#save-user");
    saveUserButton.addEventListener("click", (e) => {
      const formData = new FormData(document.querySelector(".modal-form"));
      const user = new User(Object.fromEntries(formData));

      this.saveChanges(user);
    });

    const deleteUserButton = this.root.querySelector("#delete-user");

    if (user.id !== "0") {
      deleteUserButton.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;

        const yesButton = document.querySelector("#yesButton");
        yesButton.addEventListener(
          "click",
          (e) => {
            this.delete(id);
          },
          { once: true }
        );

        this.confirmModal.show();
      });
    } else {
      deleteUserButton.remove();
    }

    this.userModal.show();
  }

  createUserCard(user) {
    const userListContainer = document.getElementById("user-list-container");

    userListContainer.outerHTML =
      user.getTemplate() + userListContainer.innerHTML;

    this.hideModal();
  }

  updateUserCard(user) {
    const userCardNode = document.querySelector(
      ".card[data-id='" + user.getId() + "']"
    );

    userCardNode.outerHTML = user.getTemplate();

    this.hideModal();
  }

  removeUserCard(id) {
    const userCardNode = document.querySelector(".card[data-id='" + id + "']");

    userCardNode.remove();

    this.hideConfirmModal();
    this.hideModal();
  }

  hideModal() {
    this.userModal.hide();
  }

  hideConfirmModal() {
    this.confirmModal.hide();
  }

  delete(id) {
    deleteUserData(id).then((responseData) => {
      this.removeUserCard(id);
    });
  }

  saveChanges(user) {
    const id = user.getId();

    if (id !== "0") {
      updateUserData(id, user.getData()).then((responseData) => {
        user = new User(responseData);
        this.updateUserCard(user);
      });
    } else {
      createUserData(user.getData()).then((responseData) => {
        user = new User(responseData);
        this.createUserCard(user);
      });
    }
  }
}
