const starArray = document.querySelectorAll(".star");

$(document).ready(function () {
  starArray.forEach(function (star) {
    star.addEventListener("click", function () {
      let starID = `${$(star).attr("data-star")}`;
      let id = starID.slice(-1);
      let resourceID = $(star).attr("resource_id");
      let title = $(star).attr("title");

      $.ajax({
        method: "POST",
        url: "/rate",
        data: { starID: id, resourceID: resourceID },
        success: (response) => {
          if (response.status === 201) {
            for (i = 1; i <= id; i++) {
              document
                .getElementById(`${title}-${i}`)
                .classList.add("active-star");
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  });
});
