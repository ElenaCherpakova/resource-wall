$(document).ready(function () {
  $(".fa-heart").on("click", function (e) {
    e.preventDefault();
    // console.log("this is this", $(this))
    // console.log("attribute", $(this).attr("resource_id"))
    // $(this).removeClass("far");
    // $(this).addClass("fas");

    //This code for automatic itineration of likes (not working!)
    // let value = $('.likes_id').val();
    // value = Number(value);
    // value = value + 1;
    // console.log("VALUE:", value)
    // const likeNumber = $(".likes_id").val();
    // console.log("this is number", likeNumber)

    $.ajax({
      method: "POST",
      url: "/likes",
      data: `resource_id = ${$(this).attr("resource_id")}`,
      success: (response) => {
        console.log(response);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  });

  // const likeItineration = function (like) {
  //   let like = like + 1;
  //   return like;
  // }
});
