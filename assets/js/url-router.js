const urlPageTitle = "App SPA Router";


document.addEventListener("click", (e) => {
    const {target} = e;
    if(!target.matches('nav a')){
        return;
    }
    e.preventDefault();
    urlRoute();
})


const urlRoutes = {
    404 : {
        template : "/templates/404.html",
        title : "404 hatası başlık |" + urlPageTitle,
        description: "404 not found page"
    },
    "/" : {
        template : "/templates/index.html",
        title : "Homepage | " + urlPageTitle,
        description: "Homepage"

    },
    "/about": {
        template : "/templates/about.html",
        title : "About Us Page | " + urlPageTitle,
        description: "About-page"
        
        
        
    },
    "/contact": {
        template : "/templates/contact.html",
        title : "Content Page | " + urlPageTitle,
        description: "Contact-page"
    }



};


 const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();


}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if(location.length == 0){
        location = "/"
    }
    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name = "description"]').setAttribute("content",route.description);






};


window.onpopstate=urlLocationHandler;
window.route = urlRoute;


urlLocationHandler();