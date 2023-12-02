document.addEventListener('DOMContentLoaded', function () {
  // Load and display study materials assigned to the logged-in student
  // displayStudyMaterials();

  // Display user data (you can customize this based on your user data)
  showData();
});
let data = JSON.parse(localStorage.getItem("lectures")) || [];
class lectureList {
  constructor() {}
  showLectureList() {
    display(data);
    function display(data) {
      const materials = JSON.parse(localStorage.getItem('materials')) || [];

      const materialTable = document.querySelector('.section');
      materialTable.innerHTML = '';
  
      // Create a table element
      let table = document.createElement('table');
      table.classList.add('materials', 'table');
  
      // Add table headings
      let headingsRow = document.createElement('tr');
      headingsRow.innerHTML = `
          <th>Topic Name</th>
          <th>Study Material Name</th>
          <th>File Name</th>
          <th>Action</th> <!-- New column for download button -->
      `;
      table.appendChild(headingsRow);
  
      // Add rows to the table
      materials.forEach((material) => {
          let materialRow = document.createElement('tr');
          materialRow.innerHTML = `
              <td>${material.topicName}</td>
              <td>${material.studyMaterialName}</td>
              <td>${material.file}</td>
              <td><button class="button3" onclick="downloadMaterial('${material.file}')">Download</button></td>
          `;
          table.appendChild(materialRow);
      });
  
      // Append the table to the section
      materialTable.appendChild(table);
  
      // Retrieve the selected course name from localStorage
      let selectedCourseName = JSON.parse(localStorage.getItem('selectedCourseName')) || "YourSelectedCourseName";
  
      // Update the displayed course name
      document.getElementById("selectedCourseDisplay").innerText = `Selected Course: ${selectedCourseName}`;
      }
  }
  filterByTiltle(value) {
    let datas = data.filter((elem) => {
      return elem.title == value;
    });
    if (value == "All") {
      document.querySelector(".section").innerHTML = "";
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("lectures");
        div.innerHTML = `
          <div class="details">
          <span>${elem.title}</span>
          <button class="type">${elem.type}</button>
          <p><b>${elem.instructor}</b> scheduled <b>${elem.category}</b> at ${elem.schedule}
            - ${elem.time}</p>
        </div>
        `;
        document.querySelector(".section").append(div);
      });
    } else {
      document.querySelector(".section").innerHTML = "";
      datas.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("lectures");
        div.innerHTML = `
          <div class="details">
          <span>${elem.title}</span>
          <button class="type">${elem.type}</button>
          <p><b>${elem.instructor}</b> scheduled <b>${elem.category}</b> at ${elem.schedule}
            - ${elem.time}</p>
        </div>
        `;
        document.querySelector(".section").append(div);
      });
    }
  }
  filterByDate(values) {
    let database = data.filter((elem) => {
      return elem.schedule == values;
    });
    document.querySelector(".section").innerHTML = "";
    database.forEach((elem, index) => {
      let div = document.createElement("div");
      div.classList.add("lectures");
      div.innerHTML = `
          <div class="details">
          <span>${elem.title}</span>
          <button class="type">${elem.type}</button>
          <p><b>${elem.instructor}</b> scheduled <b>${elem.category}</b> at ${elem.schedule}
            - ${elem.time}</p>
        </div>
        `;
      document.querySelector(".section").append(div);
    });
  }
}
function showLecture() {
  let list = new lectureList();
  list.showLectureList();
}
showLecture();
function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `
    <p>${emailData} (${userData}) </p>
    `;
}
showData();
function filterTitle() {
  let value = document.getElementById("title").value;
  let tiltleFilter = new lectureList();
  tiltleFilter.filterByTiltle(value);
}
function filterDate() {
  let dateValue = document.getElementById("schedule").value;
  let filterDate = new lectureList();
  filterDate.filterByDate(dateValue);
}
function resetFilter() {
  window.location.reload();
}
function downloadMaterial(fileName, fileContent) {
  // Create an anchor element
  const anchor = document.createElement('a');

  // Set the href attribute to a data URI containing the file content
  anchor.href = `data:application/octet-stream;base64,${fileContent}`;
  
  // Set the download attribute to the file name
  anchor.download = fileName;

  // Simulate a click on the anchor element to start the download
  anchor.click();
}
function displayStudyMaterials() {
  const materials = JSON.parse(localStorage.getItem('materials')) || [];

  const lecturesContainer = document.querySelector('.lectures');
  lecturesContainer.innerHTML = '';

  // Create a div element to hold the study materials
  let materialsDiv = document.createElement('div');
  materialsDiv.classList.add('materials');

  // Add study materials to the div
  materials.forEach(material => {
      let materialItem = document.createElement('div');
      materialItem.classList.add('material-item');
      materialItem.innerHTML = `<a href="${material.file}" target="_blank">${material.studyMaterialName}</a>`;
      materialsDiv.appendChild(materialItem);
  });

  // Append the div to the container
  lecturesContainer.appendChild(materialsDiv);
}
function showData() {
    let emailData = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("currentType"));

    // Display the logged-in user close to the logout button
    document.querySelector(".guest").innerHTML = `
        <p>${emailData} (${userData})</p>
    `;
}
