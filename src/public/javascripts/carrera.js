var slider = document.getElementById("value");
var output = document.getElementById("range");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
}

function career1Selected() {
  var nameCareer = document.getElementById('career1');
  console.log("nombre: ",nameCareer);
  var select = nameCareer.selectedOptions[0].getAttribute("careerName");
  console.log("select: ",select);
  document.getElementById("career1name").value = select;
}

function career2Selected() {
  var nameCareer = document.getElementById('career2');
  console.log("nombre: ",nameCareer);
  var select = nameCareer.selectedOptions[0].getAttribute("careerName");
  console.log("select: ",select);
  document.getElementById("career2name").value = select;
}