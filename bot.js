// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var request = require('request');

var affirmations = [
    "You got this",
    "You'll figure it out",
    "You're a smart cookie",
    "I believe in you",
    "Sucking at something is the first step towards being good at something",
    "Struggling is part of learning",
    "Everything has cracks - that's how the light gets in",
    "Mistakes don't make you less capable",
    "We are all works in progress",
    "You are a capable human",
    "You know more than you think",
    "10x engineers are a myth",
    "If everything was easy you'd be bored",
    "I admire you for taking this on",
    "You're resourceful and clever",
    "You'll find a way",
    "I know you'll sort it out",
    "Struggling means you're learning",
    "You're doing a great job",
    "It'll feel magical when it's working",
    "I'm rooting for you",
    "Your mind is full of brilliant ideas",
    "You make a difference in the world by simply existing in it",
    "You are learning valuable lessons from yourself every day",
    "You are worthy and deserving of respect",
    "You know more than you knew yesterday",
    "You're an inspiration",
    "Your life is already a miracle of chance waiting for you to shape its destiny",
    "Your life is about to be incredible",
    "Nothing is impossible. The word itself says 'I’m possible!'",
    "Failure is just another way to learn how to do something right",
    "I give myself permission to do what is right for me",
    "You can do it",
    "It is not a sprint, it is a marathon. One step at a time",
    "Success is the progressive realization of a worthy goal",
    "People with goals succeed because they know where they’re going",
    "All you need is the plan, the roadmap, and the courage to press on to your destination",
    "The opposite of courage in our society is not cowardice... it is conformity",
    "Whenever we’re afraid, it’s because we don’t know enough. If we understood enough, we would never be afraid",
    "The past does not equal the future",
    "The path to success is to take massive, determined action",
    "It’s what you practice in private that you will be rewarded for in public",
    "Small progress is still progress",
    "Don't worry if you find flaws in your past creations, it's because you've evolved",
    "Starting is the most difficult step - but you can do it",
    "Don't forget to enjoy the journey",
    "It's not a mistake, it's a learning opportunity",
]

var dogSearch = { q: "#doggo", count: 10, result_type: "recent" };



// function to get a random image
function getRandomImage() {
    T.get('search/tweets', dogSearch, function(error, data) {
        console.log(error, data);
        var rnum = (Math.floor((Math.random() * 45)));
        var rnum2 = (Math.floor((Math.random() * 45)));
        var rnum3 = (Math.floor((Math.random() * 10)));
        var retweetId = data.statuses[rnum3].id_str;
        var retweetUser = data.statuses[rnum3].user.screen_name;

        // get the data from the server
        request('https://api.unsplash.com/photos/random?query=puppy&orientation=landscape&client_id=414d929e840acd0c8b4a12e98aa21f6f4aeb20d25729adf441e8b96b7a7f60ea', function(err, response, data) {
            if (err != null) { return; }

            var json = JSON.parse(data);
            console.log(json);
            console.log(json.urls.regular);
            T.post('statuses/update', { status: "@" + retweetUser + " This doggo says: '" + affirmations[rnum] + "' #Iamatwitterbot ", attachment_url: "https://twitter.com/" + retweetUser + "/status/" + retweetId }, function(err, data, response) { console.log(data) })
            T.post('statuses/update', { status: " This doggo says: '" + affirmations[rnum2] + "' #Iamatwitterdoggobot " + json.links.html }, function(err, data, response) { console.log(data) })

        })
    });

}

getRandomImage();
// })
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(getRandomImage, 1000 * 60 * 60);