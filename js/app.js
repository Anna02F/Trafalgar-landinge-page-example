const carousel = document.querySelector(".carousel");
const slidesContainer = carousel.querySelector(".carousel_slides-container");
const slides = Array.from(slidesContainer.querySelectorAll(".carousel_slide"));

const previousButton = carousel.querySelector(".btn-arrow--left");
const nextButton = carousel.querySelector(".btn-arrow--right");

const dotsContainer = carousel.querySelector(".carousel_dots");
const dots = Array.from(dotsContainer.querySelectorAll(".carousel_dot"));

//find height for absolutely positioned slides
slides.forEach((slide) => {
    const slideHeight = getComputedStyle(slide).height;
    slidesContainer.style.height = slideHeight;
});

//Calculate carousel slides's width
const slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
});

//Next button

nextButton.addEventListener("click", (event) => {
    //Get currentSlide and nextSlide
    const currentSlide = slidesContainer.querySelector(".is-selected");
    const nextSlide = currentSlide.nextElementSibling;

    //Get correct left property
    const destination = getComputedStyle(nextSlide).left;
    slidesContainer.style.transform = `translatex(-${destination})`;

    //Update is-selected class
    currentSlide.classList.remove("is-selected");
    nextSlide.classList.add("is-selected");

    //Disable button for last slide

    if (!nextSlide.nextElementSibling) {
        nextButton.setAttribute("disabled", true);
    }

    //Remove disable from prev button
    previousButton.removeAttribute("disabled");

    //Update the dots
    const currentDot = dotsContainer.querySelector(".is-selected");
    const nextDot = currentDot.nextElementSibling;
    currentDot.classList.remove("is-selected");
    nextDot.classList.add("is-selected");
});

//Previous button

previousButton.addEventListener("click", (event) => {
    //Get currentSlide and previousSlide
    const currentSlide = slidesContainer.querySelector(".is-selected");
    const previousSlide = currentSlide.previousElementSibling;

    //Get correct left property
    const destination = getComputedStyle(previousSlide).left;
    slidesContainer.style.transform = `translatex(-${destination})`;

    //Update is-selected class
    currentSlide.classList.remove("is-selected");
    previousSlide.classList.add("is-selected");

    //Disable previous button for last slide
    if (!previousSlide.previousElementSibling) {
        previousButton.setAttribute("disabled", true);
    }

    //Remove disabled from next button
    nextButton.removeAttribute("disabled", true);
    console.log();

    //Update the dots clicking previous button

    const currentDot = dotsContainer.querySelector(".is-selected");
    const previousDot = currentDot.previousElementSibling;
    currentDot.classList.remove("is-selected");
    previousDot.classList.add("is-selected");
});

//Carousel Dots

dotsContainer.addEventListener("click", (event) => {
    const dot = event.target.closest(".carousel_dot");
    if (dot) {
        //Get the position for each dot
        let clickedDotIndex;
        for (let i = 0; i < dots.length; i++) {
            if (dots[i] === dot) {
                clickedDotIndex = i;
            }
        }

        //Get corresponding slide to clicked dot
        const slideToShow = slides[clickedDotIndex];

        //get the correct left property to show the slide

        const destination = getComputedStyle(slideToShow).left;
        slidesContainer.style.transform = `translatex(-${destination})`;

        //Update is-selected class
        const currentSlide = slidesContainer.querySelector(".is-selected");
        currentSlide.classList.remove("is-selected");
        slideToShow.classList.add("is-selected");

        //Update is-selected class for dots
        dots.forEach((d) => {
            d.classList.remove("is-selected");
        });
        dot.classList.add("is-selected");

        //Disabling first and last buttons when clicking the first and last buttons
        if (clickedDotIndex === 0) {
            previousButton.setAttribute("disabled", true);
            nextButton.removeAttribute("disabled");
        } else if (clickedDotIndex === dots.length - 1) {
            previousButton.removeAttribute("disabled");
            nextButton.setAttribute("disabled", true);
        } else {
            previousButton.removeAttribute("disabled");
            nextButton.removeAttribute("disabled");
        }
    }
});
