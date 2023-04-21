import {
    ActionFormData,
    Player
} from "mojang-minecraft-ui";
export default class ActionFormUi {
    _ui = new ActionFormData();
    buttonFunc = [];
    constructor() {};
    /**
     * 
     * @param {string} bodyText 
     * @returns {ActionFormUi}
     */
    body(bodyText){
        this._ui.body(bodyText);
        return this
    };
    /**
     * 
     * @param {string} titleText 
     * @returns {ActionFormUi}
     */
    title(titleText) {
        this._ui.title(titleText);
        return this
    };
    /**
     * 
     * @param {Player} player 
     * @returns {ActionFormUi}
     */
    show(player) {
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
     * @param {function} callback 
     * @returns {ActionFormUi}
     */
    button(buttonText, iconPath = undefined, callback){
        if (icon == undefined) {
            this._ui.button(buttonText);
        } else {
            this._ui.button(buttonText, iconPath);
        };
        this.buttonFunc.push(callback);
        return this;
    }
}