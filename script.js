// Hovedseksjon-navigasjon
const mainSections = document.querySelectorAll('.section-content');
const topLinks = document.querySelectorAll('.top-link');
const subnav = document.getElementById('subnav');

const submenus = {
  home: [],
  reise: [],
  bodycare: [
    { id: 'facecare', label: 'Facecare routine' },
    { id: 'haircare', label: 'Haircare routine' },
    { id: 'skincare', label: 'Skincare' }
  ],
  studie: [
    { id: 'studie-main', label: 'Studieplan' },
    { id: 'colleges', label: 'Colleges' }
  ]
};

topLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    mainSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    updateSubnav(targetId);
    if (targetId === 'studie') aktiverStudievei();
  });
});

function updateSubnav(sectionId) {
  subnav.innerHTML = '';
  const subs = submenus[sectionId];
  if (subs && subs.length > 0) {
    const title = document.createElement('h2');
    title.textContent = 'Underkategorier';
    subnav.appendChild(title);

    subs.forEach(sub => {
      const a = document.createElement('a');
      a.href = `#${sub.id}`;
      a.className = 'button-link';
      a.textContent = sub.label;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.getElementById(sub.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
      subnav.appendChild(a);
    });
  }
}

document.getElementById('home').classList.add('active');

function aktiverStudievei() {
  const allSteps = document.querySelectorAll('#studievei .step');
  const pin = document.getElementById('pin');
  const innlegg = document.querySelectorAll('.oppgave-innlegg');
  const studievei = document.getElementById('studievei');

  const aktiveSteg = Array.from(allSteps).filter(step => {
    const id = step.getAttribute('data-id');
    const entry = document.getElementById(id);
    return entry && entry.innerText.trim().length > 0;
  });

  allSteps.forEach(step => {
    const id = step.getAttribute('data-id');
    const entry = document.getElementById(id);
    if (!entry || entry.innerText.trim().length === 0) {
      step.style.display = 'none';
    }
  });

  if (aktiveSteg.length > 0) {
    studievei.style.display = 'flex';

    aktiveSteg.forEach((step, index) => {
      const id = step.getAttribute('data-id');
      const entry = document.getElementById(id);

      step.addEventListener('click', () => {
        aktiveSteg.forEach(s => s.classList.remove('done'));
        for (let i = 0; i <= index; i++) {
          aktiveSteg[i].classList.add('done');
        }

        const stepWidth = step.offsetWidth;
        pin.style.left = `${step.offsetLeft + stepWidth / 2 - 12}px`;

        innlegg.forEach(div => div.style.display = 'none');
        if (entry) entry.style.display = 'block';
      });
    });

    const første = aktiveSteg[0];
    const førsteId = første.getAttribute('data-id');
    const førsteEntry = document.getElementById(førsteId);
    const førsteWidth = første.offsetWidth;
    pin.style.left = `${første.offsetLeft + førsteWidth / 2 - 12}px`;

    if (førsteEntry) førsteEntry.style.display = 'block';

  } else {
    studievei.style.display = 'none';
    pin.style.left = '0px';
  }
}

// Redigeringsfunksjon fra knappen
function visRedigering(id) {
  document.querySelectorAll('.section-content').forEach(el => el.classList.remove('active'));
  const rediger = document.getElementById('rediger');
  rediger.style.display = 'block';
  rediger.classList.add('active');

  document.getElementById('valg').value = id;
  const target = document.getElementById(id);
  const textarea = document.getElementById('innhold');
  const bilde = document.getElementById('bilde');

  textarea.value = target ? target.querySelector('p')?.innerHTML || '' : '';
  bilde.value = target.querySelector('img')?.src || '';
}

// Lagring av redigert innhold
const form = document.getElementById('redigerForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('valg').value;
    const innhold = document.getElementById('innhold').value;
    const bildeURL = document.getElementById('bilde').value;
    const target = document.getElementById(id);

    let html = `<p>${innhold}</p>`;
    if (bildeURL.trim() !== '') {
      html += `<img src="${bildeURL}" alt="Bilde til ${id}" style="max-width:100%; margin-top:10px;">`;
    }
    html += `<button onclick="visRedigering('${id}')">Rediger</button>`;
    target.innerHTML = html;

    alert("Innlegg lagret!");
  });
}
