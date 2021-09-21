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
            v-on:click="closeModal()"
          ></button>
        </div>

        <div class="modal-body">
          <form id="form" @submit.prevent="submitForm">
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
                max="maxBirthdate"
                placeholder=""
                required
              />
            </div>

            <div class="mb-3">
              <img id="defaultImg" src="../assets/defaultImg.png" height="35" />
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
            v-on:click="closeModal()"
          >
            Close
          </button>
          <button
            type="submit"
            class="btn save-myModal"
            id="add-employee-button"
            @click="addEmployee"
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
import moment from "moment";
//import Swal from 'sweetalert2/src/sweetalert2.js'

export default {
  data() {
    const date = moment()
      .subtract(16 * 12, "M")
      .format("YYYY-MM-DD");
    return {
      employee: {
        picture: "../assets/defaultImg.png",
        firstName: "",
        lastName: "",
        email: "",
        sex: "",
        birthdate: "",
      },
      maxBirthdate: date,
    };
  },
  methods: {
    closeModal() {
      document.getElementById("myModal").style.display = "none";
      document.getElementById("myModal").classList.remove("show");
    },
    clearModal() {
      document.getElementById("first-name").value = "";
      document.getElementById("last-name").value = "";
      document.getElementById("email-input").value = "";
      document.getElementById("sex-input").value = "";
      document.getElementById("birthdate-input").value = "";
      document.getElementById("picture").value = "";
    },
    alert(msg) {
      if (msg === undefined) msg = "Undefined";
      if (msg === "") msg = "Empty String";
      alert(msg);
    },
    validateForm() {
      var invalid = "";
      if (this.employee.firstName === "") {
        invalid+="FirstName missing!\n";
      }
      if (this.employee.lastName === "") {
        invalid+="LastName missing!\n";
      }
      if (this.employee.email === "") {
        invalid+="Email missing!\n";
      } else {
        //eslint-disable-next-line
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;
        if (!regex.test(this.employee.email)) {
          invalid+="Email is invalid!\n";
        }
      }
      if (this.employee.sex === "" || this.employee.sex === null) {
        invalid+="Sex missing!\n";
      }
      if (this.employee.birthdate === "" || this.employee.birthdate === null) {
        invalid+="Birthdate missing!";
      }
      if (invalid.length === 0) return true;
      alert(invalid); return false;
    },
    addEmployee() {
      // Swal.fire('Hello world!');
      // alert("FirstName missing!");
       if(this.validateForm()) {
      axios
        .post(
          `${vars.API_URL}/Insert`,
          `firstName=${this.employee.firstName}&lastName=${this.employee.lastName}&email=${this.employee.email}&birthdate=${this.employee.birthdate}&sex=${this.employee.sex}&picture=${this.employee.picture}`
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => {
          this.$emit("employee-added-or-removed");
          this.closeModal();
          this.clearModal();
        });
       }
    },
  },
};
</script>

<style src="../styles/Modal.css"></style>
