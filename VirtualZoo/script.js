/* -------------- DATA -------------- */
const DATA = {
  forest: [
    {
      id: "tiger",
      name: "Tiger",
      desc: "The tiger is a large carnivore native to Asian forests. It hunts deer and boar and is an apex predator in its habitat.",
      video: "videos/tiger_pyramid.mp4",
      narration: "videos/tiger_narration.mp3", // optional, put mp3 in videos/ if you have one
      quiz: [
        { q: "Where do Tigers mainly live?", options: ["Forest", "Desert", "Ocean"], answer: "Forest" },
        { q: "What is the Tiger's diet?", options: ["Carnivore", "Herbivore", "Omnivore"], answer: "Carnivore" }
      ]
    }
    // Add more animals...
  ],
  ocean: [
    {
      id: "shark",
      name: "Shark",
      desc: "Sharks are cartilaginous fishes, found in many oceans. They are predators and have keen senses.",
      video: "videos/placeholder.mp4",
      quiz: [
        { q: "Are Sharks mammals?", options: ["Yes", "No"], answer: "No" }
      ]
    }
  ],
  desert: [
    {
      id: "camel",
      name: "Camel",
      desc: "Camels are adapted to desert life and can go long periods without water.",
      video: "videos/placeholder.mp4",
      quiz: [
        { q: "What is the Camel often called?", options: ["Ship of the Desert", "River King"], answer: "Ship of the Desert" }
      ]
    }
  ],
  extinct: [
    {
      id: "dodo",
      name: "Dodo",
      desc: "The Dodo was a flightless bird that lived on Mauritius and became extinct in the 17th century.",
      video: "videos/placeholder.mp4",
      quiz: [
        { q: "Where did the Dodo live?", options: ["Mauritius", "Australia"], answer: "Mauritius" }
      ]
    }
  ]
};

/* -------------- UI BINDING -------------- */
const startBtn = document.getElementById('startBtn');
const heroExplore = document.getElementById('heroExplore');
const discover = document.getElementById('discover');
const exploreLinks = document.querySelectorAll('.explore-link');

const modal = document.getElementById('playerModal');
const closeModal = document.getElementById('closeModal');
const animalName = document.getElementById('animalName');
const animalDesc = document.getElementById('animalDesc');
const holoVideo = document.getElementById('holoVideo');
const playNarration = document.getElementById('playNarration');
const quizBtn = document.getElementById('quizBtn');
const quizArea = document.getElementById('quizArea');
const quizContainer = document.getElementById('quizContainer');
const submitQuiz = document.getElementById('submitQuiz');
const quizResult = document.getElementById('quizResult');

let current = null;
let narrationAudio = null;

/* scroll to discover */
startBtn.addEventListener('click', ()=> discover.scrollIntoView({behavior:'smooth'}));
heroExplore.addEventListener('click', ()=> discover.scrollIntoView({behavior:'smooth'}));

/* open ecosystem animals by clicking any 'Explore Animals' link */
exploreLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    const eco = e.currentTarget.getAttribute('data-ecosystem');
    openEcosystem(eco);
  });
});

/* open a small listing (simple prompt) then open first animal for demo */
function openEcosystem(eco){
  // Here we directly open the first animal in that ecosystem (demo): you can expand to show a list UI
  const list = DATA[eco];
  if(!list || list.length===0){ alert('No animals yet'); return; }
  openAnimal(list[0]);
}

function openAnimal(animal){
  current = animal;
  animalName.textContent = animal.name;
  animalDesc.textContent = animal.desc || '';
  holoVideo.src = animal.video || '';
  holoVideo.pause();
  holoVideo.load();
  quizArea.classList.add('hidden');
  quizContainer.innerHTML = '';
  quizResult.innerHTML = '';
  modal.classList.remove('hidden');
}

/* close modal */
closeModal.addEventListener('click', ()=> {
  modal.classList.add('hidden');
  holoVideo.pause();
  if(narrationAudio){ narrationAudio.pause(); narrationAudio.currentTime=0; }
});

/* play narration audio if available */
playNarration.addEventListener('click', ()=>{
  if(!current || !current.narration){ alert('Narration not available'); return; }
  if(!narrationAudio){ narrationAudio = new Audio(current.narration); }
  narrationAudio.play();
});

/* quiz show */
quizBtn.addEventListener('click', ()=>{
  if(!current || !current.quiz){ alert('No quiz for this animal'); return; }
  showQuiz(current.quiz);
});

function showQuiz(quiz){
  quizArea.classList.remove('hidden');
  quizContainer.innerHTML = '';
  quiz.forEach((item, idx) => {
    const block = document.createElement('div');
    block.className = 'quiz-block';
    let html = `<p class="q">${idx+1}. ${item.q}</p>`;
    html += '<div class="opts">';
    item.options.forEach(opt=>{
      html += `<label><input type="radio" name="q${idx}" value="${opt}"> ${opt}</label><br>`;
    });
    html += '</div>';
    block.innerHTML = html;
    quizContainer.appendChild(block);
  });
}

/* submit quiz */
submitQuiz.addEventListener('click', ()=>{
  if(!current || !current.quiz) return;
  let score = 0;
  const total = current.quiz.length;
  current.quiz.forEach((q, idx)=>{
    const sel = document.querySelector(`input[name="q${idx}"]:checked`);
    if(sel && sel.value === q.answer) score++;
  });
  quizResult.innerHTML = `<p>You scored <strong>${score}</strong> out of ${total}.</p>`;
});

/* basic keyboard close */
document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal.click(); });

/* initial placeholder: pre-load images if needed (not implemented) */
