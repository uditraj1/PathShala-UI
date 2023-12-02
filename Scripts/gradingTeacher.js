// gradingTeacher.js

document.addEventListener('DOMContentLoaded', function () {
    showData();
    displaySubmittedAssignments();
});

function submitMarksForStudent(studentName, assignmentName) {
    // Retrieve submitted assignments from localStorage
    let submittedAssignments = JSON.parse(localStorage.getItem('submittedAssignments')) || [];

    // Find the submission
    const submission = submittedAssignments.find(submission => submission.studentName === studentName && submission.assignmentName === assignmentName);

    if (submission) {
        // Add your logic to submit marks to the server here

        // Update status or perform other actions
        console.log(`Marks submitted for ${studentName} - ${assignmentName}`);
        alert(`Marks submitted successfully for ${studentName} - ${assignmentName}`);
    } else {
        console.error('Submission not found.');
    }
}

function displaySubmittedAssignments() {
    const submittedAssignmentsSection = document.querySelector('.section');
    submittedAssignmentsSection.innerHTML = '';

    // Retrieve submitted assignments from localStorage
    let submittedAssignments = JSON.parse(localStorage.getItem('submittedAssignments')) || [];

    // Create a table element
    let assignmentsTable = document.createElement('table');
    assignmentsTable.classList.add('assignments-table');

    // Add table headings
    let headingsRow = document.createElement('tr');
    headingsRow.innerHTML = `
        <th style="width: 20%;">Student Email</th>
        <th style="width: 20%;">Assignment Name</th>
        <th style="width: 20%;">Student's Answer</th>
        <th style="width: 20%;">Attached Answer Files</th>
        <th style="width: 20%;">Marks</th>
        <th style="width: 20%;">Submit Marks</th>
    `;
    assignmentsTable.appendChild(headingsRow);

    // Add rows to the table
    submittedAssignments.forEach((submission) => {
        let submissionRow = document.createElement('tr');
        submissionRow.innerHTML = `
            <td>${submission.studentName}</td>
            <td>${submission.assignmentName}</td>
            <td>${submission.answer}</td>
            <td>${submission.attachedFile.fileName}</td>
            <td><input type="text" value="${submission.marks}" oninput="updateMarks('${submission.studentName}', this.value)"></td>
            <td><button class="button" onclick="submitMarksForStudent('${submission.studentName}', '${submission.assignmentName}')">Submit Marks</button></td>
        `;
        assignmentsTable.appendChild(submissionRow);
    });

    // Append the table to the section
    submittedAssignmentsSection.appendChild(assignmentsTable);

    // Retrieve the selected course name from localStorage
    let selectedCourseName = JSON.parse(localStorage.getItem('selectedCourseName')) || "YourSelectedCourseName";

    // Update the displayed course name
    document.getElementById("selectedCourseDisplay").innerHTML = `<span style="font-weight: bold;"> Selected Course: ${selectedCourseName}</span>`;
}

function updateMarks(studentName, marks) {
    // Retrieve submitted assignments from localStorage
    let submittedAssignments = JSON.parse(localStorage.getItem('submittedAssignments')) || [];

    // Find the submission and update the marks
    const submission = submittedAssignments.find(submission => submission.studentName === studentName);
    if (submission) {
        submission.marks = marks;
    }

    // Update submitted assignments in localStorage
    localStorage.setItem('submittedAssignments', JSON.stringify(submittedAssignments));
}

// Function to simulate submitting marks to the server
function submitMarks() {
    // Retrieve submitted assignments from localStorage
    let submittedAssignments = JSON.parse(localStorage.getItem('submittedAssignments')) || [];

    // Here, you can implement the logic to send the marks to the server
    console.log('Marks submitted:', submittedAssignments);
}

function showData() {
    let emailData = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("currentType"));
    document.querySelector(".guest").innerHTML = `
    <p>${emailData} (${userData})</p>
    `;
}
