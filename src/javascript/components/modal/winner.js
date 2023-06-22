import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    // call showModal function

    const { source, name } = fighter;

    let bodyElement = createElement({ tagName: 'div', className: 'winner-box' });

    const attributes = {
        src: source,
        title: name,
        alt: name
    };

    let fighterImage = createElement({
        tagName: 'img',
        className: 'winner-image',
        attributes
    });

    bodyElement.append(fighterImage);

    function restart() {
        location.reload();
    }

    showModal({
        title: `${name} is the winner!`,
        bodyElement,
        onClose: () => restart()
    });
}
