import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorLookup } from './../src/doctor.js';

$(document).ready(function(){
  let page = 0;
  $('#symptomSearch').click(function(){
    $('.search').text("");
    let name = $('#name').val();
    let symptom = $('#symptom').val();
    let doctorLookup = new DoctorLookup();
    let symptomPromise = doctorLookup.findDocBySymptom(symptom, name, page);

    symptomPromise.then(function(response){
      let doctor = JSON.parse(response);
      let foundCounter = 0;
      // let j = doctor.data.practices.phones.length;
      for (let i = 0; i < doctor.data.length; i++) {
        if (`${doctor.data[i].practices[0].accepts_new_patients}` === "true" ) {
          $('.search').append(
            "<li>" + `${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}` + "</li>" +
            "<ul>" + `Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}` + "</ul>" +
            "<ul>" + `Phone: ${doctor.data[i].practices[0].phones[0].number}` + "</ul>" +
            "<ul>" + `Website: ` + `<a href="${doctor.data[i].practices[0].website}">` + `${doctor.data[i].practices[0].website}` + "</a>" +
            "</ul>" +
            "<ul>" + "Accepting New Patients: Yes" + "</ul<");
          } else {
            $('.search').append(
              "<li>" + `${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}` + "</li>" +
              "<ul>" + `Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}` + "</ul>" +
              "<ul>" + `Phone: ${doctor.data[i].practices[0].phones[0].number}` + "</ul>" +
              "<ul>" + `Website: ` + `<a href="${doctor.data[i].practices[0].website}">` + `${doctor.data[i].practices[0].website}` + "</a>" +  "</ul>" +
              "<ul>" +"Accepting New Patients: No" + "</ul<");
            }
            foundCounter++;
          }
          if (foundCounter === 0){
            $('.showCounter').text(foundCounter + ' found: NO DOCTOR MEET CRITERIA');
          } else {
            $('.showCounter').text(foundCounter + ' showing');
          }
        }, function(error) {
          $('.search').text(error.message);
        });
      });
      $('#nextPage').click(function(){
        page = page + 5;
        console.log(page)
        $('.search').text("");
        $('#symptomSearch').click();
      });
    });
