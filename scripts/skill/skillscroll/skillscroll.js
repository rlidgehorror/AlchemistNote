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
    //  技能池
    status = true;
    // 判断当前是否正在执行技能,true为可以执行技能，即当前没有技能正在执行
    pace = 0
    // 判断当前技能池执行的步数
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
                return;
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
            runCmd.title("技能冷却中", player, "down");

        } else if (!this.status && this.pace > 1) {
            runCmd.title("技能执行中", player, "down");
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
            runCmd.title("技能冷却完成", player, "down");
            runCmd.playerCmd(`title ${player.nameTag} subtitle 冷却时间:${this.time / 20}s `, player);
            runCmd.playerCmd(`playsound random.anvil_use ${player.nameTag} ~ ~ ~ 1 1 1`, player);
        } else {
            return;
        };
    }
}