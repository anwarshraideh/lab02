/* eslint-disable new-cap */
'use strict';

let keyArray = [];
let newArray = [];
let arrayObj = [];


function Horns(hItem){
  this.title = hItem.title;
  this.image_url = hItem.image_url;
  this.description = hItem.description;
  this.keyword = hItem.keyword;
  this.horns = hItem.horns;
  keyArray.push(this.keyword);
  arrayObj.push(this);

}


Horns.prototype.render = function(){

  let newPhotoTempe = $('#temp').html();
  $('main').append(Mustache.render(newPhotoTempe, this));

}



$.ajax('data/page-1.json').then((data) => {
  data.forEach(value => {
    let item = new Horns(value);
    item.render();
    item.fillList();

  });

  $( '.divImgPage' ).first().remove();
  newArray.forEach(element =>{
    $('select').append(`<option value="${element}">${element}</option>`);
  })

});


Horns.prototype.fillList = function(){

  newArray = [...new Set(keyArray)];
  console.log(newArray);

};

$('#page1').click(function()
{
  $('.divImgPage').remove();
  keyArray=[];
  newArray=[];
  $('.divImgPage').empty();
  $('select').empty();
  $('select').append('<option value=\'default\'>Filter by Keyword</option>');
  $('section').addClass('photo-template');

  $.ajax('data/page-1.json').then((data) => {
    data.forEach(value => {
      let item = new Horns(value);
      item.render();
      item.fillList();

    });

    $( '.divImgPage' ).first().remove();
    newArray.forEach(element =>{
      $('select').append(`<option value="${element}">${element}</option>`);
    });

  });
});



$('#page2').click(function()
{
  $('.divImgPage').remove();
  keyArray=[];
  newArray=[];
  $('.divImgPage').empty();
  $('select').empty();
  $('select').append('<option value=\'default\'>Filter by Keyword</option>');
  $('section').addClass('photo-template');

  $.ajax('data/page-2.json').then((data) => {
    data.forEach(value => {
      let item = new Horns(value);
      item.render();
      item.fillList();

    });

    $( '.divImgPage' ).first().remove();
    newArray.forEach(element =>{
      $('select').append(`<option value="${element}">${element}</option>`);
    });

  });
});




function sortTitle(){

  $( '.divImgPage' ).first().remove();
  arrayObj.sort(function(a, b){
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  });
  arrayObj.forEach(function(value){
    value.render();

  });
}

function sortHorn(){
  $( '.divImgPage' ).first().remove();
  arrayObj.sort(function(a, b){
    if(a.horns < b.horns) { return 1; }
    if(a.horns > b.horns) { return -1; }
    return 0;
  });
  arrayObj.forEach(function(value){
    value.render();

  });
}


$('select').click('change',function(){
  $('.divImgPage').hide();
  let selectItem = $(this).val();
  $(`.${selectItem}`).show();
  if (selectItem === 'default') {
    $('.divImgPage').show();
  }
});


$('#title').on('click',sortTitle);
$('#horns').on('click',sortHorn);

