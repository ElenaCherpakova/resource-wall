// Client facing scripts here
// IIFE


$(document).ready(function () {
  $("#update-profile").on("submit", (e) => {
    e.preventDefault()
    const firstName = $(this).find("input[name=firstName]").val()
    const lastName = $(this).find("input[name=lastName]").val()
    const password = $(this).find("input[name=password]").val()
    const email = $(this).find("input[name=email]").val()
    const data = { firstName, lastName, password, email }
    $.ajax({
      method: 'POST',
      url: '/profile',
      data: data,
      success: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    });
  })
})
