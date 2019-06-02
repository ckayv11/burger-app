// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Add a burger
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("Added new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    // Change to devoured & move to burgers devoured column
    $("#change-devour").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var newDevourState = {
            devoured: 1
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function () {
                console.log("Burgers devoured", newDevourState);
                location.reload();
            }
        );
    });

    // Delete a burger
    $("#trash-burger").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("trashed burger", id);
                location.reload();
            }
        );
    });
});
