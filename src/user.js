import { processTemplate } from "./util.js";

export default class User {
  constructor(data) {
    const { id, first_name, last_name, email, avatar } = data;
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
    this.data = data;

    this.template = `
      <div class="card" style="width: 18rem;" data-id="{id}">
        <img src="{avatar}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">
            <strong>{first_name}</strong> 
          </h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <div class="card-buttons">
            <button 
                data-id="{id}" 
                class="btn btn-primary profile-btn" 
                style="width:100%"
                >
                    Show Profile
                </button>
          </div>
        </div>
      </div>`;
  }

  getId() {
    return this.id;
  }

  getData() {
    return this.data;
  }

  getTemplate() {
    return processTemplate(this.template, this.data);
  }

  updateData(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.data = user.getData();
  }
}
