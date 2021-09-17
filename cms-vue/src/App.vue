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

export default {
  name: "App",
  components: {
    Head,
    Searchbar,
    Table,
    Buttons,
    Modal
  },
};
</script>

<style src="./styles/App.css"></style>
