(()=>{let e=[{url:"img/banner.jpg",title:"Баннер 1"},{url:"img/banner2.jpg",title:"Баннер 2"},{url:"img/banner3.jpg",title:"Баннер 3"}];document.addEventListener("DOMContentLoaded",(()=>{!function(e,t){if(!e||!e.length)return;t=t||{dots:!1,titles:!1,autoplay:!1,autoplayInterval:5e3};const l=document.querySelector(".slider"),i=l.querySelector(".slider__images"),a=l.querySelector(".slider__arrows");function n(l){if(i.querySelector(".active").classList.remove("active"),i.querySelector(`.n${l}`).classList.add("active"),t.titles){let t=i.querySelector(".slider__images-title");e[l].title?(t.innerText=e[l].title,t.style.display="block"):t.style.display="none"}if(t.dots){let e=document.querySelector(".slider__dots");e.querySelector(".active").classList.remove("active"),e.querySelector(`.n${l}`).classList.add("active")}}e.forEach(((e,t)=>{let l=document.createElement("div");l.className=`image n${t} ${t?"":"active"}`,l.dataset.index=t,l.style.backgroundImage=`url(${e.url})`,i.appendChild(l)})),function(){let t=e.length-1;a.querySelectorAll(".slider__arrow").forEach((e=>{e.addEventListener("click",(function(){let l,a=+i.querySelector(".active").dataset.index;l=e.classList.contains("left")?0===a?t:a-1:a===t?0:a+1,n(l)}))}))}(),t.dots&&function(){let t=document.createElement("div");t.className="slider__dots",e.forEach(((e,l)=>{let i=document.createElement("div");i.className=`slider__dots-item n${l} ${l?"":"active"}`,i.dataset.index=l,i.addEventListener("click",(function(){n(this.dataset.index)})),t.appendChild(i)})),l.appendChild(t)}(),t.titles&&function(){let t=`<div class="slider__images-title">${e[0].title}</div>`;i.innerHTML+=t}(),t.autoplay&&setInterval((()=>{let t=+i.querySelector(".active").dataset.index;n(t===e.length-1?0:t+1)}),t.autoplayInterval)}(e,{dots:!0,titles:!1,autoplay:!0,autoplayInterval:5e3})}))})();