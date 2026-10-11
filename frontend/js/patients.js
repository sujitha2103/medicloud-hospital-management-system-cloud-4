let patients=[];
async function loadPatients(){patients=await api("/patients");renderPatients(patients)}
function renderPatients(list){document.getElementById("patientTable").innerHTML=list.map(p=>`<tr><td>${p.id}</td><td>${p.name}</td><td>${p.age}</td><td>${p.gender}</td><td>${p.phone}</td><td>${p.disease||"-"}</td><td><button class="btn danger small" onclick="deletePatient(${p.id})">Delete</button></td></tr>`).join("")||"<tr><td colspan='7'>No patients found</td></tr>"}
document.getElementById("patientForm").addEventListener("submit",async e=>{e.preventDefault();const body={name:name.value,age:age.value,gender:gender.value,phone:phone.value,email:email.value,disease:disease.value};await api("/patients",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});e.target.reset();loadPatients()});
async function deletePatient(id){if(confirm("Delete this patient?")){await api("/patients/"+id,{method:"DELETE"});loadPatients()}}
document.getElementById("search").addEventListener("input",e=>renderPatients(patients.filter(p=>p.name.toLowerCase().includes(e.target.value.toLowerCase()))));
loadPatients();