import{i,S as c}from"./assets/vendor-8501dee5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const l="43839854-7e39202c3c35776610ceb4193";async function d(n){const o=`https://pixabay.com/api/?key=${l}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`;return(await(await fetch(o)).json()).hits}function m(n){const o=document.getElementById("gallery");o.innerHTML="",n.length===0?i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):n.forEach(s=>{const t=document.createElement("img");t.src=s.webformatURL,t.alt=s.tags,t.dataset.largeImage=s.largeImageURL,t.dataset.likes=s.likes,t.dataset.views=s.views,t.dataset.comments=s.comments,t.dataset.downloads=s.downloads,t.addEventListener("click",u),o.appendChild(t)})}function u(n){const o=document.getElementById("modal"),s=document.getElementById("modal-img"),t=document.getElementById("caption"),e=n.target;o.style.display="block",s.src=e.dataset.largeImage,t.textContent=`Likes: ${e.dataset.likes}, Views: ${e.dataset.views}, Comments: ${e.dataset.comments}, Downloads: ${e.dataset.downloads}`}const f=document.getElementById("search-form"),g=document.getElementById("search-input");f.addEventListener("submit",async n=>{n.preventDefault();const o=g.value.trim();if(o==="")i.warning({title:"Warning",message:"Please enter a search term."});else{const s=await d(o);m(s),new c(".simplelightbox a",{elements:".simplelightbox",closeText:"Закрыть",docClose:!0}).refresh()}});
//# sourceMappingURL=commonHelpers.js.map
