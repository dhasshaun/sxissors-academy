const h1 = document.querySelector(".heading-primary");




// h1.addEventListener("click", function () {
//   h1.textContent = "Dhas";
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
btnNavEl.addEventListener('click', function () {
	headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const href = link.getAttribute('href');
		// Scroll back to TOP
		if (href == '#') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
		// Scroll to other links
		else if (href !== '#' && href.startsWith('#')) {
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({
				behavior: 'smooth'
			});
		}
		// Close mobile navigation
		else if (link.classList.contains('main-nav-link')) {
			headerEl.classList.toggle('nav-open');
		} else {
			window.open(href, '_blank');
		}


	});
});
///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector('.section-hero');
const obs = new IntersectionObserver(function (entries) {
	const ent = entries[0];
	console.log(ent);
	if (ent.isIntersecting == false) {
		document.body.classList.add('sticky');
	}

	if (ent.isIntersecting == true) {
		document.body.classList.remove('sticky');
	}
}, {
	// In the viewport
	root: null,
	threshold: 0,
	rootMargin: '-80px'
});
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement("div");
	flex.style.display = "flex";
	flex.style.flexDirection = "column";
	flex.style.rowGap = "1px";

	flex.appendChild(document.createElement("div"));
	flex.appendChild(document.createElement("div"));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	console.log(isSupported);

	if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

$(document).ready(function () {
	$("#cta-form").submit(function (e) {
		e.preventDefault();
		var form = $(this);
		var formArr = form.serializeArray();
		var formData = {
			fullname: formArr[0].value,
			email: formArr[1].value,
			tel: formArr[2].value,
			address: formArr[3].value,
			course: formArr[4].value
		};
		$.ajax({
			url: "/registration",
			type: "post",
			contentType: "application/json",
			data: JSON.stringify(formData)
		}).done(function (resp) {
			document.getElementById("cta-form").reset();
			alert("ลงทะเบียนเสร็จสิ้น โปรดรอเจ้าหน้าจะติดต่อกลับหาท่าน");
		}).fail(function (err) {
			// failed please try again
			alert("ขอภัยพบข้อผิดพลาด โปรดลองอีกครั้ง");
		});
	});
});

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/