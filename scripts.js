

    // Fade In Main Content
    $("main").hide().fadeIn(500);

$(document).ready(function(){
    // Navigacija obojena
    $("nav a").each(function() {
        if (this.href === window.location.href) {
            $(this).addClass("active");
        }
    });

    // Hover za tabelu
    $("#studentTable tbody tr").hover(
        function() {
            $(this).css("background-color", "#e0e0e0");
        }, function() {
            $(this).css("background-color", "");
        }
    );
});
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

        const namePattern = /^[A-Z][a-zA-Z]*$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        let valid = true;
        let errors = [];

        if (!namePattern.test(name)) {
            valid = false;
            errors.push('Ime mora da počinje velikim slovom i da sadrži samo slova.');
        }
        if (!emailPattern.test(email)) {
            valid = false;
            errors.push('Nevalidna Email forma.');
        }
        if (!phonePattern.test(phone)) {
            valid = false;
            errors.push('Telefon mora da ima barem 10 cifara.');
        }
        if (!passwordPattern.test(password)) {
            valid = false;
            errors.push('Šifra mora da sadrži barem jedno slovo i jedan broj.');
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
            const trimmedJsonString = jsonString.substring(1, jsonString.length - 1);
            document.getElementById('formOutput').innerText = trimmedJsonString;
        } else {
            document.getElementById('formOutput').innerText = errors.join('\n');
        }
    }

    // AJAX za JSON
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var jsonDataHTML = '<h2>Informacije iz JSON fajla o studentima:</h2>';
            jsonDataHTML += '<ul>';
            myObj.students.forEach(function(student) {
                jsonDataHTML += '<li>' + student.name + ', ' + student.age + ' godina, Studije: ' + student.major + '</li>';
            });
            jsonDataHTML += '</ul>';
            document.getElementById('jsonData').innerHTML = jsonDataHTML;
        } else if (this.readyState == 4 && this.status != 200) {
            document.getElementById('jsonData').innerHTML = 'Error.';
        }
    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();
});

