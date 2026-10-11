const API="/api";
function logout(){localStorage.removeItem("loggedIn");location.href="login.html";}
async function api(url,options={}){const r=await fetch(API+url,options);if(!r.ok)throw new Error("Server error");return r.json();}
async function loadDashboard(){
 try{
  const [p,d,a,b]=await Promise.all([api("/patients"),api("/doctors"),api("/appointments"),api("/bills")]);
  document.getElementById("patientCount").textContent=p.length;
  document.getElementById("doctorCount").textContent=d.length;
  document.getElementById("appointmentCount").textContent=a.length;
  document.getElementById("revenue").textContent="₹"+b.reduce((s,x)=>s+Number(x.amount||0),0).toLocaleString("en-IN");
  const pt=Object.fromEntries(p.map(x=>[x.id,x.name])),dt=Object.fromEntries(d.map(x=>[x.id,x.name]));
  document.getElementById("recentAppointments").innerHTML=a.slice(-6).reverse().map(x=>`<tr><td>${pt[x.patientId]||"Unknown"}</td><td>${dt[x.doctorId]||"Unknown"}</td><td>${x.date}</td><td>${x.time}</td><td><span class="status ${x.status}">${x.status}</span></td></tr>`).join("")||"<tr><td colspan='5'>No appointments</td></tr>";
 }catch(e){console.error(e)}
}
if(location.pathname.endsWith("index.html")||location.pathname.endsWith("/")) loadDashboard();