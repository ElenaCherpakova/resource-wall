$(document).ready(function () {
  console.log("Hello Word")
  $('.fa-comment-dots').on('click', function () {
    console.log("$(this)")
    $(".commentSection").toggle();
    console.log($(this))
  });

  $("#post-comment").on("click", function (e) {
    console.log($(this))
    e.preventDefault()
    const comment = $("#commentsText").val().trim()
    console.log("the resource id", $(this).attr("resource_id"))
    let data = {resource_id: `${$(this).attr("resource_id")}`, "comment" : comment}

    $.ajax({
      method: 'POST',
      url: `/comments/${$(this).attr("resource_id")}`,
      data: data,
      success: (response) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    });
  });
})




