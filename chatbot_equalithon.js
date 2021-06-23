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
    const chatTop = document.createElement('div');

    const chatClose = document.createElement('button');

    chatTop.classList.add('chat-top');
    chatInput.classList.add('chat-input');
    chatMessages.classList.add('chat-messages');
    chatClose.classList.add('chat-btn-close');



    chatInput.setAttribute('placeholder', "Write a message...")

    chatClose.innerText = 'X'
    chatTop.append(chatClose);
    chatBox.append(chatTop,chatMessages,chatInput);

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


async function chatBotSpeak(chatMessages,text = null,links = null) {
    const messageDiv = document.createElement('div');
    const typingAnimation = createLoader();
    typingAnimation.setAttribute('id','replace');

    chatMessages.append(typingAnimation);

    if (text !== null) {
        messageDiv.classList.add('message-div');
        const chatIcon = document.createElement('img');
        chatIcon.src = 'https://img.icons8.com/fluent/48/000000/music-robot.png';
        const message = document.createElement('p');
        message.innerText = text;
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
    links.forEach(link => {
        const linkDiv = document.createElement('div')

        linkDiv.innerText = link;

        div.append(linkDiv);
    })
}


function initateWelcomeMessage() {

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