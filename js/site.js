/* ====== EDIT CLINIC DETAILS HERE (used on every page) ====== */
const CLINIC = {
  name: "Smile Dental Care",
  phone: "+91 98100 00000",          // TODO: replace with number from Google Maps listing
  phoneRaw: "919810000000",
  email: "info@smiledentalcare.in",  // TODO: replace
  address: "Smile Dental Care, South Delhi, New Delhi, India", // TODO: replace with exact address from Maps
  hours: "Mon – Sat: 10:00 AM – 8:00 PM · Sun: By appointment",
  lat: 28.5609879, lng: 77.212148,
  maps: "https://www.google.com/maps/place/Smile+dental+care/@28.5609879,77.212148,17z"
};
const IMG = {
  hero1: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=75",
  hero2: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1800&q=75",
  hero3: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1800&q=75"
};
const pages = [["index.html","Home"],["about.html","About Us"],["services.html","Services"],["doctors.html","Doctors"],["contact.html","Contact Us"]];
const cur = location.pathname.split("/").pop() || "index.html";

document.getElementById("hdr").outerHTML = `
<div class="topbar"><div class="container"><span><i class="fa-solid fa-location-dot"></i> ${CLINIC.address}</span><span><i class="fa-regular fa-clock"></i> ${CLINIC.hours}</span><a href="tel:+${CLINIC.phoneRaw}"><i class="fa-solid fa-phone"></i> ${CLINIC.phone}</a></div></div>
<header class="nav" id="nav"><div class="container">
<a class="logo" href="index.html"><i><i class="fa-solid fa-tooth"></i></i><span>Smile Dental Care<small>Luxury Dentistry</small></span></a>
<ul class="menu" id="menu">${pages.map(p=>`<li><a href="${p[0]}" class="${cur==p[0]?'active':''}">${p[1]}</a></li>`).join("")}
<li><a class="btn btn-gold" href="contact.html#book" style="padding:12px 26px">Book Appointment</a></li></ul>
<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button></div></header>`;

document.getElementById("ftr").outerHTML = `
<footer><div class="container">
<div class="fnews rv"><div><h3>Your most confident smile starts here</h3><p>Subscribe for dental tips & exclusive offers.</p></div>
<form onsubmit="event.preventDefault();this.innerHTML='<b>Thank you! ✓</b>'"><input type="email" required placeholder="Your email address"><button class="btn btn-dark">Subscribe</button></form></div>
<div class="fgrid">
<div class="rv"><a class="logo" href="index.html"><i><i class="fa-solid fa-tooth"></i></i><span>Smile Dental Care<small>Luxury Dentistry</small></span></a>
<p>Premium, painless and personalised dental care in New Delhi — combining advanced technology with a warm, gentle touch.</p>
<div class="social"><a href="${CLINIC.maps}" target="_blank" rel="noopener" title="Google Maps"><i class="fa-brands fa-google"></i></a><a href="https://wa.me/${CLINIC.phoneRaw}" target="_blank" rel="noopener" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a><a href="#" title="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="#" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a></div></div>
<div class="rv d1"><h4>Quick Links</h4><ul>${pages.map(p=>`<li><a href="${p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
<div class="rv d2"><h4>Our Services</h4><ul><li><a href="services.html#implants">Dental Implants</a></li><li><a href="services.html#whitening">Teeth Whitening</a></li><li><a href="services.html#aligners">Invisible Aligners</a></li><li><a href="services.html#veneers">Smile Makeover</a></li><li><a href="services.html#rct">Root Canal (RCT)</a></li><li><a href="services.html#kids">Pediatric Dentistry</a></li></ul></div>
<div class="rv d3"><h4>Visit Us</h4><ul class="ci"><li><i><i class="fa-solid fa-location-dot"></i></i><span>${CLINIC.address}</span></li><li><i><i class="fa-solid fa-phone"></i></i><a href="tel:+${CLINIC.phoneRaw}">${CLINIC.phone}</a></li><li><i><i class="fa-solid fa-envelope"></i></i><a href="mailto:${CLINIC.email}">${CLINIC.email}</a></li><li><i><i class="fa-regular fa-clock"></i></i><span>${CLINIC.hours}</span></li></ul></div>
</div>
<div class="fbottom"><span>© ${new Date().getFullYear()} ${CLINIC.name}. All rights reserved.</span><span>Crafted with care for beautiful smiles</span></div>
</div></footer>
<a class="wa" href="https://wa.me/${CLINIC.phoneRaw}?text=Hello%20Smile%20Dental%20Care%2C%20I%20would%20like%20to%20book%20an%20appointment" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;

/* nav behaviour */
const nav=document.getElementById("nav"),menu=document.getElementById("menu"),bg=document.getElementById("burger");
addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>30));
bg.onclick=()=>{menu.classList.toggle("open");bg.classList.toggle("x")};
menu.querySelectorAll("a").forEach(a=>a.onclick=()=>{menu.classList.remove("open");bg.classList.remove("x")});

/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));

/* counters */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.n,s=el.dataset.s||"";let n=0;
const st=Math.max(1,Math.ceil(t/60));const iv=setInterval(()=>{n=Math.min(t,n+st);el.textContent=n.toLocaleString()+s;if(n>=t)clearInterval(iv)},25);co.unobserve(el)}),{threshold:.5});
document.querySelectorAll("[data-n]").forEach(el=>co.observe(el));

/* hero slider */
const slides=document.querySelectorAll(".slide"),dots=document.getElementById("dots");
if(slides.length){let i=0;slides.forEach((s,k)=>{s.style.backgroundImage=`url(${IMG["hero"+(k+1)]})`;const d=document.createElement("b");d.onclick=()=>go(k);dots.appendChild(d)});
const go=k=>{i=k;slides.forEach((s,j)=>s.classList.toggle("on",j==i));[...dots.children].forEach((d,j)=>d.classList.toggle("on",j==i))};
go(0);setInterval(()=>go((i+1)%slides.length),6000)}

/* testimonials carousel */
const tt=document.getElementById("ttrack");
if(tt){const n=tt.children.length,td=document.getElementById("tdots");let t=0;
for(let k=0;k<n;k++){const d=document.createElement("b");d.onclick=()=>tg(k);td.appendChild(d)}
const tg=k=>{t=k;tt.style.transform=`translateX(-${t*100}%)`;[...td.children].forEach((d,j)=>d.classList.toggle("on",j==t))};
tg(0);setInterval(()=>tg((t+1)%n),5500)}

/* image fallback so layout never breaks */
document.querySelectorAll("img").forEach(im=>im.addEventListener("error",()=>{im.style.background="linear-gradient(135deg,#12304a,#1aa6a0)";im.removeAttribute("src")}));

/* booking form -> visual success state */
const bf=document.getElementById("bookForm");
if(bf){const ok=document.getElementById("okBox");
bf.onsubmit=e=>{e.preventDefault();const btn=bf.querySelector("button[type=submit]");btn.disabled=true;btn.innerHTML='Sending… <i class="fa-solid fa-spinner fa-spin"></i>';
setTimeout(()=>{document.getElementById("okName").textContent=bf.name.value;ok.classList.add("show");btn.disabled=false;btn.innerHTML='Send Message <i class="fa-solid fa-paper-plane"></i>'},900)};
document.getElementById("again").onclick=()=>{bf.reset();ok.classList.remove("show")}}
const mp=document.getElementById("mapframe");
if(mp)mp.src=`https://maps.google.com/maps?q=${CLINIC.lat},${CLINIC.lng}&z=17&output=embed`;
