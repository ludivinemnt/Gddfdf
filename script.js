// script.js — interactions simples : injection du texte long, Q&A local (placeholder),
// et instructions console pour intégrer des images depuis un dépôt.

document.addEventListener('DOMContentLoaded', function() {
  // 1) Injection de l'argumentaire (≈500 mots) — en français
  const argumentaire = `
L’Angleterre est une destination qui allie un patrimoine historique exceptionnel, une scène culturelle vivante et une diversité de paysages accessible en quelques heures. Londres, capitale mondiale, concentre des siècles d’histoire : palais royaux, abbayes, musées de renommée internationale et monuments qui racontent l’épopée britannique. Mais l’Angleterre, ce n’est pas que Londres : de la côte crayeuse de Douvres aux landes du Lake District, en passant par les villes universitaires comme Oxford et Cambridge, chaque région présente une identité, des saveurs et des traditions propres. 

Le voyageur y trouve une offre culturelle incomparable — musées ouverts, théâtres du West End, festivals musicaux et expositions contemporaines — souvent accessibles sans rupture budgétaire grâce à des musées nationaux à entrée gratuite. La gastronomie anglaise a évolué : des marchés de producteurs aux tables étoilées, on peut goûter aux influences du monde entier tout en dégustant des classiques locaux. 

Côté accueil et logistique, l’Angleterre dispose d’un réseau de transports efficace : trains rapides entre les grandes villes, métros et bus pour circuler en ville, et liaisons internationales (Eurostar) qui facilitent un séjour sans stress. L’anglais, langue internationale, rend la communication simple pour la plupart des visiteurs. 

Enfin, l’Angleterre séduit aussi par son atmosphère : pubs chaleureux où se mêlent locaux et voyageurs, jardins royaux paisibles, et une capacité à conjuguer modernité et héritage historique. Pour un premier séjour ou un retour, le pays offre toujours des surprises — qu’il s’agisse d’un marché local, d’une galerie réouverte après rénovation, ou d’un festival de quartier — rendant chaque visite unique et mémorable.
  `.trim();

  document.getElementById('argumentaire-placeholder').innerText = argumentaire;

  // 2) Q&A local (stocké en mémoire locale du navigateur)
  const form = document.getElementById('qa-form');
  const nameEl = document.getElementById('q-name');
  const emailEl = document.getElementById('q-email');
  const textEl = document.getElementById('q-text');
  const status = document.getElementById('q-status');
  const qaList = document.getElementById('qa-list');

  // load existing questions from localStorage
  function loadQuestions(){
    const data = JSON.parse(localStorage.getItem('site_qa') || '[]');
    qaList.innerHTML = '';
    if(data.length === 0){
      qaList.innerHTML = '<p class="hint">Aucune question pour l’instant.</p>';
      return;
    }
    data.reverse().forEach(q => {
      const div = document.createElement('div');
      div.className = 'card';
      div.style.padding = '12px';
      div.innerHTML = `<strong>${escapeHtml(q.name)}</strong> <small>(${escapeHtml(q.email)})</small><p>${escapeHtml(q.text)}</p>`;
      qaList.appendChild(div);
    });
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]}); }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const text = textEl.value.trim();
    if(!name || !email || !text){ status.innerText = 'Merci de remplir tous les champs.'; return; }
    const arr = JSON.parse(localStorage.getItem('site_qa') || '[]');
    arr.push({name, email, text, date: new Date().toISOString()});
    localStorage.setItem('site_qa', JSON.stringify(arr));
    status.innerText = 'Question envoyée — merci ! (stockée localement)';
    nameEl.value = emailEl.value = textEl.value = '';
    loadQuestions();
    setTimeout(()=> status.innerText = '', 4000);
  });

  loadQuestions();

  // 3) console help : comment remplacer les images depuis un dépôt GitHub ou URL
  console.info("INSTRUCTIONS => Pour remplacer les images placeholders :");
  console.info("- Héberge tes images sur un dépôt GitHub (raw URL) ou tout CDN.");
  console.info("- Remplace les src des <img> dans la section #photos par l'URL directe.");
  console.info("- Exemple : document.querySelector('.photo-grid img').src = 'https://raw.githubusercontent.com/TONREPO/IMAGES/main/tower.jpg'");

});
