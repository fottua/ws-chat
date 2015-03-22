if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// создать подключение
var host = location.origin.replace(/^http/, 'ws')
var socket = new WebSocket(host);

// отправить сообщение из формы publish
document.querySelector("textarea.form-control").onkeypress = function() {
if ((event.which == 13 || event.keyCode == 13)&&(!event.shiftKey)) {
  var outgoingMessage = document.querySelector("textarea.form-control").value;
  socket.send(outgoingMessage);
  document.querySelector("textarea.form-control").value = "";
  return false;
  }
else if (event.shiftKey) {
  document.querySelector("textarea.form-control").value += "\r\n";
  return false;
  }
};
document.querySelector("button.btn.btn-info").onclick = function() {
  var outgoingMessage = document.querySelector("textarea.form-control").value;
  socket.send(outgoingMessage);
  document.querySelector("textarea.form-control").value = "";
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
  var incomingMessage = event.data;
  showMessage(incomingMessage); 
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var p = document.createElement("p");
  var p_text = document.createTextNode(message);
  p.appendChild(p_text);
  var div_p_text = document.createElement('div');
  div_p_text.setAttribute('class', 'text');
  div_p_text.appendChild(p_text);
  document.querySelector(".message").appendChild(div_p_text);
  document.querySelector(".message").scrollTop += 900;
  
}
