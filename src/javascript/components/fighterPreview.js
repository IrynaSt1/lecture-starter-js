import createElement from '../helpers/domHelper';
import { getFighterInfo } from './fighterSelector';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    if (fighter) {
        const { name, health } = fighter;

        const fighterName = createElement({ tagName: 'h3' });
        fighterName.innerText = name;
        const fighterImage = createFighterImage(fighter); 
        const fighterHealth = createElement({ tagName: 'p' });
        fighterHealth.innerText = health;
        const fighterDetails = createElement({
            tagName: 'div',
            className: 'fighter-details'
        });
        fighterDetails.append(fighterName,fighterHealth)
        fighterElement.append(fighterImage,fighterDetails)
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
