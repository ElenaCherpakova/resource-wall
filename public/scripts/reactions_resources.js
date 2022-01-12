$(document).ready(function() {
  $('.fa-heart').on('click', function (){
    console.log("this is this", $(this))
    console.log("attribute", $(this).attr("resource_id"))
    $(this).removeClass('far')
    $(this).addClass('fas')

    $.ajax({
      method: 'POST',
      url: '/likes',
      data: `resource_id = ${$(this).attr("resource_id")}`,
      success: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    });

  });
})
