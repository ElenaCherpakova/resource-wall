// put all of the rating stars in an array
const starArray = document.querySelectorAll(".star");

$(document).ready(function () {
  //for each star, grab the value from 1 to 5
  starArray.forEach(function (star) {
    star.addEventListener("click", function () {
      let starID = `${$(star).attr("data-star")}`;
      let id = starID.slice(-1);
      let resourceID = $(star).attr("resource_id");
      let title = $(star).attr("title");

      //post the value along with the resource id to the backend route

      $.ajax({
        method: "POST",
        url: "/rate",
        data: { starID: id, resourceID: resourceID },
        success: (response) => {
          if (response.status === 201) {
            for (i = 1; i <= id; i++) {
              document
                .getElementById(`${title}-${i}`)
                //give the star a yellow highlight when clicked
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
