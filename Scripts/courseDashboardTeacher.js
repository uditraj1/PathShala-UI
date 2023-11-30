document.addEventListener('DOMContentLoaded', function () {
    // Load and display courses assigned to the logged-in teacher
    displayTeacherCourses();
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

function displayTeacherCourses() {
    const teacherEmail = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the teacher in the users array based on the email
    const teacher = users.find(user => user.email === teacherEmail && user.usertype === 'teacher');

    if (teacher) {
        const teacherCourses = teacher.courses || [];

        const courseContainer = document.getElementById('courseContainer');
        courseContainer.innerHTML = '';

        teacherCourses.forEach((course) => {
            // Check if the course is a valid string (not null or undefined)
            if (typeof course === 'string') {
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

                // Add a click event listener to navigate to teacher.html with course-specific data
                courseDiv.addEventListener('click', function () {
                    navigateToTeacherPage(course);
                });

                courseContainer.appendChild(courseDiv);
            } else {
                console.error('Invalid course:', course);
            }
        });

        // Show the logged-in user close to the logout button
        showData();
    } else {
        console.error('Teacher not found:', teacherEmail);
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

function navigateToTeacherPage(course) {
    // You can customize this URL based on your project structure
    window.location.href = `./teacher.html?course=${encodeURIComponent(course)}`;
}
