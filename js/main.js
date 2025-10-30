// Moved from scripts/main.js
// Data
const projects = [
  {
    title: 'Cinematic Landing Page',
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1600&auto=format&fit=crop',
    description: 'Hero-driven landing with parallax layers, motion transitions, and responsive grid.',
    url: '#'
  },
  {
    title: 'Portfolio Grid',
    image: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?q=80&w=1600&auto=format&fit=crop',
    description: 'Masonry-like gallery with hover reveals and smooth filtering interactions.',
    url: '#'
  },
  {
    title: 'Product Showcase',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    description: 'Modern product page with spotlight effects, micro-interactions, and CTA flows.',
    url: '#'
  },
  {
    title: 'Interactive Dashboard',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    description: 'Clean data visuals, animated cards, and modular widgets.',
    url: '#'
  }
]

const skills = [
  { name: 'HTML', iconClass: 'devicon-html5-plain colored' },
  { name: 'CSS', iconClass: 'devicon-css3-plain colored' },
  { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
  { name: 'React', iconClass: 'devicon-react-original colored' },
  { name: 'Bootstrap', iconClass: 'devicon-bootstrap-plain colored' },
  { name: 'Node.js', iconClass: 'devicon-nodejs-plain colored' }
]

// Helpers
function $(sel, ctx = document) { return ctx.querySelector(sel) }
function $all(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)) }

// Year in footer
$('#year').textContent = new Date().getFullYear()

// Render Projects
const projectsGrid = $('#projectsGrid')
projectsGrid.innerHTML = projects.map((p) => `
  <div class="col-md-6 col-lg-6">
    <article class="neo-card p-3 p-md-4 neo-hover project-card h-100 reveal">
      <div class="project-thumb mb-3">
        <img src="${p.image}" class="img-fluid" alt="${p.title}">
      </div>
      <h5 class="fw-semibold">${p.title}</h5>
      <p class="text-white-50 mb-3">${p.description}</p>
      <a class="btn btn-outline-accent" href="${p.url}" target="_blank" rel="noreferrer">View Project</a>
    </article>
  </div>
`).join('')

// Render Skills
const skillsGrid = $('#skillsGrid')
skillsGrid.innerHTML = skills.map((s) => `
  <div class="col-6 col-sm-4 col-md-4 col-lg-2">
    <div class="neo-card text-center p-4 neo-hover reveal">
      <i class="${s.iconClass}" style="font-size:36px"></i>
      <div class="mt-2 text-white-50 fw-medium">${s.name}</div>
    </div>
  </div>
`).join('')

// Simple reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show')
  })
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' })

$all('.fade-up, .reveal').forEach((el) => {
  const delay = parseFloat(el.getAttribute('data-delay') || '0')
  if (delay) el.style.transitionDelay = `${delay}s`
  io.observe(el)
})

// Subtle parallax for hero grid
const heroGrid = $('#heroGrid')
let lastX = 0, lastY = 0
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2
  lastX += (x - lastX) * 0.05
  lastY += (y - lastY) * 0.05
  if (heroGrid) heroGrid.style.transform = `perspective(1000px) rotateX(${60 + lastY * 3}deg) translateX(${lastX * 6}px)`
})

// Smooth anchor scrolling
$all('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href')
    if (href.length > 1) {
      e.preventDefault()
      const target = $(href)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// EmailJS
const EMAILJS_SERVICE_ID = ''
const EMAILJS_TEMPLATE_ID = ''
const EMAILJS_PUBLIC_KEY = ''

if (window.emailjs && EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

const form = $('#contactForm')
const sendBtn = $('#sendBtn')
const formStatus = $('#formStatus')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!window.emailjs || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    formStatus.className = 'text-danger'
    formStatus.textContent = 'EmailJS keys missing. Update js/main.js.'
    return
  }
  sendBtn.disabled = true
  sendBtn.textContent = 'Sending…'
  formStatus.className = 'text-white-50'
  formStatus.textContent = ''
  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    form.reset()
    formStatus.className = 'text-success'
    formStatus.textContent = 'Message sent successfully. I will reply soon!'
  } catch (err) {
    formStatus.className = 'text-danger'
    formStatus.textContent = 'Something went wrong. Please try again later.'
  } finally {
    sendBtn.disabled = false
    sendBtn.textContent = 'Send Message'
  }
})


