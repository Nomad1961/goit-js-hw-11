import{i as l,S as m}from"./assets/vendor-8c59ed88.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const u="43839854-7e39202c3c35776610ceb4193";async function p(r){const n=`https://pixabay.com/api/?key=${u}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`;return(await(await fetch(n)).json()).hits}function y(r){const n=document.getElementById("gallery");n.innerHTML="",r.length===0?l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):r.forEach(t=>{const s=document.createElement("img");s.src=t.webformatURL,s.alt=t.tags,s.dataset.largeImage=t.largeImageURL,s.dataset.likes=t.likes,s.dataset.views=t.views,s.dataset.comments=t.comments,s.dataset.downloads=t.downloads,s.addEventListener("click",f);const e=document.createElement("div");e.className="card",e.appendChild(s);const o=document.createElement("div");o.className="info",o.innerHTML=`
        <p>Likes: ${t.likes}</p>
        <p>Views: ${t.views}</p>
        <p>Comments: ${t.comments}</p>
        <p>Downloads: ${t.downloads}</p>
      `,e.appendChild(o),n.appendChild(e)})}function f(r){const n=document.getElementById("modal"),t=document.getElementById("modal-img"),s=document.getElementById("caption"),e=r.target;n.style.display="block",t.src=e.dataset.largeImage,s.textContent=`Likes: ${e.dataset.likes}, Views: ${e.dataset.views}, Comments: ${e.dataset.comments}, Downloads: ${e.dataset.downloads}`}const g=document.getElementById("search-form"),d=document.getElementById("search-input"),c=document.querySelector(".loader");g.addEventListener("submit",async r=>{r.preventDefault();const n=d.value.trim();if(c.style.display="block",n==="")l.warning({title:"Warning",message:"Please enter a search term."}),c.style.display="none";else try{const t=await p(n);y(t),new m(".simplelightbox a",{elements:".simplelightbox",closeText:"Закрыть",docClose:!0}).refresh()}catch{l.error({title:"Error",message:"An error occurred while fetching images. Please try again."})}finally{c.style.display="none",d.value=""}});const h=document.querySelector(".close-button"),i=document.getElementById("modal");h.addEventListener("click",()=>{i.style.display="none"});window.addEventListener("click",r=>{r.target===i&&(i.style.display="none")});
//# sourceMappingURL=commonHelpers.js.map