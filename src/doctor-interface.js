import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorLookup } from './../src/doctor.js';

$(document).ready(function(){
  $('#symptonSearch').click(function(){
    let sympton = $('#sympton').val();
    let doctorLookup = new DoctorLookup();
    let symptonPromise = doctorLookup.findDocBySympton(sympton);

    symptonPromise.then(function(response){
      let doctor = JSON.parse(response);
      let foundCounter = 0;
      for (let i = 0; i < doctor.data.length; i++) {
          $('.search').append("<li>" + `${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}` + "</li>");
          foundCounter++;
      }
      $('.showCounter').text(foundCounter + ' showing');

    }, function(error) {
      $('.search').text(error.message);
    });
  });
});
