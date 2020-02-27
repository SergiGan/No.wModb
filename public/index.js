//Add User
        function CreateUser(userName, userAge, userPassword) {
            $.ajax({
                url: "api/users",
                contentType: "application/json",
                method: "POST",
                data: JSON.stringify({
                    name: userName,
                    age: userAge,
                    password: userPassword
                }),
                success: function (user) {
                    reset();
                    $("table tbody").append(row(user));
                }
            })
        }
// Забираєм всіх користувачів
        function GetUsers() {
            $.ajax({
                url: "/api/users",
                type: "GET",
                contentType: "application/json",
                success: function (users) {
                    var rows = "";
                    $.each(users, function (index, user) {
                         // add getting elements to table
                        rows += row(user);
                    })
                    $("table tbody").append(rows);
                 }
            });
        }
// Getting one user
        function GetUser(id) {
            $.ajax({
                url: "/api/users/"+id,
                type: "GET",
                contentType: "application/json",
                success: function (user) {
                    var form = document.forms["userForm"];
                    form.elements["id"].value = user._id;
                    form.elements["name"].value = user.name;
                    form.elements["age"].value = user.age;
                    form.elements["password"].value = user.password;
                }
            });
        }
// User change
        function EditUser(userId, userName, userAge, userPassword) {
            $.ajax({
                url: "api/users",
                contentType: "application/json",
                method: "PUT",
                data: JSON.stringify({
                    id: userId,
                    name: userName,
                    age: userAge,
                    password: userPassword
                }),
                success: function (user) {
                    reset();
                    console.log(user);
                    $("tr[data-rowid='" + user._id + "']").replaceWith(row(user));
                }
            })
        }

// form reset
        function reset() {
            var form = document.forms["userForm"];
            form.reset();
            form.elements["id"].value = 0;
        }

// Delete user
        function DeleteUser(id) {
            $.ajax({
                url: "api/users/"+id,
                contentType: "application/json",
                method: "DELETE",
                success: function (user) {
                    console.log(user);
                    $("tr[data-rowid='" + user._id + "']").remove();//or .slice(i-1);
                }
            })
        }

// creating a row for a table
        var row = function (user) { // this function have a problem(Error: Argument passed in must be
                                   //a single String of 12 bytes or a string of 24 hex characters)
            return "<tr data-rowid='" + user._id + "'><td>" + user._id + "</td>" +
                   "<td>" + user.name + "</td> <td>" + user.age + "</td>" +
                   "<td><a class='editLink' data-id='" + user._id + "'>Edit</a> | " +
                    "<a class='removeLink' data-id='" + user._id + "'>Delete</a></td></tr>";
        }
// reset form values
        $("#reset").click(function (e) {

            e.preventDefault();
            reset();
        })

// form submission
        $("form").submit(function (e) {
            e.preventDefault();
            var id = this.elements["id"].value;
            var name = this.elements["name"].value;
            var age = this.elements["age"].value;
            var password = this.elements["password"].value;
            if (id == 0)
                CreateUser(name, age, password);
            else
                EditUser(id, name, age);
        });

// click on the link Edit
        $("body").on("click", ".editLink", function () {
            var id = $(this).data("id");
            GetUser(id);
        })
// click on the Delete link
        $("body").on("click", ".removeLink", function () {
            var id = $(this).data("id");
            DeleteUser(id);
        })

// user loading, calling function
        GetUsers();