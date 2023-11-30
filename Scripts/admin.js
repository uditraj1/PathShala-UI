let data = JSON.parse(localStorage.getItem("users")) || [];
let sData = JSON.parse(localStorage.getItem("users")) || [];

class userList {
  constructor() {}

  showUserList() {
    display(data);

    function display(data) {
      document.querySelector(".user-list").innerHTML = "";

      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("details");

        // Display user details
        div.innerHTML = `
          <p>Email: ${elem.email}</p>
          <p>Password: ${elem.pass}</p>
          <p>User Type: ${elem.usertype}</p>
        `;

        let div2 = document.createElement("div");
        let p = document.createElement("p");
        p.setAttribute("id", "remove");
        p.innerText = "Remove";
        p.addEventListener("click", () => {
          removeUser(elem, index);
        });
        div2.append(p);
        div.appendChild(div2);
        document.querySelector(".user-list").append(div);
      });
    }

    function removeUser(elem, index) {
      data.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(data));
      display(data);
    }
  }

  addStudentData(e, p, t) {
    this.email = e;
    this.pass = p;
    this.usertype = t;

    // // If user type is "Teacher," store the available courses as an array of strings
    // if (t === 'teacher') {
    //   this.courses = courses.map(course => course.courseName);
    // }
    
    // If user type is "Teacher," store the available courses as full objects
    if (t === 'teacher') {
      this.courses = courses;
    }

    data.push(this);
    localStorage.setItem("users", JSON.stringify(data));
    this.showUserList();
  }
}

function showUser() {
  let list = new userList();
  list.showUserList();
}

function clearTeacherDropdown() {
  // Clear the teacher dropdown and hide it
  let teacherDropdown = document.getElementById("teacherCourses");
  teacherDropdown.innerHTML = '';
  teacherDropdown.style.display = 'none';
}

showUser();

function addStudent() {
  event.preventDefault();
  let e = document.getElementById("email").value;
  let p = document.getElementById("pass").value;
  let t = document.getElementById("type").value;

  // Get the courses from localStorage or any other source
  let courses = JSON.parse(localStorage.getItem("courses")) || [];

  // Initialize the courses property as an empty array for teachers
  let teacherCourses = (t === 'teacher') ? courses.map(course => course.courseName) : undefined;

  let student = {
    email: e,
    pass: p,
    usertype: t,
    courses: teacherCourses, // Initialize courses as an empty array for teachers
  };

  data.push(student);
  localStorage.setItem("users", JSON.stringify(data));

  // Clear and hide the additional dropdown when adding a student
  clearTeacherDropdown();
}

function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `
    <p>${emailData} (${userData})</p>
  `;
}

// Add this function to display courses in the dropdown
function displayCoursesInDropdown() {
  const courses = JSON.parse(localStorage.getItem('courses')) || [];

  // Assuming you have a dropdown element with the id "selectedCourse"
  const courseDropdown = document.getElementById('selectedCourse');
  courseDropdown.innerHTML = '';

  courses.forEach((course) => {
    let option = document.createElement("option");
    option.value = course.courseName;
    option.text = course.courseName;
    courseDropdown.appendChild(option);
  });
}

function updateTeacherDropdown() {
  // Get the selected user type
  let userType = document.getElementById("type").value;

  // Get the teacher dropdown element
  let teacherDropdown = document.getElementById("teacherCourses");

  // Get the selectedCourse dropdown element
  let selectedCourseDropdown = document.getElementById("selectedCourse");

  // Clear previous options
  selectedCourseDropdown.innerHTML = '';

  // If the selected user type is "Teacher", show the additional dropdown
  if (userType === 'teacher') {
    // Get the courses from localStorage or any other source
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Display the courses as options
    courses.forEach(course => {
      let option = document.createElement("option");
      option.value = course.courseName;
      option.text = course.courseName;
      selectedCourseDropdown.appendChild(option);
    });

    // Show the teacher dropdown
    teacherDropdown.style.display = 'block';
  } else {
    // Hide the teacher dropdown if the selected user type is not "Teacher"
    teacherDropdown.style.display = 'none';
  }
}

function addCourse() {
  // Get the input values
  const courseName = document.getElementById('courseName').value;
  const courseDescription = document.getElementById('courseDescription').value;

  // Validate if the fields are not empty
  if (!courseName || !courseDescription) {
    alert('Please enter both Course Name and Course Description.');
    return;
  }

  // Save the course data (you can use localStorage, AJAX to save to server, etc.)
  const courseData = {
    courseName: courseName,
    description: courseDescription,
  };

  // Assume a courses array in localStorage for demonstration
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  courses.push(courseData);
  localStorage.setItem('courses', JSON.stringify(courses));

  // Show a success message
  alert('Course added successfully!');

  // Clear and hide the additional dropdown when adding a course
  clearTeacherDropdown();

  // Redirect to courses_admin.html
  window.location.href = './courses_admin.html';
}

showData();
