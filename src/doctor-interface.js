import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorLookup } from './../src/doctor.js';

$(document).ready(function(){
  let page = 0;
  $('#symptonSearch').click(function(){
    $('.search').text("");

    let sympton = $('#sympton').val();
    let doctorLookup = new DoctorLookup();
    let symptonPromise = doctorLookup.findDocBySympton(sympton, page);

    symptonPromise.then(function(response){
      let doctor = JSON.parse(response);
      let foundCounter = 0;
      for (let i = 0; i < doctor.data.length; i++) {
          $('.search').append("<li>" + `${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}` + "</li>");
          foundCounter++;
      }
      if (foundCounter === 0){
        $('.showCounter').text(foundCounter + ' found');

      } else {
        $('.showCounter').text(foundCounter + ' showing');

      }

    }, function(error) {
      $('.search').text(error.message);
    });
    });
    $('#nextPage').click(function(){
    page = page + 3;
    console.log(page)
    $('.search').text("");
    $('#symptonSearch').click();
  });
});
