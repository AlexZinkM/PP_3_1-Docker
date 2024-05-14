function renewTable() {
    fetch('http://localhost:8080/api/users/')
        .then((res) => res.json())
        .then((data) => {
            let headers = `
          <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">First Name</th>
                        <th class="text-center">Last Name</th>
                        <th class="text-center">Age</th>
                        <th class="text-center">Email</th>
                        <th class="text-center">Role</th>
                        <th class="text-center">Edit</th>
                        <th class="text-center">Delete</th>
                    </tr>`;
            document.querySelector("#adminTable thead").innerHTML = headers;

            let rows = "";
            data.forEach((user) => {
                let roleNames = user.roles.map(role => role.name.replace("ROLE_", "")).join(', ');
                rows += `
              <tr>
                        <td class="text-center">${user.id}</td>
                        <td class="text-center">${user.firstName}</td>
                        <td class="text-center">${user.lastName}</td>
                        <td class="text-center">${user.age}</td>
                        <td class="text-center">${user.email}</td>
                        <td class="text-center">${roleNames}</td>
                        <td class="text-center">
                            <button type="button" class="btn btn-info editBtn" data-userid="${user.id}"
                            data-toggle="modal" data-target="#editModal">
                                Edit
                            </button>
                        </td>
                        <td class="text-center">
                            <button type="button" class="btn btn-danger deleteBtn" data-userid="${user.id}"
                              data-toggle="modal" data-target="#deleteModal">
                                Delete
                            </button>
                        </td>
                    </tr>`;
            });
            document.querySelector("#adminTable tbody").innerHTML = rows;


            document.querySelectorAll(".deleteBtn").forEach(button => {
                button.addEventListener("click", function () {
                    let userID = button.getAttribute("data-userid");
                    let user = data.find(user => user.id == userID);

                    document.getElementById("firstNameDelete").value = user.firstName;
                    document.getElementById("lastNameDelete").value = user.lastName;


                    document.querySelector(".deleteConfirmBtn").addEventListener("click", function () {
                        fetch('http://localhost:8080/api/users/' + userID, {
                            method: 'POST'
                        })
                            .then(response => {
                                $('#deleteModal').modal('hide');
                                $('#deleteSuccessModal').modal('show')
                                renewTable();
                            });
                    });

                });
            });


            document.querySelectorAll(".editBtn").forEach(button => {
                button.addEventListener("click", function () {
                    let userID = button.getAttribute("data-userid");
                    let user = data.find(user => user.id == userID);


                    document.getElementById("idInput").value = user.id;
                    document.getElementById("firstnameInput").value = user.firstName;
                    document.getElementById("lastnameInput").value = user.lastName;
                    document.getElementById("ageInput").value = user.age;
                    document.getElementById("emailInput").value = user.email;
                    document.getElementById("passwordInput").value = user.password;
                    document.getElementById("roleInput").value = ((user.roles).length === 2) ? 'ADMIN': 'USER';

                    // if ((user.roles).length === 2) {
                    //     document.getElementById("roleInput").value  = 'ADMIN';
                    // } else {
                    //     document.getElementById("roleInput").value  = 'USER';
                    // }


                    document.querySelector(".editConfirmBtn").addEventListener("click", function () {
                        const jsonData = {};
                        jsonData['id'] = document.getElementById("idInput").value;
                        jsonData['firstName'] = document.getElementById("firstnameInput").value;
                        jsonData['lastName'] = document.getElementById("lastnameInput").value;
                        jsonData['age'] = document.getElementById("ageInput").value;
                        jsonData['email'] = document.getElementById("emailInput").value;
                        jsonData['password'] = document.getElementById("passwordInput").value;

                        let selectedRoles = [];
                        const role = document.getElementById("roleInput").value;

                        if (role === 'ADMIN') {
                            selectedRoles.push({id: 1, name: 'ROLE_USER'});
                            selectedRoles.push({id: 2, name: 'ROLE_ADMIN'});
                        } else {
                            selectedRoles.push({id: 1, name: 'ROLE_USER'});
                        }

                        jsonData['roles'] = selectedRoles;


                        fetch('http://localhost:8080/api/users/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonData)
                        })
                            .then(response => {
                                if (response.ok) {
                                    $('#editModal').modal('hide');
                                    renewTable();
                                } else {
                                    alert('Failed to update user');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('An error occurred');
                            });
                    });


                });
            });
        });
}

document.addEventListener("DOMContentLoaded", function () {
    renewTable();

});



//----------------------------------------------------------------------------------------------------------------------


function showUserTable() {
    fetch('http://localhost:8080/api/users/' + thisUserID)
        .then((res) => res.json())
        .then((user) => {
            let headers = `
          <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">First Name</th>
                        <th class="text-center">Last Name</th>
                        <th class="text-center">Age</th>
                        <th class="text-center">Email</th>
                        <th class="text-center">Role</th>
                    </tr>`;
            document.querySelector("#userTable thead").innerHTML = headers;

            let roleNames = user.roles.map(role => role.name.replace("ROLE_", "")).join(', ');

            let rows =
                ` <tr>
                        <td class="text-center">${user.id}</td>
                        <td class="text-center">${user.firstName}</td>
                        <td class="text-center">${user.lastName}</td>
                        <td class="text-center">${user.age}</td>
                        <td class="text-center">${user.email}</td>
                        <td class="text-center">${roleNames}</td>
                    </tr>`;
            document.querySelector("#userTable tbody").innerHTML = rows;
        });
}


document.addEventListener("click", function () {
    showUserTable();
});


//----------------------------------------------------------------------------------------------------------------------


function postData() {
    const form = document.getElementById('userForm');
    const formData = new FormData(form);
    const jsonData = {};

    let selectedRoles = [];
    const role = formData.get('roles');


    if (role === 'ADMIN') {
        selectedRoles.push({ id: 1, name: 'ROLE_USER' });
        selectedRoles.push({ id: 2, name: 'ROLE_ADMIN' });
    } else if (role === 'USER') {
        selectedRoles.push({ id: 1, name: 'ROLE_USER' });
    } else {
        event.preventDefault();
        alert('Please select a role');
        return;
    }

    jsonData['roles'] = selectedRoles;


    formData.forEach((value, key) => {
        if (key !== 'roles') {
            jsonData[key] = value;
        }
    });

    fetch('http://localhost:8080/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => {
            if (response.ok) {
                alert('User added successfully');
                form.reset();
                renewTable();
            } else {
                alert('Failed to add user');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
        });
}

document.getElementById("addUserButton").addEventListener("click", function () {
    postData();
});





