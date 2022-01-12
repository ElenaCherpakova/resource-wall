$(document).ready(function () {
  $('.fa-comment-dots').on('click', function () {
    console.log($(this))
    $("#commentSection").toggle();
    console.log($(this))
  });

  $("#post-comment").on("click", function (e) {
    e.preventDefault()
    console.log($(this))
    const comment = $("#commentsText").val().trim()
    let data = {resource_id: `${$(this).attr("resource_id")}`, "comment" : comment}
    $.ajax({
      method: 'POST',
      url: '/comments',
      data: data,
      success: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    });
  });
})




