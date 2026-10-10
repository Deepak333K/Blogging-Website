const stories = [
  { title: 'A morning with nowhere to be', category: 'Everyday life', date: 'October 07, 2026', read: '4 min read', image: 'photo-1445116572660-236099ec97a0', alt: 'A quiet cafe ready for the morning', excerpt: 'On leaving the calendar open and rediscovering the value of an unplanned morning.', paragraphs: ['For a long time, Sunday morning looked suspiciously like Monday morning with different socks. There were lists, little jobs, one very optimistic plan to get ahead.', 'Then I tried leaving the first few hours alone. No errands tucked into breakfast. No podcast filling the quiet. Just coffee, the open window, and the radical discovery that nothing caught fire when the laundry waited.', 'I still like a plan. I just leave one patch of the day unclaimed now, like a little garden that gets to grow however it likes.'] },
  { title: 'The sort of pasta you make twice', category: 'Food & drink', date: 'October 02, 2026', read: '5 min read', image: 'photo-1473093295043-cdd812d0e601', alt: 'A rustic bowl of fresh pasta', excerpt: 'A simple tomato and basil pasta made with seasonal ingredients and no exact measurements.', paragraphs: ['This starts with the tomatoes you bought for a salad and forgot about. The soft, wrinkly ones are the right ones. Put them in a pan with a good pour of olive oil and let them slowly turn into something you will want to put on everything.', 'Boil pasta in salty water. Crush the tomatoes gently with the back of a spoon, stir through torn basil, and bring everybody together in the pan. A splash of that pasta water is the bit that makes it feel like you knew what you were doing all along.', 'Eat out of the pan if it has been that kind of day. It keeps beautifully, though it has never once made it to tomorrow.'] },
  { title: 'An afternoon by the water', category: 'Travel', date: 'September 27, 2026', read: '6 min read', image: 'photo-1470770841072-f978cf4d019e', alt: 'A peaceful lake framed by mountains', excerpt: 'A slower route, a quiet shoreline, and a reminder to leave room for the unexpected.', paragraphs: ['The best part was the bit where we missed the turn. The road narrowed, the radio got fuzzy, and somebody in the back seat spotted a farm stand we would never have found with the map behaving itself.', 'We stopped beside the water with sandwiches wrapped in wax paper and watched the light make its slow way across the hills. Nobody asked what time it was until it was time to go.', 'It was not a grand adventure. It was close enough to be home by dinner. Still, on Monday, it was the first thing I thought about.'] },
  { title: 'Little things worth keeping', category: 'Culture', date: 'September 20, 2026', read: '3 min read', image: 'photo-1490750967868-88aa4486c946', alt: 'A loose bunch of flowers gathered in a glass vase', excerpt: 'A short, thoughtful collection of the small details that made the week memorable.', paragraphs: ['The neighbor who brought in the parcel. A bunch of tulips that flopped over in exactly the right way. Fresh sheets on a Tuesday, which feels like getting away with something.', 'The first bite of a peach eaten standing over the sink. A playlist from ten years ago that still knows every word. Texting a friend a photo with no particular reason attached.', 'Nothing earth-shattering. That is kind of the point. The little things are not a consolation prize; they are most of it.'] },
  { title: 'Make a corner of your home feel like you', category: 'Everyday life', date: 'September 13, 2026', read: '5 min read', image: 'photo-1616486338812-3dadae4b4ace', alt: 'A welcoming, sunlit living room with simple furnishings', excerpt: 'A few considered changes can make a well-used corner feel more personal and inviting.', paragraphs: ['You do not need a new room. You probably do not even need to buy anything. Start by noticing the spot where you already seem to end up: the end of the sofa, the corner beside the window, that chair with the good afternoon light.', 'Move the lamp closer. Bring over a book you are actually reading and the mug that makes your morning feel like yours. Clear one little surface and stop there.', 'A home is less something you finish and more a collection of places that welcome you back. One good corner counts.'] },
  { title: 'The little cake for a regular Tuesday', category: 'Food & drink', date: 'September 06, 2026', read: '4 min read', image: 'photo-1578985545062-69928b1d9587', alt: 'A simple homemade cake waiting to be shared', excerpt: 'A straightforward, fruit-topped cake that turns everyday ingredients into a simple pleasure.', paragraphs: ['There is a particular kind of freedom in baking a cake for no reason. No birthday, no guests, no need to make it perfect. Just you, a bowl, and the overripe fruit that has been asking for attention.', 'Stir together butter and sugar, add a couple of eggs, fold in flour and a pinch of salt. Scatter fruit over the top and let the oven take it from there. You know it is done when the kitchen smells like somebody is taking care of you.', 'Have a slice while it is still a little warm. Tomorrow it can be breakfast.'] }
];

const grid = document.querySelector('#post-grid');
const searchInput = document.querySelector('#post-search');
const filterButtons = [...document.querySelectorAll('.filter')];
const dialog = document.querySelector('#article-dialog');
let activeCategory = 'All';

function renderStories() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = stories.filter((story) => {
    const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
    const matchesQuery = `${story.title} ${story.category} ${story.excerpt}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (matches.length === 0) {
    grid.innerHTML = '<p class="empty-state">No stories match your search. Try another topic or keyword.</p>';
    return;
  }

  grid.innerHTML = matches.map((story) => `
    <article class="post-card">
      <button class="post-image-button" type="button" data-story="${story.title}" aria-label="Read: ${story.title}">
        <img src="https://images.unsplash.com/${story.image}?auto=format&amp;fit=crop&amp;w=760&amp;q=80" alt="${story.alt}" loading="lazy" />
        <span class="post-category">${story.category}</span>
      </button>
      <div class="post-meta"><span>${story.date}</span><span>${story.read}</span></div>
      <button class="post-title" type="button" data-story="${story.title}">${story.title}</button>
      <p class="post-excerpt">${story.excerpt}</p>
    </article>
  `).join('');
}

function openStory(story) {
  if (!story) return;
  document.querySelector('#dialog-image').src = `https://images.unsplash.com/${story.image}?auto=format&fit=crop&w=1200&q=85`;
  document.querySelector('#dialog-image').alt = story.alt;
  document.querySelector('#dialog-category').textContent = story.category;
  document.querySelector('#dialog-title').textContent = story.title;
  document.querySelector('#dialog-meta').textContent = `${story.date}  \u00b7  ${story.read}`;
  document.querySelector('#dialog-copy').innerHTML = story.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('');
  dialog.showModal();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    renderStories();
  });
});

searchInput.addEventListener('input', renderStories);
grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-story]');
  if (button) openStory(stories.find((story) => story.title === button.dataset.story));
});
document.querySelector('[data-featured-article]').addEventListener('click', () => openStory({
  title: 'Making room for an unhurried day', category: 'Everyday life', date: 'October 04, 2026', read: '6 min read', image: 'photo-1445116572660-236099ec97a0', alt: 'A sunlit neighborhood cafe',
  paragraphs: ['Somewhere between the errands and the to-do lists, we forgot that an afternoon can just be an afternoon. Not a chance to catch up. Not an opportunity to get ahead. Just a few hours that belong to nobody but you.', 'I used to think rest had to be earned. A clear inbox, a finished task list, a tidy kitchen. But somehow the list always grew faster than the time it took to finish it. There was always one more thing before I could sit down properly.', 'So this Sunday I made coffee and took it to the sunny patch by the window. I left my phone in the next room. The day did not become extraordinary. It became mine, which might be better.', 'If the week has been loud, you are allowed a little quiet. You are allowed to do less than you could. You do not have to make a case for the afternoon. Let it be an afternoon.']
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-address');
  if (!email.reportValidity()) return;
  document.querySelector('#form-message').textContent = 'Newsletter subscriptions are not connected yet.';
  email.value = '';
});

renderStories();
