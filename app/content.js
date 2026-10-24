// 21 days of lessons. Each day = 10 min Read + 10 min Write + 10 min Speak.
// Week 1: Me & my life (comfort zone). Week 2: The world around me.
// Week 3: Opinions & stories. Day 1 and Day 21 share a speaking prompt so
// learners can compare their first and last videos side by side.
window.CHALLENGE = [
  {
    theme: "Introducing yourself",
    read: {
      title: "First Impressions",
      text: "When we meet someone new, we usually share three things: our name, where we are from, and what we do. A good introduction is short and friendly. You do not need perfect grammar. People remember warmth more than vocabulary. Smile, make eye contact, and speak a little slower than feels natural. If you are nervous, take one deep breath before you start. Most listeners are not judging you. They are simply curious about who you are.",
      vocab: [["introduction", "the act of telling someone who you are"], ["warmth", "a friendly, kind feeling"], ["eye contact", "looking at someone's eyes while talking"], ["nervous", "worried or a little afraid"], ["curious", "wanting to know more"]],
      question: "According to the text, what do people remember more than vocabulary?"
    },
    write: "Write an introduction of yourself: your name, where you live, what you do, and one thing you enjoy. Aim for 60+ words.",
    speak: "Introduce yourself on camera in 1–2 minutes: your name, where you are from, what you do, and why you want to improve your English."
  },
  {
    theme: "My daily routine",
    read: {
      title: "A Day in the Life",
      text: "Maria wakes up at six o'clock every morning. First, she drinks a glass of water and stretches for five minutes. Then she makes tea and reads the news on her phone. At half past seven, she takes the bus to work. She usually listens to a podcast on the way. In the evening, she cooks dinner with her brother, and after that they often go for a short walk. Before bed, she writes three things she is grateful for in a small notebook.",
      vocab: [["routine", "things you do regularly in the same order"], ["stretch", "to make your body long to loosen muscles"], ["usually", "most of the time"], ["grateful", "thankful"], ["half past seven", "7:30"]],
      question: "What does Maria do before bed?"
    },
    write: "Describe your typical weekday from morning to night. Use words like first, then, after that, and finally.",
    speak: "Talk about your daily routine for 1–2 minutes. Try to use at least three time words (first, then, after that…)."
  },
  {
    theme: "Family & friends",
    read: {
      title: "The People Around Us",
      text: "Families come in many shapes. Some people live with parents, grandparents and cousins in one house. Others live alone and see their family only on holidays. Friends can feel like family too. A close friend is someone you can call at midnight when you have a problem. Research suggests that strong relationships make people healthier and happier. Even a short message to someone you care about can make both of you feel better.",
      vocab: [["relationship", "the connection between people"], ["close friend", "a friend you trust a lot"], ["research", "careful study to find facts"], ["suggest", "to show that something is probably true"], ["care about", "to feel that someone is important"]],
      question: "What does research suggest about strong relationships?"
    },
    write: "Describe one family member or friend who is important to you. What are they like, and why do they matter to you?",
    speak: "Describe a person you love: what they look like, their personality, and a memory you share."
  },
  {
    theme: "Food I love",
    read: {
      title: "Comfort Food",
      text: "Comfort food is the food that makes us feel safe and happy. For some people it is a bowl of hot soup. For others it is rice with lentils, fresh bread, or a sweet dessert their grandmother used to make. Comfort food is often connected to memories. The smell of a dish can take us back to childhood in a second. That is why many people cook their favourite meals when they feel homesick or tired.",
      vocab: [["comfort", "a feeling of being relaxed and safe"], ["dish", "a prepared meal"], ["connected to", "linked with"], ["homesick", "sad because you are far from home"], ["childhood", "the time when you were a child"]],
      question: "Why do people cook comfort food when they feel homesick?"
    },
    write: "Explain how to cook your favourite dish, step by step. Use imperative verbs: cut, add, mix, cook.",
    speak: "Describe your favourite food and teach the viewer how to make it, as if you are on a cooking show."
  },
  {
    theme: "My hometown",
    read: {
      title: "Where I Grew Up",
      text: "Every town has its own personality. Some are busy and noisy, with traffic and markets that never sleep. Others are quiet, with narrow streets and neighbours who know everyone's name. When people describe their hometown, they often talk about the weather, the food, and the places they visited as children. Even if a town is small, it can have a big place in our hearts.",
      vocab: [["hometown", "the town where you grew up"], ["personality", "the special character of a person or place"], ["narrow", "not wide"], ["neighbour", "a person who lives near you"], ["describe", "to say what something is like"]],
      question: "What three things do people often talk about when describing their hometown?"
    },
    write: "Write a short guide to your hometown for a tourist. What should they see, eat, and avoid?",
    speak: "Give a 2-minute 'video tour' of your hometown: the best places, the food, and what makes it special."
  },
  {
    theme: "Hobbies",
    read: {
      title: "Why Hobbies Matter",
      text: "A hobby is something we do for fun, not for money. It could be painting, playing cricket, gardening, or collecting old coins. Hobbies give our brains a rest from work and stress. They also help us meet people with the same interests. Many adults say they are too busy for hobbies, but even fifteen minutes a day can make a difference. Learning English can become a hobby too, if you make it enjoyable.",
      vocab: [["hobby", "an activity you do for pleasure"], ["interest", "something you like to learn or do"], ["stress", "pressure or worry"], ["enjoyable", "pleasant, fun"], ["make a difference", "to have a good effect"]],
      question: "How much time a day can make a difference, according to the text?"
    },
    write: "Write about a hobby you have or want to start. How did you discover it and why do you enjoy it?",
    speak: "Talk about your favourite hobby. Explain it to someone who has never tried it."
  },
  {
    theme: "Week 1 review",
    read: {
      title: "Small Steps",
      text: "You have finished your first week. That is a real achievement. Learning a language is not about one big jump. It is about many small steps, taken again and again. Some days you will feel fluent. Other days you will forget simple words. Both are normal. The most important thing is to keep showing up. Look back at your first video. Can you notice any changes in your confidence?",
      vocab: [["achievement", "something good you succeed in doing"], ["fluent", "able to speak easily and smoothly"], ["normal", "usual, expected"], ["show up", "to arrive, to be present"], ["confidence", "belief in yourself"]],
      question: "What does the text say is the most important thing?"
    },
    write: "Write a letter to yourself about week 1. What was easy? What was hard? What will you do better next week?",
    speak: "Retell your week in English: what you learned, what was difficult, and one goal for week 2."
  },
  {
    theme: "Shopping",
    read: {
      title: "At the Market",
      text: "\"How much is this?\" is one of the most useful questions in any language. At a market, prices are not always fixed. In many countries, buyers and sellers bargain politely until they agree. In a supermarket, you usually pay the price on the label. Online shopping is easy, but it is harder to check quality. Before buying, it is smart to compare prices and read reviews from other customers.",
      vocab: [["fixed", "not changing"], ["bargain", "to discuss a price to get it lower"], ["label", "a small paper with information on a product"], ["quality", "how good something is"], ["review", "an opinion written by a customer"]],
      question: "What is it smart to do before buying something?"
    },
    write: "Write a dialogue between a customer and a shopkeeper. The customer wants a discount.",
    speak: "Role-play: you are returning a broken product to a shop. Explain the problem and ask for a refund."
  },
  {
    theme: "Health & fitness",
    read: {
      title: "Move a Little Every Day",
      text: "Doctors agree that regular movement is good for both body and mind. You do not need an expensive gym. Walking for thirty minutes, climbing stairs, or dancing in your room all count. Sleep and water are just as important as exercise. Adults need around seven to nine hours of sleep. When we sleep well, we learn faster and remember more, including new English words.",
      vocab: [["regular", "happening often, at fixed times"], ["expensive", "costing a lot of money"], ["count", "to be accepted as valid"], ["exercise", "physical activity to stay healthy"], ["remember", "to keep in your mind"]],
      question: "How many hours of sleep do adults need, according to the text?"
    },
    write: "Write about your health habits. What is one healthy habit you have and one you want to build?",
    speak: "Give advice to a friend who wants to get healthier. Use 'You should…', 'Try to…', 'Don't…'."
  },
  {
    theme: "Travel",
    read: {
      title: "The Best Trip",
      text: "Travel teaches us things that books cannot. When we visit a new place, we taste new food, hear new languages, and see different ways of living. Travel does not have to be far or expensive. A day trip to a nearby village can be an adventure. The best travellers are curious and respectful. They ask questions, try local food, and learn a few words of the local language.",
      vocab: [["adventure", "an exciting experience"], ["nearby", "close, not far"], ["respectful", "showing care for others' feelings and customs"], ["local", "from the area"], ["traveller", "a person who travels"]],
      question: "What do the best travellers do, according to the text?"
    },
    write: "Describe the best trip you have ever taken (or a dream trip). Use the past tense for real trips.",
    speak: "Tell the story of a trip: where you went, who you went with, and the most memorable moment."
  },
  {
    theme: "Work & study",
    read: {
      title: "Dream Jobs",
      text: "If you ask children what they want to be, you hear answers like pilot, doctor, or footballer. Adults often choose jobs for practical reasons: salary, location, or family needs. But many people say the best job is one where you keep learning. Skills like communication, teamwork and English are useful in almost every career. Employers often say they hire for attitude and train for skill.",
      vocab: [["practical", "realistic and useful"], ["salary", "money you earn from a job"], ["career", "the jobs you do over your working life"], ["employer", "a person or company that gives you a job"], ["attitude", "the way you think and feel about something"]],
      question: "What skills does the text say are useful in almost every career?"
    },
    write: "Write about your job or studies. What do you do every day, and what do you like or dislike about it?",
    speak: "Answer this job interview question: 'Tell me about yourself and why you are a good fit for this role.'"
  },
  {
    theme: "Technology",
    read: {
      title: "Life With Phones",
      text: "Most of us check our phones more than fifty times a day. Phones help us talk to family, learn new skills, and find our way in new cities. But they can also steal our attention. Many people now try a 'digital detox', where they turn off notifications or leave their phone in another room for an hour. Technology is a tool. The question is whether we control it or it controls us.",
      vocab: [["attention", "focus; the act of noticing"], ["notification", "an alert on your phone"], ["detox", "a break from something harmful"], ["tool", "something that helps you do a job"], ["control", "to have power over"]],
      question: "What is a 'digital detox'?"
    },
    write: "Is technology making our lives better or worse? Give two reasons for your opinion.",
    speak: "Talk about one app or technology you could not live without, and explain why."
  },
  {
    theme: "Weather & seasons",
    read: {
      title: "Talking About the Weather",
      text: "In many English-speaking countries, the weather is the most common topic of small talk. \"Lovely day, isn't it?\" or \"It's freezing today!\" are easy ways to start a conversation with a stranger. Weather affects our mood, our clothes and our plans. Some people love the heat of summer, while others prefer cool, rainy days with a hot drink and a good book.",
      vocab: [["small talk", "light, polite conversation"], ["freezing", "very cold"], ["stranger", "a person you do not know"], ["affect", "to have an influence on"], ["mood", "the way you feel at a time"]],
      question: "Why is weather useful in conversation?"
    },
    write: "Describe your favourite season. What do you see, hear, eat, and do during that time of year?",
    speak: "Practise small talk: start a conversation with an imaginary neighbour about today's weather and keep it going for 1 minute."
  },
  {
    theme: "Week 2 review",
    read: {
      title: "Halfway There",
      text: "Two weeks done, one to go. By now, you have spoken English on camera at least thirteen times. That is more practice than many learners get in months. You may notice you pause less or use more linking words. Keep listening to yourself with kindness. Mistakes are proof that you are trying. Every fluent speaker you admire made thousands of mistakes before you heard them.",
      vocab: [["halfway", "in the middle"], ["pause", "to stop for a short time"], ["linking words", "words like 'and', 'but', 'because'"], ["proof", "evidence that something is true"], ["admire", "to respect and like someone"]],
      question: "What does the text say mistakes are proof of?"
    },
    write: "Compare your writing from Day 1 with today. Write about three things you do better now.",
    speak: "Speak for 2 minutes without stopping about anything you like. Try not to say 'umm'."
  },
  {
    theme: "Giving opinions",
    read: {
      title: "I Think, I Believe",
      text: "Giving an opinion in English is easier with a few simple phrases. 'I think…', 'In my opinion…', and 'I believe…' introduce your view. To sound balanced, you can add 'On the other hand…' or 'However…'. Always give a reason: 'because' is your best friend. People respect opinions that are clear, polite and supported by examples, even when they disagree.",
      vocab: [["opinion", "what you think about something"], ["balanced", "fair to both sides"], ["however", "a word used to show contrast"], ["support", "to give reasons or evidence for"], ["disagree", "to have a different opinion"]],
      question: "Which word does the text call 'your best friend' when giving an opinion?"
    },
    write: "Should students wear school uniforms? Write your opinion with two reasons and one 'on the other hand'.",
    speak: "Give your opinion: 'Is it better to live in a city or a village?' Use I think, because, and however."
  },
  {
    theme: "Telling a story",
    read: {
      title: "Once Upon a Time",
      text: "Good stories have a simple shape: a beginning, a problem, and an ending. Storytellers use words like 'suddenly', 'luckily' and 'in the end' to keep listeners interested. They also describe feelings: 'I was so scared' or 'We couldn't stop laughing.' When you tell a story in English, use the past tense and don't worry about every detail. Focus on the moment that surprised you.",
      vocab: [["storyteller", "a person who tells stories"], ["suddenly", "quickly and unexpectedly"], ["luckily", "fortunately"], ["in the end", "finally"], ["surprise", "something unexpected"]],
      question: "What simple shape do good stories have?"
    },
    write: "Write a short story about a time something unexpected happened to you. Use suddenly, luckily, and in the end.",
    speak: "Tell a funny or surprising story from your life in 2 minutes."
  },
  {
    theme: "Problems & solutions",
    read: {
      title: "Fixing Everyday Problems",
      text: "Life is full of small problems: a missed bus, a lost key, a broken phone screen. The way we talk about problems matters. Instead of only complaining, try to describe the problem, suggest a solution, and ask for help if you need it. Phrases like 'Could you help me with…?' and 'What if we tried…?' make conversations positive, even when things go wrong.",
      vocab: [["complain", "to say you are unhappy about something"], ["solution", "a way to fix a problem"], ["suggest", "to offer an idea"], ["positive", "hopeful, good"], ["go wrong", "to fail or have problems"]],
      question: "What three steps does the text suggest when talking about a problem?"
    },
    write: "Write an email to a landlord or manager describing a problem and suggesting a solution. Be polite.",
    speak: "Describe a problem in your city and suggest two solutions as if you are speaking to the mayor."
  },
  {
    theme: "Goals & dreams",
    read: {
      title: "Writing Down Your Goals",
      text: "People who write down their goals are more likely to achieve them. A good goal is specific: not 'speak better English', but 'have a 5-minute conversation with a customer in English by March'. Big dreams are important, but they become real through small daily actions. Ask yourself: what is one thing I can do today that brings me closer to my dream?",
      vocab: [["achieve", "to succeed in doing"], ["specific", "clear and exact"], ["likely", "probable"], ["daily", "every day"], ["closer", "nearer"]],
      question: "What makes a goal 'specific', according to the text?"
    },
    write: "Write three specific goals for the next 6 months, including one English goal.",
    speak: "Talk about your biggest dream. Use 'I want to…', 'I'm going to…', and 'I hope…'."
  },
  {
    theme: "Explaining something",
    read: {
      title: "Teach to Learn",
      text: "One of the best ways to learn is to teach. When you explain something to another person, you discover what you really understand and what you don't. Good explanations start simple, use examples, and check understanding: 'Does that make sense?' You can practise this in English by explaining how to do something you are good at, like riding a bike or making tea.",
      vocab: [["explain", "to make something clear"], ["discover", "to find out"], ["example", "a thing that shows what you mean"], ["understanding", "knowing what something means"], ["make sense", "to be clear and logical"]],
      question: "How do good explanations start?"
    },
    write: "Write clear instructions for something you are good at. Number your steps.",
    speak: "Teach the camera how to do something you are good at, in under 2 minutes. End with 'Does that make sense?'"
  },
  {
    theme: "Gratitude",
    read: {
      title: "Thank You",
      text: "Saying thank you is simple, but it is powerful. Grateful people often feel happier and sleep better. In English, there are many ways to say thanks: 'I really appreciate it', 'That's so kind of you', or 'I couldn't have done it without you'. Today, think of someone who helped you on your journey. They might not know how much their help meant to you.",
      vocab: [["powerful", "having a strong effect"], ["appreciate", "to be thankful for"], ["kind", "caring and helpful"], ["journey", "a long process or trip"], ["mean (to someone)", "to be important to someone"]],
      question: "Name two ways to say thanks from the text."
    },
    write: "Write a thank-you message to someone who helped you learn or grow.",
    speak: "Record a thank-you message to someone important to you. Tell them what they did and how it helped."
  },
  {
    theme: "Graduation day",
    read: {
      title: "Day 21",
      text: "Twenty-one days ago, you pressed record for the first time. Since then, you have read, written and spoken English every single day. Science says real habits can take longer than 21 days to become automatic, so think of today as a beginning, not an end. Watch your first video and your new video side by side. Notice how far you have come, and then decide: what is your next challenge?",
      vocab: [["automatic", "done without thinking"], ["beginning", "the start"], ["side by side", "next to each other"], ["notice", "to see or become aware of"], ["challenge", "a difficult task that tests you"]],
      question: "Why does the text call today 'a beginning, not an end'?"
    },
    write: "Write about your 21-day journey. How has your English and your confidence changed?",
    speak: "Introduce yourself on camera in 1–2 minutes: your name, where you are from, what you do, and why you want to improve your English. (Same as Day 1 — compare them!)"
  }
];
