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
            } else {
                alert('Failed to add user');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
        });
}