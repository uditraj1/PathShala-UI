let data = JSON.parse(localStorage.getItem("assignments")) || [];
class lectureList {
  constructor() {}
  showLectureList() {
    display(data);
    function display(data) {
        document.querySelector(".section").innerHTML = "";

        // Create a table element
        let lectureTable = document.createElement('table');
        lectureTable.classList.add('lectures-table');
    
        // Add table headings
        let headingsRow = document.createElement('tr');
        headingsRow.innerHTML = `
            <th>Topic Name</th>
            <th>Assignment Name</th>
            <th>Assignment Description</th>
            <th>File Attached</th>
            <th>Action</th> <!-- New column for any action buttons -->
            <th>Submission Action</th>
        `;
        lectureTable.appendChild(headingsRow);
    
        // Add rows to the table
        data.forEach((elem) => {
            let lectureRow = document.createElement('tr');
            lectureRow.innerHTML = `
                <td>${elem.topicName}</td>
                <td>${elem.assignmentName}</td>
                <td>${elem.assignmentDescription}</td>
                <td>${elem.file}</td>
                <td><button class="new" onclick="downloadFile('${elem.file}', '${elem.fileContent}')">Download</button></td>
                <td><button class="new" onclick="submitAssignment('${elem.assignmentName}')">Submit Assignment</button></td>
            `;
            lectureTable.appendChild(lectureRow);
        });
    
        // Append the table to the section
        document.querySelector(".section").appendChild(lectureTable);

        // Retrieve the selected course name from localStorage
        let selectedCourseName = JSON.parse(localStorage.getItem('selectedCourseName')) || "YourSelectedCourseName";

        // Update the displayed course name
        document.getElementById("selectedCourseDisplay").innerHTML = `<span style="font-weight: bold;"> Selected Course: ${selectedCourseName}</span>`;
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
function downloadFile(fileName, fileContent) {
    // Create an anchor element
    const anchor = document.createElement('a');

    // Set the href attribute to a data URI containing the file content
    anchor.href = `data:application/octet-stream;base64,${fileContent}`;
    
    // Set the download attribute to the file name
    anchor.download = fileName;

    // Simulate a click on the anchor element to start the download
    anchor.click();
}
function displayAssignments(assignments) {
    const assignmentSection = document.querySelector('.section');
    assignmentSection.innerHTML = '';
  
    // Create a table element
    let assignmentTable = document.createElement('table');
    assignmentTable.classList.add('assignments-table');
  
    // Add table headings
    let headingsRow = document.createElement('tr');
    headingsRow.innerHTML = `
        <th>Topic Name</th>
        <th>Assignment Name</th>
        <th>Assignment Description</th>
        <th>File Attached</th>
        <th>Action</th> <!-- New column for any action buttons -->
    `;
    assignmentTable.appendChild(headingsRow);
  
    // Add rows to the table
    assignments.forEach((assignment) => {
      let assignmentRow = document.createElement('tr');
      assignmentRow.innerHTML = `
          <td>${assignment.topicName}</td>
          <td>${assignment.assignmentName}</td>
          <td>${assignment.assignmentDescription}</td>
          <td>${assignment.fileInput}</td>
          <td><button class="new">Download</button></td>
      `;
      assignmentTable.appendChild(assignmentRow);
    });
  
    // Append the table to the section
    assignmentSection.appendChild(assignmentTable);
}
function submitAssignment(assignmentName) {
    // Find the assignment in the data array
    const selectedAssignment = data.find(assignment => assignment.assignmentName === assignmentName);

    if (selectedAssignment) {
      // Store the selected assignment in localStorage
      localStorage.setItem('currentAssignment', JSON.stringify(selectedAssignment));
  
      // Redirect to the submit_assignment.html page or handle the submission logic here
      window.location.href = 'submit_assignment.html';
    } else {
      console.error('Assignment not found:', assignmentName);
    }
}
