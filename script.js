// Banco de dados inicial com publicações de famosos e do Jean
let posts = [
    {
        id: 1,
        author: "Cristiano Ronaldo",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
        time: "Há 1 hora",
        content: "Trabalho duro nunca para. Foco total nos próximos objetivos siuuuuu 💪⚽",
        // Imagem de atleta treinando em alta qualidade
        image: "http://googleusercontent.com/image_collection/image_retrieval/2842127064075907201_0",
        likes: 15420,
        isLiked: false,
        comments: [
            { author: "Carlos Silva", text: "Inspiração pura!" }
        ]
    },
    {
        id: 2,
        author: "Lionel Messi",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        time: "Há 3 horas",
        content: "Feliz por mais uma vitória com o time. Vamos seguir assim! 🇦🇷🏆",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600",
        likes: 12890,
        isLiked: false,
        comments: [
            { author: "Neymar Jr", text: "Joga demais, hermano! ⚽" }
        ]
    },
    {
        id: 3,
        author: "Neymar Jr",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
        time: "Há 5 horas",
        content: "Audácia e alegria de sempre em campo! 🤙🇧🇷 Prontos para o próximo desafio.",
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
        likes: 9840,
        isLiked: false,
        comments: [
            { author: "Lionel Messi", text: "Crack! 👏" }
        ]
    }
];

// Elementos do DOM
const postForm = document.getElementById('post-form');
const postText = document.getElementById('post-text');
const postImageUrl = document.getElementById('post-image-url');
const feedContainer = document.getElementById('feed-container');

// Função para renderizar todos os posts na tela
function renderFeed() {
    feedContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');

        // Monta o HTML interno do post
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}">
                <div class="post-user-info">
                    <h3>${post.author}</h3>
                    <span>${post.time}</span>
                </div>
            </div>
            <div class="post-body">
                <p>${post.content}</p>
                ${post.image ? `<div class="post-image-container"><img src="${post.image}" alt="Post image"></div>` : ''}
            </div>
            <div class="post-actions">
                <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <i class="${post.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i> 
                    <span>${post.likes} Curtidas</span>
                </button>
                <button class="action-btn">
                    <i class="fa-regular fa-comment"></i> 
                    <span>${post.comments.length} Comentários</span>
                </button>
            </div>
            <div class="comments-section">
                <div class="comments-list">
                    ${post.comments.map(c => `<div class="comment-item"><strong>${c.author}:</strong> ${c.text}</div>`).join('')}
                </div>
                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input type="text" placeholder="Escreva um comentário..." required>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        `;

        feedContainer.appendChild(postElement);
    });
}

// Criar nova publicação (como Jean)
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = postText.value.trim();
    const imageUrl = postImageUrl.value.trim();

    if (!text) return;

    const newPost = {
        id: Date.now(),
        author: "Jean",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        time: "Agora mesmo",
        content: text,
        image: imageUrl || null,
        likes: 0,
        isLiked: false,
        comments: []
    };

    posts.unshift(newPost);
    postForm.reset();
    renderFeed();
});

// Curtir / Descurtir post
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (post.isLiked) {
            post.likes--;
            post.isLiked = false;
        } else {
            post.likes++;
            post.isLiked = true;
        }
        renderFeed();
    }
}

// Adicionar comentário
function addComment(event, postId) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const commentText = input.value.trim();

    if (!commentText) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            author: "Jean",
            text: commentText
        });
        input.value = '';
        renderFeed();
    }
}

// Renderização inicial
renderFeed();