
function showTable() {
    fetch('http://localhost:8080/api/users/' + userID)
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
            document.querySelector("thead").innerHTML = headers;


            console.log(user.roles);
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
            document.querySelector("tbody").innerHTML = rows;
        });
}



document.addEventListener("DOMContentLoaded", function () {
    showTable();
});


