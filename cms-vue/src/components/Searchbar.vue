<template>
  <div class="searchBar">
    <div class="searchItems1">
      <button type="button" class="searchBtn">
        <img
          id="searchImage"
          src="../assets/searchIcon.png"
          @click="searchEmployee"
        />
      </button>
    </div>
    <div class="searchItems2">
      <input
        type="search"
        id="searchBarr"
        name="sQ"
        placeholder="Search..."
        v-model="name"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vars from "../vars";
import reloadData from "./Table.vue";

export default {
  data() {
    return {
      name: "",
      rows: [],
    };
  },
  methods: {
    searchEmployee(name) {
      if (name !== "") {
        axios
          .get(`${vars.API_URL}/GetByName`, {
            params: { name: `${this.name}` },
          })
          .then((response) => {
            this.rows = response.data;
            console.log(this.rows);
            this.$emit("search-update-table");
          })
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          })
          .finally(() => (this.loading = false));
      } else {
        reloadData();
      }
    },
  },
};
</script>

<style src="../styles/Searchbar.css"></style>
