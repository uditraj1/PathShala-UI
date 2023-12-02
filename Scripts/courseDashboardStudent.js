document.addEventListener('DOMContentLoaded', function () {
    // Load and display courses assigned to the logged-in student
    displayStudentCourses();
    
    // Display user data (you can customize this based on your user data)
    showData();
    
    // Add event listener to course cards
    addCourseCardListeners();
});

function addCourseCardListeners() {
    // Select all elements with the class 'course-card'
    const courseCards = document.querySelectorAll('.course-card');

    // Add click event listener to each course card
    courseCards.forEach(courseCard => {
        courseCard.addEventListener('click', function () {
            // Get the course name from the clicked card
            const selectedCourseName = courseCard.querySelector('.course-name').innerText;

            // Store the selected course name in localStorage
            localStorage.setItem('selectedCourseName', JSON.stringify(selectedCourseName));
        });
    });
}

function isValidCourse(courseName) {
    // Retrieve the courses from localStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Check if the course exists in the global course list
    return courses.some(course => course.courseName === courseName);
}

// Function to display enrolled courses
function displayStudentCourses() {
    const studentEmail = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const selectedCourseName = JSON.parse(localStorage.getItem('selectedCourseName'));

    // Find the student in the users array based on the email
    const student = users.find(user => user.email === studentEmail && user.usertype === 'student');

    if (student) {
        const studentCourses = student.courses || [];

        // Filter out courses that do not exist in the global course list
        const validCourses = studentCourses.filter(course => isValidCourse(course));

        const courseContainer = document.getElementById('courseContainer');
        courseContainer.innerHTML = '';

        validCourses.forEach((course) => {
            if (selectedCourseName && course !== selectedCourseName) {
                return; // Skip courses that do not match the selectedCourseName
            }

            const courseDiv = document.createElement('div');
            courseDiv.classList.add('section_courses'); // Add a class for styling
            courseDiv.innerHTML = `
                <div class="course-card">
                    <div class="course-name">${course}</div>
                    <!-- Add more details if needed -->
                </div>
            `;

            // Add a class to the courseDiv element
            courseDiv.classList.add('section-courses-card');

            // Add a click event listener to navigate to student.html with course-specific data
            courseDiv.addEventListener('click', function () {
                navigateToStudentPage(course);
            });

            courseContainer.appendChild(courseDiv);
        });

        // Show the logged-in user close to the logout button
        showData();
    } else {
        console.error('Student not found:', studentEmail);
    }
}

function showData() {
    let emailData = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("currentType"));

    // Display the logged-in user close to the logout button
    document.querySelector(".guest").innerHTML = `
        <p>${emailData} (${userData})</p>
    `;
}

function navigateToStudentPage(course) {
    // You can customize this URL based on your project structure
    window.location.href = `./user.html?course=${encodeURIComponent(course)}`;
}

