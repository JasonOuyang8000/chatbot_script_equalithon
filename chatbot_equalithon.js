const body = document.body;

const state = {
    open: false,
    typing: false
}

// Create Chat DOM
async function createChatIcon() {
    // Chat Icon Interface
    const chatContainer = document.createElement('div');
    const chatIcon = document.createElement('div');
    chatIcon.setAttribute('id','chat-btn');
    chatContainer.append(chatIcon);
    chatContainer.classList.add('chat-container');
  
    // Chat Box Interface
    const chatBox = document.createElement('div');
    chatBox.classList.add('chat-box','hidden');

    const chatMessages = document.createElement('div');
    const chatInput = document.createElement('input');
    const chatForm = document.createElement('form');
    const chatTop = document.createElement('div');

    const chatClose = document.createElement('button');

    chatTop.classList.add('chat-top');
    chatInput.classList.add('chat-input');
    chatMessages.classList.add('chat-messages');
    chatClose.classList.add('chat-btn-close');


    
    chatInput.setAttribute('placeholder', "Write a message...")

    chatClose.innerText = 'X'
    chatTop.append(chatClose);
    chatForm.append(chatInput);
    chatBox.append(chatTop,chatMessages,chatForm);


    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

       sendResponse(chatInput.value);

        chatInput.value = '';

    })
   
    body.append(chatContainer,chatBox); 



    // Show/Hide Chat
    chatContainer.addEventListener('click', () => {
        chatContainer.classList.add('hidden');
       chatBox.classList.remove('hidden');
    });

   chatClose.addEventListener('click', () => {
       chatBox.classList.add('hidden');
        chatContainer.classList.remove('hidden');
    });


    // Chat bot Intro Speak
    await wait(1000);
    await chatBotSpeak(chatMessages,'Hi! I am your personal Startout Chat Bot!'); 

  
    await wait(1000);
    await chatBotSpeak(chatMessages,'I am here to help you with any questions you have with chatbot!');

    await wait(1000);
    chatBotSpeak(chatMessages,'Before we get started, Please select what you need help with:');
    chatBotSpeak(chatMessages,null,['Becoming an Investor? ', 'Getting Support as a founder?', 'Becoming a mentor?', 'More Options']);
  
   
    
  
  
}

function typing(chatMessages) {
   


}
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));


async function chatBotSpeak(chatMessages,text = null,links = null, alink = false) {
  


    let messageDiv = null;
    const typingAnimation = createLoader();
    typingAnimation.setAttribute('id','replace');

    chatMessages.append(typingAnimation);

    if (alink) {
        messageDiv = document.createElement('a');
    }

    else {
        messageDiv = document.createElement('div');
    }


    if (text !== null) {
        messageDiv.classList.add('message-div');
        const chatIcon = document.createElement('img');
        chatIcon.src = 'https://img.icons8.com/fluent/48/000000/music-robot.png';
        const message = document.createElement('p');
        message.innerText = text;

        if (alink) {
            messageDiv.href = text;
            messageDiv.setAttribute('target', '_blank');
            message.innerText = 'Here is your link.';
        }
        
        messageDiv.append(chatIcon,message);
    }

    if (links !== null) {
        messageDiv.classList.add('link-div');

        createChatLinks(links,messageDiv);
    }


    await wait(1000);
    document.querySelector('#replace').remove();
    chatMessages.append(messageDiv);
  

   



   
   

}


function createChatLinks(links,div) {
    // if (alink) {
    //     links.forEach(link => {
    //         const linkDiv = document.createElement('div')
    //         const a = document.createElement('a')
    //         a.href = link;
    //         a.innerText = link;
    //         linkDiv.append(a)
    //         div.append(linkDiv);
    //     })
    //     return;
    // }


    links.forEach(link => {
        const linkDiv = document.createElement('div')

        linkDiv.innerText = link;

        div.append(linkDiv);
    })
}

async function sendResponse(text) {

    const response = await axios.post('http://localhost:5000/userportal',{
        input: text
    });

    const chatMessages = document.querySelector('.chat-messages');
    if (response.data.link) {
        chatBotSpeak(chatMessages,response.data.link,null, true)
        chatBotSpeak(chatMessages,response.data.message)
    }

    else {
        chatBotSpeak(chatMessages,response.data.message)
    }

  
}

function createLoader() {
    const div = document.createElement('div');
    div.classList.add('loadingio-spinner-ellipsis-3ptd39fpn5s');
    div.innerHTML = `<div class="typing">
    <div></div><div></div><div></div><div></div><div></div>
    </div>`;
    
    
    return div;
  

}



createChatIcon();