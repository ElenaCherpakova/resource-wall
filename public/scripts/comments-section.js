$(document).ready(function () {
  //select comment's values
  $("#post-comment").on("click", function (e) {
    e.preventDefault()
    const comment = $("#commentsText").val().trim()
    let data = {resource_id: `${$(this).attr("resource_id")}`, "comment" : comment}

    // update db and reloading the page to show new comment
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




