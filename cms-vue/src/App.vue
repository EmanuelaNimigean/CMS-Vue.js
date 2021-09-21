<template>
  <Head></Head>
  <body id="body">
    
    <div class="parent">
      <div class="title">
        Employees ~ Content Management System
      </div>

      <div class="container">
        <Searchbar></Searchbar>
        <Table></Table>
        <Buttons></Buttons>
      </div>

      <Modal></Modal>
    </div>
  </body>
</template>

<script>
import Head from "./components/Head.vue";
import Searchbar from "./components/Searchbar.vue";
import Table from "./components/Table.vue";
import Buttons from "./components/Buttons.vue";
import Modal from "./components/Modal.vue";
import axios from 'axios';
import vars from "./vars";
import reloadData from "./components/Table.vue"

export default {
  name: "App",
  components: {
    Head,
    Searchbar,
    Table,
    Buttons,
    Modal
  },
  methods:{
    searchEmployee(name) {
      if (name !== "") {
      axios
        .get(`${vars.API_URL}/GetByName/${name}`)
        .then((response) => {
          this.rows = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => (this.loading = false));
      }else {
        reloadData();
      }

      // if (name !== "") {
      //   searchByName(name).then((response) => {
      //     this.rows = response.data;
      //   });
      // } else {
      //   getAllEmployees().then((response) => {
      //     this.rows = response.data;
      //   });
      // }
    },
  }
};
</script>

<style src="./styles/App.css"></style>
