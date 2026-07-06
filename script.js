const input = document.getElementById('captcha-answer');
const submitButton = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const gate = document.getElementById('gate-screen');
const access = document.getElementById('access-screen');
const main = document.getElementById('main-site');

/* Hide error when typing */
input.addEventListener('input', () => {
    errorMessage.style.display = "none";
});

/* Enter key submits */
input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        submitButton.click();
    }
});

/* Animate dots one-by-one */
function animateDots(containerId) {
    const dots = document.querySelectorAll(`#${containerId} .loading-dot`);
    let index = 0;

    const interval = setInterval(() => {
        if (index < dots.length) {
            dots[index].style.opacity = "1";   // turn dot ON
            index++;
        } else {
            clearInterval(interval);
        }
    }, 120); // smooth timing
}

/* Submit logic */
submitButton.addEventListener('click', function() {

    const answer = input.value.trim();

    if (answer !== "2") {
        errorMessage.style.display = "block";
        input.classList.add("shake");
        setTimeout(() => input.classList.remove("shake"), 300);
        return;
    }

    /* Correct answer */
    errorMessage.style.display = "none";

    /* Fade out gate */
    gate.style.opacity = "0";

    setTimeout(() => {
        gate.style.display = "none";

        /* Show access screen */
        access.style.display = "block";
        access.style.opacity = "1";

        /* STAGE 1 — ACCESS GRANTED */
        setTimeout(() => {
            document.getElementById('line1').style.opacity = "1";
            document.getElementById('dots1').style.opacity = "1";
            animateDots("dots1");
        }, 500);

        /* STAGE 2 — VERIFYING IDENTITY */
        setTimeout(() => {
            document.getElementById('line2').style.opacity = "1";
            document.getElementById('dots2').style.opacity = "1";
            animateDots("dots2");
        }, 1500);

        /* STAGE 3 — LOADING PORTFOLIO */
        setTimeout(() => {
            document.getElementById('line3').style.opacity = "1";
            document.getElementById('dots3').style.opacity = "1";
            animateDots("dots3");
        }, 2500);

        /* After sequence → show main site */
        setTimeout(() => {
            access.style.opacity = "0";

            setTimeout(() => {
                access.style.display = "none";
                main.style.display = "block";
                main.style.opacity = "1";
            }, 1200);

        }, 4500);

    }, 1200);
});


/* ============================
   TAB SYSTEM (NAVIGATION)
   ============================ */

const tabs = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".tab-section");

tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();

        const target = tab.getAttribute("href").replace("#", "");

        sections.forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
    });
});
