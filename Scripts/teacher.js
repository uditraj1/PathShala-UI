document.addEventListener('DOMContentLoaded', function () {
    // Load study materials from localStorage and display
    displayStudyMaterials();
    showData();
});

function displayStudyMaterials() {
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

// Function to upload study material
function uploadStudyMaterial() {
    let materialName = document.getElementById("materialName").value;
    let fileInput = document.getElementById("fileInput");

    if (materialName.trim() === "" || !fileInput.files.length) {
        alert("Please provide both material name and upload a file.");
        return;
    }

    // Read the file as a base64-encoded string
    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Content = e.target.result.split(",")[1]; // Remove the data URL prefix

        let newMaterial = {
            topicName: materialName, // Assuming this is the topic name
            studyMaterialName: fileInput.files[0].name,
            file: fileInput.files[0].name,
            fileContent: base64Content,
        };

        const materials = JSON.parse(localStorage.getItem('materials')) || [];
        materials.push(newMaterial);
        localStorage.setItem('materials', JSON.stringify(materials));

        alert('Study material uploaded successfully!');

        document.getElementById("materialName").value = "";
        document.getElementById("fileInput").value = "";

        // Reload the study materials after uploading
        displayStudyMaterials();
    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(fileInput.files[0]);
}

// Function to download study material
function downloadMaterial(fileName) {
    // Retrieve the material data based on the file name
    const materials = JSON.parse(localStorage.getItem('materials')) || [];
    const selectedMaterial = materials.find(material => material.file === fileName);

    if (!selectedMaterial) {
        alert('Material not found for download.');
        return;
    }

    // Decode the base64-encoded file content
    const fileContent = atob(selectedMaterial.fileContent);

    // Create a Blob with the decoded file content
    const blob = new Blob([fileContent], { type: 'application/octet-stream' });

    // Create a link element and trigger a click to initiate download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

function showData() {
    let emailData = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("currentType"));
    document.querySelector(".guest").innerHTML = `
      <p>${emailData} (${userData})</p>
      `;
}

// Function to initialize the study materials on page load
function init() {
    displayStudyMaterials();
}

init();
