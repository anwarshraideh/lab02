'use strict';

let keyArray = [];
let newArray=[];

$.ajax('data/page-1.json').then((data) => {
    data.forEach(value => {
      let item = new Horns(value);
      item.render();
      item.dropList();
      
    });

    $( '#photo-template' ).first().remove();
    newArray.forEach(element =>{
        $('select').append(`<option value="${element}">${element}</option>`);
      })
    
  });

 

 function Horns(hItem){
    this.title = hItem.title;
    this.image_url = hItem.image_url;
    this.description = hItem.description;
    this.keyword = hItem.keyword;
    this.horns = hItem.horns;
      }


  Horns.prototype.render=function(){
    
  let clone = $('#photo-template').first().clone();
  clone.addClass( this.keyword );

  clone.find("h2").text(this.title);
  clone.find("img").attr("src",this.image_url);
  clone.find("p").text(this.description);
  clone.find("h3").text(this.horns);
  $('main').append(clone);

  }

  Horns.prototype.dropList = function(){
    keyArray.push(this.keyword);
    newArray = [...new Set(keyArray)];
    console.log(newArray);
    
  };


  $(document).ready(function(){

    $('select').click('change',function(){
      let selectItem = this.value;
      $('section').hide();
      $(`.${selectItem}`).show();
      if (selectItem === 'default') {
        $('section').show();
    }
    });
  });
