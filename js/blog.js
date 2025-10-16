// fetch(
//   "https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=4&_embed"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     // Use data to populate the latest-blog div
//     const latestBlogDiv = document.querySelector(".latest-blog");

//     // Render each blog post
//     data.forEach((post) => {
//       // Get the featured image URL
//       const featuredImageURL =
//         post._embedded["wp:featuredmedia"][0].source_url;

//       // Render the blog post title, excerpt, and featured image
//       const blogPostHTML = `
//   <div class="blog-post">
//     <h2>${post.title.rendered}</h2>
//     <a href="${post.link}">
//       <img src="${featuredImageURL}" alt="${post.title.rendered}">
//     </a>
//   </div>
// `;
//       latestBlogDiv.insertAdjacentHTML("beforeend", blogPostHTML);
//     });
//   })
//   .catch((error) => console.error(error));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=3&_embed")
//   .then((response) => response.json())
//   .then((data) => {
//     const latestBlogDiv = document.querySelector(".latest-blog");

//     data.forEach((post) => {
//       const featuredImageURL = post._embedded["wp:featuredmedia"][0].source_url;

//       let postName = post.title.rendered.length > 45 ? post.title.rendered.substr(0, 45) + '...' : post.title.rendered;


//       const blogPostHTML = `
//       <div class="col-md-4 blog-post">
//         <h2 class="section-text text-left mt-20 mt-xs-30">${postName}</h2>
//           <a href="${post.link}">
//             <img src="${featuredImageURL}" alt="${postName}">
//           </a>
//       </div>
//       `;
//       latestBlogDiv.insertAdjacentHTML("beforeend", blogPostHTML);
//     });
//   })
//   .catch((error) => console.error(error));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=3&_embed")
//   .then((response) => response.json())
//   .then((data) => {
//     const latestBlogDiv = document.querySelector(".latest-blog");

//     data.forEach((post) => {
//       let postName = post.title.rendered.length > 45 ? post.title.rendered.substr(0, 45) + '...' : post.title.rendered;

//       const featuredImageURL = post._embedded["wp:featuredmedia"] ? post._embedded["wp:featuredmedia"][0].source_url : '';

//       const blogPostHTML = `
//         <div class="col-md-4 blog-post">
//           <h2 class="hs-line-3 text-left mb-20 mb-xs-30">${postName}</h2>
//           <a href="${post.link}">
//             ${featuredImageURL ? `<img src="${featuredImageURL}" alt="${postName}">` : ''}
//           </a>
//         </div>
//       `;
//       latestBlogDiv.insertAdjacentHTML("beforeend", blogPostHTML);
//     });
//   })
//   .catch((error) => console.error(error));

// fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=3&_embed")
//   .then((response) => response.json())
//   .then((data) => {
//     const latestBlogDiv = document.querySelector(".latest-blog");

//     data.forEach((post) => {
//       let postName = post.title.rendered.length > 45 ? post.title.rendered.substr(0, 45) + '...' : post.title.rendered;

//       let featuredImageURL = '';

//       if (post._embedded["wp:featuredmedia"]) {
//         featuredImageURL = post._embedded["wp:featuredmedia"][0].source_url;
//       } else if (post._attachments && post._attachments.length > 0) {
//         const attachment = post._attachments[0];
//         featuredImageURL = attachment.source_url;
//       }

//       const blogPostHTML = `
//         <div class="col-md-4 blog-post">
//           <h2 class="hs-line-3 text-left mb-20 mb-xs-30">${postName}</h2>
//           <a href="${post.link}">
//             ${featuredImageURL ? `<img src="${featuredImageURL}" alt="${postName}">` : ''}
//           </a>
//         </div>
//       `;
//       latestBlogDiv.insertAdjacentHTML("beforeend", blogPostHTML);
//     });
//   })
//   .catch((error) => console.error(error));


//const latestBlogContainer = document.getElementById("latestBlogContainer");
const getData = async() => {
  const response = await fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=3&_embed");
  const data = await response.json();
  console.log('data', data);
  const recentBlogsData = [];
   data.forEach((post) => {
      const postTitle = post.title.rendered.length > 45 
        ? post.title.rendered.substr(0, 60) + '...' 
        : post.title.rendered;
      
      const featuredImageURL = post._embedded["wp:featuredmedia"][0].source_url;
      const postDate = new Date(post.date);
      const formattedDate = postDate.toLocaleString('en-US', { month: 'short', day: '2-digit' , year: 'numeric'});

      const blogObject = {
        postLink: post.link,
        featuredImageURL: featuredImageURL,
        postTitle: postTitle,
        formattedDate: formattedDate,
        originalTitle: post.title.rendered
      };

      // Push the object to the array
      recentBlogsData.push(blogObject);

      const blogPostHTML = `
        <div class="col-12 col-lg-4 mb-3">
          <div class="circleSection">
            <div class="circle-container">
              <div class="rotating-circle"></div>
              <div class="main-image">
                <a href="${post.link}" target="_blank">
                  <img src="${featuredImageURL}" alt="${postTitle}">
                </a>
              </div>
              <div class="date-circle">
                <span>${formattedDate.split(" ")[0]}</span>
                <span>${formattedDate.split(" ")[1]}</span>
              </div>
            </div>
          </div>
          <p class="blog-paragraph">${postTitle}</p>
        </div>
      `;

      
    });
    //latestBlogContainer.insertAdjacentHTML("beforeend", blogPostHTML);
    localStorage.setItem('recentBlogsData', JSON.stringify(recentBlogsData));
  return data;
}

getData()


// fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=3&_embed")
//   .then((response) => response.json())
//   .then((data) => {
//     const latestBlogContainer = document.getElementById("latestBlogContainer");
    


//     // Prepare an array to store in localStorage
//     const recentBlogsData = [];

//     data.forEach((post) => {
//       const postTitle = post.title.rendered.length > 45 
//         ? post.title.rendered.substr(0, 60) + '...' 
//         : post.title.rendered;
      
//       const featuredImageURL = post._embedded["wp:featuredmedia"][0].source_url;
//       const postDate = new Date(post.date);
//       const formattedDate = postDate.toLocaleString('en-US', { month: 'short', day: '2-digit' , year: 'numeric'});

//       const blogObject = {
//         postLink: post.link,
//         featuredImageURL: featuredImageURL,
//         postTitle: postTitle,
//         formattedDate: formattedDate,
//         originalTitle: post.title.rendered
//       };

//       // Push the object to the array
//       recentBlogsData.push(blogObject);

//       const blogPostHTML = `
//         <div class="col-12 col-lg-4 mb-3">
//           <div class="circleSection">
//             <div class="circle-container">
//               <div class="rotating-circle"></div>
//               <div class="main-image">
//                 <a href="${post.link}" target="_blank">
//                   <img src="${featuredImageURL}" alt="${postTitle}">
//                 </a>
//               </div>
//               <div class="date-circle">
//                 <span>${formattedDate.split(" ")[0]}</span>
//                 <span>${formattedDate.split(" ")[1]}</span>
//               </div>
//             </div>
//           </div>
//           <p class="blog-paragraph">${postTitle}</p>
//         </div>
//       `;

//       latestBlogContainer.insertAdjacentHTML("beforeend", blogPostHTML);
//     });

//     // Save the blog links to localStorage
    
//     localStorage.setItem('recentBlogsData', JSON.stringify(recentBlogsData));
//   })
//   .catch((error) => console.error("Error fetching blog posts:", error));



  $(document).ready(function () {
    var testimonialCarousel = document.querySelector("#testimonialCarousel");
    
    if (window.matchMedia("(min-width: 576px)").matches) {
        // Desktop view - custom multi-card carousel
        var carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: false
        });

        var carouselInner = $(".carousel-inner");
        var carouselWidth = carouselInner[0].scrollWidth;
        var cardWidth = $(".carousel-item").width();
        var scrollPosition = 0;
        var maxScrollPosition = carouselWidth - (cardWidth * 3);
        var totalItems = $(".carousel-item").length;
        var visibleItems = 3;

        // Duplicate items for infinite scroll effect
        var clonedItems = $(".carousel-item").clone(true);
        carouselInner.append(clonedItems);
        
        // Update carouselWidth after adding cloned items
        carouselWidth = carouselInner[0].scrollWidth;
        maxScrollPosition = carouselWidth / 2 - (cardWidth * 3);

        function handleNextClick() {
            scrollPosition += cardWidth;
            
            // Check if we need to loop
            if (scrollPosition >= carouselWidth / 2) {
                // Jump to the beginning without animation
                carouselInner.scrollLeft(0);
                scrollPosition = cardWidth;
            }
            
            carouselInner.animate(
                { scrollLeft: scrollPosition },
                400
            );
        }

        function handlePrevClick() {
            scrollPosition -= cardWidth;
            
            // Check if we need to loop
            if (scrollPosition < 0) {
                // Jump to the end without animation
                carouselInner.scrollLeft(carouselWidth / 2 - cardWidth);
                scrollPosition = carouselWidth / 2 - (cardWidth * 2);
            }
            
            carouselInner.animate(
                { scrollLeft: scrollPosition },
                400
            );
        }

        // Auto-play functionality
        var autoPlayInterval = setInterval(handleNextClick, 9000);
        
        // Pause on hover
        $(".testimonial-slider").hover(
            function() { clearInterval(autoPlayInterval); },
            // function() { autoPlayInterval = setInterval(handleNextClick, 9000); }
        );

        // Use custom arrow navigation buttons
        $("#nextArrow").on("click", function () {
            clearInterval(autoPlayInterval);
            handleNextClick();
            // autoPlayInterval = setInterval(handleNextClick, 9000);
        });

        $("#prevArrow").on("click", function () {
            clearInterval(autoPlayInterval);
            handlePrevClick();
            // autoPlayInterval = setInterval(handleNextClick, 9000);
        });

    } else {
        // Mobile view - default Bootstrap carousel
        $(testimonialCarousel).addClass("slide");
        var carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 9000,
            wrap: true
        });
        
        // Use custom arrow navigation buttons for mobile too
        $("#nextArrow").on("click", function () {
            carousel.next();
        });

        $("#prevArrow").on("click", function () {
            carousel.prev();
        });
    }
});


// const sectors = [
//   'oil-gas-and-power',
//   'banking-financial-services-and-insurance',
//   'homeland-security-and-defense',
//   'transport-and-logistics',
//   'telecom',
//   'healthcare',
//   'agriculture',
//   'education',
//   'critical-it-and-urban-infrastructure',
//   'solid-waste-management',
//   'capacity-building-and-skill-development'
// ];

// fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=100&_embed")
//   .then((response) => response.json())
//   .then((blogs) => {
//     sectors.forEach((sector) => {
//       const sectorBlogs = blogs
//         .filter(post => post?.acf?.sector_slug === sector)
//         .sort((a, b) => new Date(b.date) - new Date(a.date))
//         .slice(0, 2)
//         .map((post) => ({
//           postLink: post.link,
//           featuredImageURL: post._embedded["wp:featuredmedia"]?.[0]?.source_url || '',
//           postTitle: post.title.rendered,
//           postExcerpt: post.excerpt.rendered?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
//         }));

//       localStorage.setItem(sector, JSON.stringify(sectorBlogs));
//     });

//     console.log("✅ Blogs stored in localStorage by sector");
//   })
//   .catch((err) => console.error("Error fetching blogs:", err));


// const sectors = [
//   'oil-gas-and-power',
//   'banking-financial-services-and-insurance',
//   'homeland-security-and-defense',
//   'transport-and-logistics',
//   'telecom',
//   'healthcare',
//   'agriculture',
//   'education',
//   'critical-it-and-urban-infrastructure',
//   'solid-waste-management',
//   'capacity-building-and-skill-development'
// ];

// const sectorKeywords = {
//   'oil-gas-and-power': ['oil', 'gas', 'energy', 'power'],
//   'banking-financial-services-and-insurance': ['bank', 'finance', 'insurance'],
//   'homeland-security-and-defense': ['security', 'defense', 'border'],
//   'transport-and-logistics': ['transport', 'logistics', 'shipping'],
//   'telecom': ['telecom', 'telecommunication'],
//   'healthcare': ['health', 'hospital', 'care'],
//   'agriculture': ['agriculture', 'farming', 'crop'],
//   'education': ['education', 'learning', 'school'],
//   'critical-it-and-urban-infrastructure': ['IT', 'infrastructure', 'urban'],
//   'solid-waste-management': ['waste', 'garbage', 'sanitation'],
//   'capacity-building-and-skill-development': ['skill', 'training', 'capacity']
// };

// async function fetchAndCategorizeBlogs() {
//   try {
//     const response = await fetch("https://blog.scstechindia.com/wp-json/wp/v2/posts?per_page=100&_embed");
//     const posts = await response.json();

//     const allBlogs = posts.map(post => {
//       const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
//       return {
//         postLink: post.link,
//         featuredImageURL: featuredImage,
//         postTitle: post.title.rendered.length > 60 ? post.title.rendered.slice(0, 60) + '...' : post.title.rendered,
//         originalTitle: post.title.rendered,
//         description: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
//         publishedAt: post.date
//       };
//     });

//     // Save all blogs for main listing (skip first 3)
//     localStorage.setItem("allBlogsData", JSON.stringify(allBlogs.slice(3)));

//     // Categorize and store sector-specific blogs
//     sectors.forEach(sector => {
//       const keywords = sectorKeywords[sector] || [];
//       const filtered = allBlogs.filter(blog => {
//         const content = `${blog.originalTitle} ${blog.description}`.toLowerCase();
//         return keywords.some(keyword => content.includes(keyword));
//       }).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 2);

//       localStorage.setItem(sector, JSON.stringify(filtered));
//     });

//     console.log("✅ Blogs stored in localStorage by sector.");
//   } catch (err) {
//     console.error("❌ Error fetching or processing blogs:", err);
//   }
// }

// // Call on load
// fetchAndCategorizeBlogs();

