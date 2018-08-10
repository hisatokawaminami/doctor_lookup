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
      $('.search').append(doctor.data[0].practices[0].name);
    }, function(error) {
      $('.search').text(error.message);
    });
  });
});
