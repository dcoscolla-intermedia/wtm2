// -- Close Config / Setting button -- //
const closeSettingButton = document.getElementById('close-settings-button');

closeSettingButton.addEventListener('click', function () {
  window.location.replace('./settings.html');
})

const activeSessionsList = document.getElementById('active-sessions-list');

const appendActiveSessionItem = (name, deleteFunction) => {
  var listItem = document.createElement('div');
  var paragraph = document.createElement('p');
  var deleteIcon = document.createElement('img');

  paragraph.textContent = name;
  paragraph.classList.add('truncate');

  deleteIcon.src = '../icons/xmark.svg';
  deleteIcon.alt = 'Delete record';
  deleteIcon.width = 15
  deleteIcon.height = 15
  deleteIcon.addEventListener('click', deleteFunction);

  listItem.appendChild(paragraph);
  listItem.appendChild(deleteIcon);

  activeSessionsList.appendChild(listItem);
};

document.addEventListener('DOMContentLoaded', async () => {
  const getActiveSessionsRes = await chrome.runtime.sendMessage({ type: "getActiveSessions" });

  if (getActiveSessionsRes.length) {
    for (let i = 0; i < getActiveSessionsRes.length; i++) {
      const session = getActiveSessionsRes[i]


      const name = session.userDevice.deviceAlias || `${session.userDevice.device.uaResult.device.model} - ${session.userDevice.device.uaResult.browser.name}`
      appendActiveSessionItem(name, () => console.log(`Deleting... ${name}`))
    }
  }
});