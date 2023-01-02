function facultySelected() {
  var idFaculty = document.getElementById("faculty").value;
  var careerCombobox = document.getElementById("career");
  careerCombobox.disabled = false;
  careerCombobox.innerHTML = '<option value="">Escoge una Carrera</option>';
  var localObj = JSON.parse($("#myLocalDataObj").val());
  localObj.forEach(career => {
    if(career.idFaculty === idFaculty){
      var option = document.createElement('option');
      option.value = career._id;
      option.text = career.name;
      careerCombobox.add(option);
    }
  });
}
