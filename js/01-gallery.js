import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');

const createGallery = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', createGallery);

galleryContainer.addEventListener('click', onGalleryContainerClick);

//create gallery
function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

//create modal window
function onGalleryContainerClick(evt) {
  evt.preventDefault();

  const onImageClick = evt.target.classList.contains('gallery__image');
  if (!onImageClick) {
    return;
  }

  const modalWindow = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}">
`,
    {
      onClose: modalWindow => {
        window.removeEventListener('keydown', onEscapePress);
      },
    }
  );

  modalWindow.show();

  //close modal window on escape
  const onEscapePress = evt => {
    if (evt.code === 'Escape') {
      modalWindow.close();
    }
  };

  window.addEventListener('keydown', onEscapePress);
}
