<template>
  <modal @new-employee-added="reloadData" />
  <div class="employeesTableContainer">
    <div class="employeesTableClass">
      <table class="empTableClass" id="employeesTable">
        <thead>
          <tr>
            <th id="pictureCol">Picture</th>
            <th id="firstNameCol" class="col-2">
              First name
              <img
                id="sortImg"
                src="../assets/sort.png"
                class="sortImg"
                height="25"
              />
            </th>
            <th id="lastNameCol" class="col-2">
              Last name
            </th>
            <th id="emailCol" class="col-2">
              Email
            </th>
            <th id="sexCol" class="col-2">
              Sex
            </th>
            <th id="birthDateCol" class="col-2">
              Birthdate
              <img
                id="sortImg"
                src="../assets/sort.png"
                class="sortImg"
                height="25"
              />
            </th>
            <th id="actionCol" class="col-2"></th>
          </tr>
        </thead>
        <tbody id="employeesTableBody">
          <tr v-for="row in rows" :key="row.id" :row="row">
            <td>{{ row.picture }}</td>
            <td>{{ row.firstName }}</td>
            <td>{{ row.lastName }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.sex }}</td>
            <td>{{ row.birthdate }}</td>
            <td>
              <img
                src="../assets/del.png"
                height="30"
                class="del"
                id="row.id"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <add-modal
    v-for="row in rows"
    :key="row.id"
    :last-name="row.firstName"
    :first-name="row.lastName"
    :email="row.email"
    :gender="row.sex"
    :birth-date="row.birthdate"
    @add-new-row="addNewItem"
  ></add-modal> -->
</template>

<script>
import axios from "axios";
import vars from "../vars";
import Modal from "./Modal.vue";

export default {
  name: "table-template",
  components: {
    Modal,
  },
  data() {
    return {
      loading: true,
      rows: [],
    };
  },
  mounted() {
    axios
      .get(`${vars.API_URL}`)
      .then((response) => {
        this.rows = response.data;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    reloadData() {
      axios
        .get(`${vars.API_URL}`)
        .then((response) => {
          this.rows = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => (this.loading = false));
    },
    addNewItem() {
      console.log("new item: " + this.rows);
    },
    showAddModal(row) {
      document.getElementById("modal").style.display = "block";
      this.id = row.id;
    },
    deleteRow(row) {
      axios
        .delete(`${vars.API_URL}/${row.id}`)
        .then(() => {
          this.rows = this.rows.filter((e) => {
            return e.id !== row.id;
          });
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style src="../styles/Table.css"></style>
