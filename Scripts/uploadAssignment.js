document.addEventListener('DOMContentLoaded', function () {
    const subjectSelect = document.getElementById('subject');
    const topicSelect = document.getElementById('topic');

    // Map subjects to their respective topics
    const subjectsToTopics = {
        math: ['Algebra', 'Geometry', 'Calculus'],
        science: ['Physics', 'Chemistry', 'Biology'],
        // Add more subjects and topics as needed
    };

    // Populate topics based on selected subject
    subjectSelect.addEventListener('change', function () {
        const selectedSubject = subjectSelect.value;
        const topics = subjectsToTopics[selectedSubject] || [];

        // Clear previous options
        topicSelect.innerHTML = '';

        // Populate new options
        topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicSelect.appendChild(option);
        });
    });

    // Form submission
    const assignmentForm = document.getElementById('assignmentForm');
    assignmentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Handle form submission here
        const selectedSubject = subjectSelect.value;
        const selectedTopic = topicSelect.value;
        const assignmentName = document.getElementById('assignmentName').value;
        const assignmentDescription = document.getElementById('assignmentDescription').value;
        const deadline = document.getElementById('deadline').value;

        // Perform further actions, such as sending data to a server or storing in localStorage
        console.log('Assignment Details:', {
            subject: selectedSubject,
            topic: selectedTopic,
            name: assignmentName,
            description: assignmentDescription,
            deadline: deadline
        });

        // Redirect or show a success message as needed
        // window.location.href = 'success_page.html';
    });
});
