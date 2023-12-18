import ipads from '../assets/data/ipads.js' 
import navigations from '../assets/data/navigations.js' 

/* header > basket (dropdown) */
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function(e){
  e.stopPropagation(); 
  if(basketEl.classList.contains('show')){ // 해당 클레스가 있는지 확인
    // hide
    hideBasket();
  } else{
    // show
    showBasket();
  } 
});

basketEl.addEventListener('click', function(e){
  e.stopPropagation(); 
});

// 드롭다운 창 외 클릭시 닫힘
window.addEventListener('click', function(){
  // hide
  hideBasket();
});

function showBasket(){
  basketEl.classList.add('show');
}

function hideBasket(){
  basketEl.classList.remove('show');
}

/* search */
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('.menu > li')] // ... 전계연산자 (배열)
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloseEl = headerEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]; // 배열 전환

searchStarterEl.addEventListener('click', showSearch );
searchCloseEl.addEventListener('click', function(event){
  event.stopPropagation();
  hiedSearch();
} );
searchShadowEl.addEventListener('click', hiedSearch );

function showSearch(){
  headerEl.classList.add('searching');
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, idx){ // 순서 뒤집기
    el.style.transitionDelay = idx * .4 / headerMenuEls.length + 's';
  }); 

  // 검색창 효과
  searchDelayEls.forEach(function(el, idx) {
    el.style.transitionDelay = idx * .4 / searchDelayEls.length + 's';
  });

  // 검색창 포커스
  setTimeout(function(){
    searchInputEl.focus();
  },600);
  
}
function hiedSearch(){
  headerEl.classList.remove('searching');
  playScroll();
  headerMenuEls.reverse().forEach(function (el, idx){ // 순서 뒤집기
    el.style.transitionDelay = idx * .4 / headerMenuEls.length + 's';
  }); 

  // 검색창 효과
  searchDelayEls.reverse().forEach(function(el, idx) {
    el.style.transitionDelay = idx * .4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();

  // 검색창 내용 초기화
  searchInputEl.value = '';
}

function playScroll(){ // 스크롤 보이게
  document.documentElement.classList.remove('fixed'); // 문서의 최상위 속성 (html)
}

function stopScroll(){ // 스크롤 안보이게
  document.documentElement.classList.add('fixed'); // 문서의 최상위 속성 (html) 스크롤 바 고정
}

// header menu toggle
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click',function(){
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing');
    searchInputEl.value = ''; // 검색창 내용 초기화
    playScroll();
  } else{
    headerEl.classList.add('menuing');
    stopScroll();
  }
});

// header search
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCanceEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click', function(){
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});
searchCanceEl.addEventListener('click', function(){
  headerEl.classList.remove('searching--mobile');
});

// 화면 조정 시 검색 영역
window.addEventListener('resize', function(){
  if(window.innerWidth <= 740){
    headerEl.classList.remove('searching');
  } else{
    headerEl.classList.remove('searching--mobile');
  }
});


// nav
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', function(){
  if(navEl.classList.contains('menuing')){
    hideNavMenu()
  } else{
    showNavMenu();
  }
});

navEl.addEventListener('click', function(event){
  event.stopPropagation(); // 상위 개체까지 접근하지 않음
});
navMenuShadowEl.addEventListener('click', hideNavMenu);
window.addEventListener('click', hideNavMenu);

function showNavMenu(){
  navEl.classList.add('menuing');
}

function hideNavMenu(){
  navEl.classList.remove('menuing');
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries){
  entries.forEach(function (entry){
    if(!entry.isIntersecting){ // 안 보일 때 (화면에 보일 때만 동작)
      return;
    }
    entry.target.classList.add('show');
  });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el){
  io.observe(el);
});


/* 비디오 재생 */
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function(){
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function(){
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});

// 당신에게 맞는 아이패드는? 랜더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function(ipad){
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach(function(color){
    colorList += `<li style="background-color: ${color};"></li>`
  });

  // itemEl.textContent = ipad.name;
  itemEl.innerHTML = /* html */ `
    <div class="thumbail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">￦${ipad.price.toLocaleString('en-US')}</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  
  itemsEl.append(itemEl);
});

/* footer > navigations*/
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function(nav){
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  nav.maps.forEach(function(map){
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>
    `
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl);
});

// 년도 표시
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();

// footer acoodian
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function(el) {
  const h3El = el.querySelector('h3');
  h3El.addEventListener('click', function() {
    el.classList.toggle('active');
  });
});
