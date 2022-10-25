/**
 * Создание и настройка HTML element
 * @param {string} tagName тег создаваемого элемента
 * @param {object} options объект настроек для элемента
 *  @param {string} options.className классы для элемента
 *  @param {object} options.eventListeners объект с функциями слушателя  элемента
 *  @param {object} options.attributes объект с атрибутами элемента
 * @param  {...(Element|Node|String)} children дочерние элменты или узлы, или текст
 * @returns {HTMLElement}
 */
function createElement(tagName, options = {}, ...children) {
  const { className, eventListeners = {}, attributes = {} } = options;
  const elem = document.createElement(tagName);
  elem.className = className;

  /* eventListeners
{
  'error':handleImageErrorV1;
  "click": finction (e) {}
}
[
  [ 'error', handleImageErrorV1],
  [ "click", finction (e) {}],
]
*/
  for (const [eventType, listener] of Object.entries(eventListeners)) {
    elem.addEventLister(eventType, listener);
  }

  /*attributes
{
  
  'src' : 'string',
  'alt' : 'string alt'
}

*/

  for (const [attributeName, value] of Object.entries(attributes)) {
    elem.setAttribute(attributeName, value);
  }
  elem.append(...children);
  return elem;
}

function createCardInfo({ fullName, description }) {
  return createElement(
    'div',
    { className: 'cardInfo' },
    createElement('h1', { className: 'cardName' }, `${fullName}`),
    createElement('p', { className: 'cardDescription' }, description)
  );
}

function createWorkerCard({ fullName, profilePicture, description, contacts }) {
  const linkList = createElement('ul', { className: 'linkList' });
  contacts.forEach((e) => {
    if (SOCIALS.has(new URL(e).hostname)) {
      linkList.append(
        createlinkList(
          SOCIALS.get(new URL(e).hostname)[0],
          SOCIALS.get(new URL(e).hostname)[1],
          e
        )
      );
    }
  });
  return createElement(
    'article',
    { className: 'workerCard' },
    createImage({
      fullName,
      profilePicture,
    }),
    createCardInfo({ fullName, description }),
    createElement('div', { className: 'linkContainer' }, linkList)
  );
}

function createlinkList(name, img, link) {
  return createElement(
    'li',
    { className: 'linkItem' },
    createElement(
      'a',
      {
        className: 'linkItem',
        attributes: { href: link },
      },
      createElement('img', {
        className: 'linkPic',
        attributes: { alt: name, src: img },
      })
    )
  );
}

function createImage({ fullName, profilePicture }) {
  const cardImg = createElement('img', {
    className: 'cardImg',
    // eventListeners: { error: handleImageErrorV1 },
    attributes: { alt: fullName, src: profilePicture },
  });
  cardImg.onerror = () =>
    (cardImg.src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png');
  return createElement('div', { className: 'imgWrapper' }, cardImg);
}
