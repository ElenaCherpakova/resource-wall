// Client facing scripts here
$(document).ready(function () {
  const createResource = function(resource, categories){
    const $resource = $('<div>').addClass('card-deck');
    const $divSecond = $('div').addClass('card').css({width: "18rem"});
    const $imgResource = $('img').addClass('card-img-top resource-img img-fluid').attr("src", resource.image); //did not att alt comment
    const $divThird = $('<div>').addClass('card-body');
    const $h5title = $('<h5>').addClass('card-title text-center').text(resource.title);
    const $divFouth = $('<div>');
    const $pDescription = $('<p>').addClass('card-text').text(resource.description);
    const $pLink = $('<p>').addClass('card-text').text(resource.url);
    const $pCategories= $('<p>').addClass('card-text tag').text(categories.name);
    const $divFifth = $('<div>').addClass('card-footer');
    const $icon1 = $('<i>').addClass('far fa-heart');
    const $icon2 = $('<i>').addClass('far fa-comment-dots');
    const $icon3 = $('<i>').addClass('far fa-star');

    //append element together
    $divFifth.append($icon1, $icon2, $icon3);
    $divFouth.append($pDescription, $pLink, $pCategories);
    $divThird.append($h5title, $divFouth);
    $divSecond.append($imgResource, $divThird, $divFouth);
    $resource.append($divSecond);

    return $resource;
  };

  const renderUserResources = function (resources) {
    const $userResourcesContainer = $('#created-resources');
    $userResourcesContainer.empty();
    for (resource of resources){
      const $resource = createResource(resource, categories);
      $userResourcesContainer.prepend($resource);
    }
  };

  const renderLikedResources = function (resources) {
    const $likedResourcesContainer = $('#liked-resources');
    $likedResourcesContainer.empty();
    for (resource of resources){
      const $resource = createResource(resource, categories);
      $likedResourcesContainer.prepend($resource);
    }
  };


});

