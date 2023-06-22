import controls from '../../constants/controls';
export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over

        const healthIndicator = document.getElementsByClassName('arena___health-bar');
        const healthBars = [...healthIndicator];
        const statusInfo = {
            block: false,
            currentHealth: 100,
            timeOfCritical: Date.now(),
            criticalInput: []
        };
        console.log(statusInfo);

        const playerOne = {
            ...firstFighter,
            ...statusInfo,
            healthBar: healthBars[0],
            position: 'left'
        };

        console.log(playerOne);
        const playerTwo = {
            ...secondFighter,
            ...statusInfo,
            healthBar: healthBars[1],
            position: 'right'
        };
        console.log(playerTwo);

        function fighterAttack(attacker, defender) {
            if (attacker.block) {
                return;
            }

            if (defender.block) {
                return;
            }

            const totalDamage = getDamage(attacker, defender);

            if (!totalDamage) {
                return;
            }

            defender.currentHealth = defender.currentHealth - (totalDamage / defender.health) * 100;
            if (defender.currentHealth < 0) {
                document.removeEventListener('keydown', onDown);
                document.removeEventListener('keyup', onUp);
                resolve(attacker);
            }
            console.log(statusInfo);
            console.log(playerOne);
            console.log(playerTwo);
            defender.healthBar.style.width = `${defender.currentHealth}%`;
        }

        function criticalHandler(fighter) {
            const currentTime = Date.now();

            if (currentTime - fighter.timeOfCritical < 10000) {
                return false;
            }

            if (!fighter.criticalInput.includes(event.code)) {
                fighter.criticalInput.push(event.code);
            }

            if (fighter.criticalInput.length === 3) {
                fighter.timeOfCritical = currentTime;
                return true;
            }
        }

        function onDown(event) {
            if (!event.repeat) {
                switch (event.code) {
                    case controls.PlayerOneAttack: {
                        fighterAttack(playerOne, playerTwo);
                        break;
                    }

                    case controls.PlayerTwoAttack: {
                        fighterAttack(playerTwo, playerOne);
                        break;
                    }

                    case controls.PlayerOneBlock: {
                        playerOne.block = true;
                        break;
                    }

                    case controls.PlayerTwoBlock: {
                        playerTwo.block = true;
                        break;
                    }
                }

                if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                    criticalHandler(playerOne) ? fighterAttack(playerOne, playerTwo) : null;
                }

                if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                    criticalHandler(playerTwo) ? fighterAttack(playerTwo, playerOne) : null;
                }
            }
        }

        function onUp(event) {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    playerOne.block = false;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.block = false;
                    break;
            }

            if (playerOne.criticalInput.includes(event.code)) {
                playerOne.criticalInput.splice(playerOne.criticalInput.indexOf(event.code), 1);
            }

            if (playerTwo.criticalInput.includes(event.code)) {
                playerTwo.criticalInput.splice(playerTwo.criticalInput.indexOf(event.code), 1);
            }
        }

        document.addEventListener('keydown', onDown);
        document.addEventListener('keyup', onUp);
    });
}
export function getDamage(attacker, defender) {
    // return damage
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage <= 0 ? 0 : damage;
}

export function getHitPower(fighter) {
    // return hit power
    const criticalHitChance = fighter.criticalInput === 3 ? 2 : Math.random() * (2 - 1) + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.random() * (2 - 1) + 1;
    return fighter.defense * dodgeChance;
}
