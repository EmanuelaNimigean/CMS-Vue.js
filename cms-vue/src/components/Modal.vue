<template>
  <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Add new employee
          </h5>
          <button
            type="button"
            class="btn-close close-myModal"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="first-name" class="form-label">First name</label>
              <input
                type="text"
                class="form-control"
                id="first-name"
                v-model="employee.firstName"
                placeholder="Enter first name"
                required
              />
            </div>

            <div class="mb-3">
              <label for="last-name" class="form-label">Last name</label>
              <input
                type="text"
                class="form-control"
                id="last-name"
                v-model="employee.lastName"
                placeholder="Enter last name"
                required
              />
            </div>

            <div class="mb-3">
              <label for="email-input" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email-input"
                v-model="employee.email"
                placeholder="Enter email"
                required
              />
            </div>

            <div class="mb-3">
              <label for="sex-input" class="form-label">Sex</label>
              <select
                class="form-select"
                id="sex-input"
                v-model="employee.sex"
                required
              >
                <option value="" selected disabled>Enter sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="birthdate-input" class="form-label">Birthdate</label>
              <input
                type="date"
                class="form-control"
                id="birthdate-input"
                v-model="employee.birthdate"
                max="2011-11-11"
                placeholder=""
                required
              />
            </div>

            <div class="mb-3">
              <img
                id="defaultImg"
                src="../assets/defaultImg.png"
                height="35"
                v-bind:src="picture"
              />
              <label for="picture" class="form-label">Picture</label>
              <input
                class="form-control"
                type="file"
                id="picture"
                accept="images/*"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            class="btn close-myModal"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            class="btn save-myModal"
            id="add-employee-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vars from "../vars";

export default {
  data() {
    return {
      employee: {
        picture: "defaultImg.png",
        firstName: "",
        lastName: "",
        email: "",
        sex: "",
        birthdate: "",
      },
    };
  },
  methods: {
    closeModal() {
      document.getElementById("modal").style.display = "none";
    },
    submitForm() {
      axios
        .post(`${vars.API_URL}`, {
          picture: this.employee.picture,
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          email: this.employee.email,
          sex: this.employee.sex,
          birthdate: this.employee.birthdate,
        })
        .then((response) => {
          this.rows = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => {
          this.$emit("new-employee-added");
          this.closeModal();
        });
    },
  },
};
</script>

<style src="../styles/Modal.css"></style>
