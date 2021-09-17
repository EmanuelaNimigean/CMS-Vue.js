<template>
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
        <tbody id="employeesTableBody"></tbody>
      </table>
    </div>
  </div>
</template>

<style src="../styles/Table.css"></style>