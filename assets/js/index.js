'use strict';
const { DEFAULT_NAME, SOCIALS } = CONSTANTS;
const userCards = responseData.map((userData) => createUserCard(userData));
const workersList = document.querySelector('#root');
workersList.append(...userCards);
function createUserCard(user) {
  const fullName =
    !user.firstName && !user.lastName
      ? DEFAULT_NAME
      : `${user.firstName} ${user.lastName}`;
  return createElement(
    'li',
    { className: 'workerLi' },
    createWorkerCard({
      fullName,
      profilePicture: user.profilePicture,
      description: user.description,
      contacts: user.contacts,
    })
  );
}
