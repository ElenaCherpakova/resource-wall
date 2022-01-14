// When the heart icon is clicked, prevent refresh of page
$(document).ready(function () {
  $(".fa-heart").on("click", function (e) {
    e.preventDefault();
    // make post request to the backend route and increments the like count
    $.ajax({
      method: "POST",
      url: "/likes",
      data: `resource_id = ${$(this).attr("resource_id")}`,
      success: (response) => {
        // refreshes the page automatically
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  });
});
