const socket = io("http://localhost:3000");
const dataFile = "./misc/chatLog.txt";
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");
appendMessage("Welcome To The Party");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
	appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
	appendMessage(`${name} joined the party`);
	console.log(`${name} joined the party`);
});

socket.on("user-disconnected", (name) => {
	appendMessage(`${name} left the party`);
});

messageForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const message = messageInput.value;
	appendMessage(`You: ${message}`);
	socket.emit("send-chat-message", message);
	messageInput.value = "";
});

function appendMessage(message) {
	const messageElement = document.createElement("div");
	messageElement.innerText = message;
	messageContainer.append(messageElement);
	console.log(message);
}
