<template>
  <modal @employee-added-or-removed="reloadData" />
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
            <td>
              <img
                src="`../assets/${row.picture}`"
                height="30"
                class="pic"
                id="row.id"
              />
            </td>
            <td>{{ row.firstName }}</td>
            <td>{{ row.lastName }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.sex }}</td>
            <td>{{ getHumanDate(row.birthdate) }}</td>
            <td>
              <img
                src="../assets/del.png"
                height="30"
                class="del"
                id="row.id"
                v-on:click="deleteEmployee(row.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vars from "../vars";
import Modal from "./Modal.vue";
import moment from "moment";
import rows from "./Searchbar.vue";
import Swal from 'sweetalert2/src/sweetalert2.js'

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
      .get(`${vars.API_URL}/Get`)
      .then((response) => {
        this.rows = response.data;
        console.log(this.rows);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getHumanDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("D MMMM YYYY");
    },
    reloadData() {
      axios
        .get(`${vars.API_URL}/Get`)
        .then((response) => {
          this.rows = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => (this.loading = false));
    },
    reloadAfterSearch() {
      this.rows = rows;
      this.loading = false;
    },
    addNewItem() {
      console.log("new item: " + this.rows);
    },
    showAddModal(row) {
      document.getElementById("myModal").style.display = "block";
      this.id = row.id;
    },
    deleteEmployee(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted employee data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${vars.API_URL}/Delete/${id}`)
            .then(() => {
              this.rows = this.rows.filter((e) => {
                return e.id !== id;
              });
            })
            .catch((error) => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            })
            .finally(() => {
              this.loading = false;
              this.reloadData();
            });
        } 
      });
    },
  },
};
</script>

<style src="../styles/Table.css"></style>
