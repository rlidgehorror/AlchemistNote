import {
    consoleTimeout,
    setTimeout,
} from '../../util/delay'
import {
    Player
} from 'mojang-minecraft'
import {
    runCmd
} from '../../util/command';



export class skillscroll /**@class */ {
    skillfunc = [];
    status = true;
    pace = 0
    /**
     * 
     * @param {string} id 技能id
     * @param {Number} time 技能冷却时间game tick
     */
    constructor(id, time = 0) {
        time = time | 0;
        this.id = id;
        this.time = time
    };

    /**
     * 
     * @param {function} skillfunc
     * @param {Number} time
     * @returns {this}
     */
    setSkill(skillfunc, time = 0) {
        if (this.status) {
            //只有在runSkillAsync()不执行或者执行完成的时候才可以setSkill
            if (typeof skillfunc == 'function') {
                this.skillfunc.push({
                    skillFunc: skillfunc,
                    time: time
                });
                this.pace++;
                return this;
            } else {
                return
            }
        } else {
            return;
        }

    };
    /**
     * 
     * @param {Player} player 
     * @returns {void}
     */
    cooldownShow(player) {
        if (!this.status && this.pace == 1) {
            runCmd.playerCmd(`title "${player.nameTag}" title 技能冷却中！`, player)
        } else if (!this.status && this.pace > 1) {
            runCmd.playerCmd(`title "${player.nameTag}" title 技能执行中！`, player)
        };
    }

    /**
     * 
     * @param {Player} player 
     * 
     */
    async runSKillAsync(player) {
        //异步执行任务队列
        if (this.status) {
            let stime = this.time;
            this.setSkill(() => {
                if (!this.status) {
                    this.status = true;
                    this.skillfunc = [];
                }
            }, stime);
            this.status = false;
            // consoleTimeout(`${this.skillfunc[this.skillfunc.length - 2].skillFunc}`)
            for (const s of this.skillfunc) {
                let sstime = s.time;
                await setTimeout(s.skillFunc, sstime)
                    .catch(err => {
                        console.warn(err);
                    });
                this.pace--;
            };
            runCmd.playerCmd(`title ${player.nameTag} title 技能冷却完成!! `, player);
            runCmd.playerCmd(`title ${player.nameTag} subtitle 冷却时间:${this.time / 20}s `, player);
        } else {
            return;
        };
    }
}