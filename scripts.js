document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const password = document.getElementById('password').value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        let valid = true;
        let errors = [];

        if (!emailPattern.test(email)) {
            valid = false;
            errors.push('Invalid email format.');
        }
        if (!phonePattern.test(phone)) {
            valid = false;
            errors.push('Invalid phone format. It should be 10 digits.');
        }

        if (valid) {
            const formData = {
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                password: password
            };
            const jsonString = JSON.stringify(formData, null, 2);
            const trimmedJsonString = jsonString.substring(1, jsonString.length - 1); // Remove the curly braces
            document.getElementById('formOutput').innerText = trimmedJsonString;
        } else {
            document.getElementById('formOutput').innerText = errors.join('\n');
        }
    }

    // AJAX za učitavanje JSON podataka
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var jsonDataHTML = '<h2>Student Information</h2>';
            jsonDataHTML += '<ul>';
            myObj.students.forEach(function(student) {
                jsonDataHTML += '<li>' + student.name + ', ' + student.age + ' years old, Major: ' + student.major + '</li>';
            });
            jsonDataHTML += '</ul>';
            document.getElementById('jsonData').innerHTML = jsonDataHTML;
        } else if (this.readyState == 4 && this.status != 200) {
            document.getElementById('jsonData').innerHTML = 'Error loading data.';
        }
    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();
});
