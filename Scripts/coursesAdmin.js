document.addEventListener('DOMContentLoaded', function () {
    // Load courses from localStorage and display
    displayCourses();
    showData();
});

function displayCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    const courseList = document.querySelector('.course-list');
    courseList.innerHTML = '';

    courses.forEach((course, index) => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-item');

        courseDiv.innerHTML = `
        <div>${course.courseName}</div>
        <div>${course.description}</div>
        <button class="button3" onclick="removeCourse('${course.courseName}')">Remove</button>
        `;

        courseList.appendChild(courseDiv);
    });
}

function addCourse() {
    const courseName = document.getElementById('courseName').value;
    const courseDescription = document.getElementById('courseDescription').value;

    if (!courseName || !courseDescription) {
        alert('Please enter both Course Name and Course Description.');
        return;
    }

    const courseData = {
        courseName: courseName,
        description: courseDescription,
    };

    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(courseData);
    localStorage.setItem('courses', JSON.stringify(courses));

    // Show a success message
    alert('Course added successfully!');

    // Reload the courses after adding
    displayCourses();
}

function removeCourse(courseName) {
    // Retrieve the courses from localStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Find the index of the course to be removed
    const index = courses.findIndex(course => course.courseName === courseName);

    if (index !== -1) {
        // Remove the course from the array
        courses.splice(index, 1);

        // Update localStorage with the modified courses array
        localStorage.setItem('courses', JSON.stringify(courses));

        // Display the updated list of courses
        displayCourses();
    } else {
        alert('Course not found for removal.');
    }
}

function showData() {
    let emailData = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("currentType"));
    document.querySelector(".guest").innerHTML = `
      <p>${emailData} (${userData})</p>
      `;
}

