function categorySelected() {
  var idCategory = document.getElementById("category").value;
  console.log("categoria",idCategory);
  var preferenceCombobox = document.getElementById("preference");
  preferenceCombobox.disabled = false;
  preferenceCombobox.innerHTML = '<option value="">Escoge una Preferencia</option>';
  var localObj = JSON.parse($("#myLocalDataObjCat").val());
  localObj.forEach(preference => {
    if(preference.idCategory === idCategory){
      var option = document.createElement('option');
      option.value = preference._id;
      option.text = preference.name;
      preferenceCombobox.add(option);
    }
  });
}
