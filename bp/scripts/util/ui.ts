import {
    ActionFormData
} from "mojang-minecraft-ui";
import {
    Player
} from 'mojang-minecraft'
export default class ActionFormUi {
    _ui = new ActionFormData();
    buttonFunc: Array<Function> = [];
    constructor() {};
    /**
     * 
     * @param {string} bodyText 
     * @returns {ActionFormUi}
     */
    body(bodyText: string): ActionFormUi{
        this._ui.body(bodyText);
        return this
    };
    /**
     * 
     * @param {string} titleText 
     * @returns {ActionFormUi}
     */
    title(titleText: string): ActionFormUi {
        this._ui.title(titleText);
        return this
    };
    /**
     * 
     * @param {Player} player 
     * @returns {ActionFormUi}
     */
    show(player: Player): ActionFormUi {
        this._ui.show(player)
            .then((response) => {
                this.buttonFunc[response.selection]
            });
            return this;
    };
    /**
     * 
     * @param {string} buttonText 
     * @param {string} iconPath 
     * @param {Function} callback 
     * @returns {ActionFormUi}
     */
    button(buttonText: string, callback: Function, iconPath?: string): ActionFormUi{
        if (iconPath === undefined) {
            this._ui.button(buttonText);
        } else {
            this._ui.button(buttonText, iconPath);
        };
        this.buttonFunc.push(callback);
        return this;
    }
}