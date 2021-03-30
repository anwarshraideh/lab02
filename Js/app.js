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

  // let clone = $('#photo-template').first().clone();
  // clone.addClass( this.keyword );

  // clone.find('h2').text(this.title);
  // clone.find('img').attr('src',this.image_url);
  // clone.find('p').text(this.description);
  // clone.find('h3').text(this.horns);
  // $('main').append(clone);

  let newPhotoTempe=$('#temp').html();
  $('main').append(Mustache.render(newPhotoTempe, this));

}

Horns.ajax1 = () => {

  $.ajax('data/page-1.json').then((data) => {
    data.forEach(value => {
      let item = new Horns(value);
      item.render();
      item.fillList();

    });

    $( '.divPage' ).first().remove();
    newArray.forEach(element =>{
      $('select').append(`<option value="${element}">${element}</option>`);
    })

  });
};

Horns.ajax2 = () => {

  $.ajax('data/page-2.json').then((data) => {
    data.forEach(value => {
      let item = new Horns(value);
      item.render();
      item.fillList();

    });

    $( '.divPage' ).first().remove();
    newArray.forEach(element =>{
      $('select').append(`<option value="${element}">${element}</option>`);
    })

  });
};

Horns.prototype.fillList = function(){

  newArray = [...new Set(keyArray)];
  console.log(newArray);

};

function page1(){
  $('.divPage').remove();
  $('select').append('<option value=\'default\'>Filter by Keyword</option>');
  $('section').addClass('photo-template');
  Horns.ajax1();
}

function page2(){
  $('.divPage').remove();
  $('select').append('<option value=\'default\'>Filter by Keyword</option>');
  $('section').addClass('photo-template');
  Horns.ajax2();
}

function sortTitle(){
  $( '.divPage' ).first().remove();
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
  $( '.divPage' ).first().remove();
  newArray.sort(function(a, b){
    if(a.horns < b.horns) { return 1; }
    if(a.horns > b.horns) { return -1; }
    return 0;
  });
  arrayObj.forEach(function(value){
    value.render();

  });
}


$('select').click('change',function(){
  let selectItem = $(this).val();
  $('.divPage').hide();
  $(`.${selectItem}`).show();
  if (selectItem === 'default') {
    $('.divPage').show();
  }
});




$('#page1').on('click',page1);
$('#page2').on('click',page2);
$('#title').on('click',sortTitle);
$('#horns ').on('click',sortHorn);
Horns.ajax1();





