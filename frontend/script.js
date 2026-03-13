// recup offres 
fetch('http://localhost:3000/ads')
    .then(response => response.json())
    .then(ads => {
        const liste = document.querySelector('.liste-offres');
        liste.innerHTML = '';

        ads.forEach(ad => {
            liste.innerHTML += `
                <div class="offre">
                    <h2>${ad.job_title}</h2>
                    <p>${ad.short_desc}</p>
                    <button onclick="toggleDetails(this)">En savoir plus</button>
                    <div class="details" style="display:none">
                        <p><strong>Salaire :</strong> ${ad.salary}</p>
                        <p><strong>Lieu :</strong> ${ad.location}</p>
                        <p><strong>Description :</strong> ${ad.long_desc}</p>
                    </div>
                </div>
            `;
        });
    });

function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === "none") {
        details.style.display = "block";
        button.textContent = "Fermer";
    } else {
        details.style.display = "none";
        button.textContent = "En savoir plus";
    }
}