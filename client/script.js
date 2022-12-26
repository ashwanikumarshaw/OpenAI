import bot from './assets/bot.svg';
import user from './assets/user.svg';

//get data from html page
const form = document.querySelector('form');//only one form 
const chatContainer = document.querySelector('#chat_container');//using id slector

let loadInterval;

//animation during loading time
function loader(element) { 
    element.textContent = '';
    
    loadInterval = setInterval(() => { 
        element.textContent += '.';
        if (element.textContent === '....') { 
             element.textContent = '';
        }
    },300)
}

//typing animation 
function typeText(element,text) {

    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        }
        else { 
            clearInterval(interval);
        }
    },20)
}

//need uniqe id for every messages
function generateUniqueId() { 
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

//chat Stripes
function chatStripe(isAi, value, uniqeId) {
    return (
    `
    <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
            <div class="profile">
                <img
                src="${isAi ? bot : user}"
                alt="${isAi ? 'bot' : 'user'}"
                />
            </div>
            <div class="message" id=${uniqeId}>${value}</div>
        </div>
    </div>
    `)
}

//handle after submit
const handleSubmit = async (e) => { 
    e.preventDefault()

    const data = new FormData(form);
    
    //user's charStripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
    form.reset();

    //bot's charStripe
    const uniqeId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ",uniqeId);
   
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqeId);

    loader(messageDiv);
    //fetch data from server -> bot's response

    const response = await fetch('https://openaicodx.onrender.com', {//http://localhost:5000
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt:data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = '';
    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();
        typeText(messageDiv, parsedData);

    } else { 
        const err = await response.text();
        messageDiv.innerHTML = "Something went wrong";

    }
}

//we have to call handleSubmit 

form.addEventListener('submit', handleSubmit)

//when submit using enter button 

form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})