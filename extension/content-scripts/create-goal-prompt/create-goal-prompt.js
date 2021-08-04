import createElement from '../utils/createElement.js'

function getFormDataAndSendMessage(event, form) {
  event.preventDefault();

  const formData = new FormData(form);
  const userGoal = formData.get('goal');
  if (typeof userGoal !== "string") { throw new Error('Failed to get form data') }
  const data = {goal: userGoal};

  chrome.runtime.sendMessage(data);
}

function saveElements(listener, ...elements) {
  return event => listener(event, ...elements);
}

(function createGoalPrompt() {
  const label = createElement('label', { for:"goal", textContent: "What do you want to accomplish during your visit?" });
  const input = createElement('input', {type:"text", name:"goal", id:"goal", required:"true"});
  const item = createElement('div', {}, [label, input]);
  const button = createElement('button', { textContent: "Start goal-seeking"});

  const form = createElement('form', {}, [item, button]);

  const getFormDataAndSendMessageClosure = saveElements(getFormDataAndSendMessage, form);
  button.addEventListener('click', getFormDataAndSendMessageClosure, true);

  const bubble = createElement('div', {id: "undistactable-extention-bubble"}, [form]);
  const background = createElement('div', {id: "undistractable-extension-background"});

  document.body.appendChild(background);
  document.body.appendChild(bubble);
})();