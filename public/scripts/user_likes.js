$(document).ready(function () {
  // $("fa-heart").click(() => {
  //    $(this).toggleClass("heartChange")
  // })
  $("#heartChange").click(function(){
    if(clicked){
        $(this).css('background-color', 'red');
        clicked  = false;
    } else {
        $(this).css('background-color', 'blue');
        clicked  = true;
    }
});
});
//     $.ajax({
//       method: 'POST',
//       url: '/profile',
//       data: data,
//       success: (response) => {
//         console.log(response)
//       },
//       error: (err) => {
//         console.log(err)
//       }
//     });
//   })

