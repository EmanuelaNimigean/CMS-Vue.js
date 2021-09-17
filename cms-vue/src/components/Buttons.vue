<template>
  <div class="addEmployeeButton">
    <button
      type="button"
      class="addBtn"
      id="modalButton"
      data-bs-toggle="modal"
      data-bs-target="#myModal"
    >
      Add new employee
    </button>
  </div>
  <select class="sortClass" id="sortBy">
    <option class="sort-option" selected value="chooseBy">
      Choose sorting column
    </option>
    <option class="sort-option" value="name">Name</option>
    <option class="sort-option" value="birthdate">Birthdate</option>
  </select>
  <select class="sortClass" id="sortType">
    <option class="sort-option" selected value="chooseType">
      Choose sorting type
    </option>
    <option class="sort-option" value="asc">Asc</option>
    <option class="sort-option" value="desc">Desc</option>
  </select>
</template>

<style src="../styles/Buttons.css"></style>