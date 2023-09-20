// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 

// 基础信息sql
const { sqlite } = require('./api/yoyoSqlite-2.0.5');
var table_name = 'gender'
mc.listen("onServerStarted", () => {
    colorLog("blue", "————————————————————————————————————————————————————")
    colorLog("pink", "plugin_name：", language.plugin_name)
    colorLog("green", "author：", "banchen")
    colorLog("green", "Mail：", "banchen8964@gmail.com")
    colorLog("green", "QQ：", "738270843")
    colorLog("green", "language：", language.language)
    createTable()
    setup_com()
    colorLog("blue", "————————————————————————————————————————————————————")

})

function createTable() {
    /* 多个参数的时候你可以传对象 */
    var isSetConfig = sqlite.connectDb({
        path: '.\\plugins\\bc\\data\\player.db',
        create: true,/* 不存在是否自动创建 */
    });
    let sql = sqlite.createTable(table_name, {
        realName: {
            type: 'TEXT',//字段类型
            unique: true//是否保持唯一值
        },
        gender: {
            type: 'INTEGER',//字段类型
            default: 'INTEGER DEFAULT 0 not null'
        }
    });
    colorLog("yellow", 'Initialize table:', sql ? 'OK' : 'NOT');
}

var config = new JsonConfigFile('.\\plugins\\bc\\gender\\gender_config.json')
config.init("language", "zh_CN")
const config_language_json = data.openConfig(`.\\plugins\\bc\\gender\\${config.get("language")}.json`, "json", JSON.stringify({
    plugin_name: "性别模块",
    boy: "男",
    girl: "女",
    setok: "设置成功",
    setno: "设置失败",
}));

const language = {
    language: config.get("language"),
    plugin_name: config_language_json.get("plugin_name"),
    boy: config_language_json.get("boy"),
    girl: config_language_json.get("girl"),
    setok: config_language_json.get("setok"),
    setno: config_language_json.get("setno"),
}

mc.listen("onJoin", (pl) => {
    init_pl_data(pl.realName)
})


function init_pl_data(realName) {
    try {
        const randomNumber = Math.floor(Math.random() * 2);
        var result = sqlite.table(table_name)
            .field(['realName', 'gender'])
            .insert([realName, randomNumber]);
    } catch {
    }
}

//获取玩家性别-realName
function getplayerrealName_gender(realName) {
    var result = sqlite.table(table_name)//需要操作的完整表名
        .where('realName', realName)//获取你可以添加一些条件  (id = 1)
        .find();//查询一条数据
    return result.gender;
}

function tellpl(pl, msg) {
    pl.tell(`【${language.plugin_name}】${msg}`)
}


function setup_com() {
    let cmd = mc.newCommand("gender", language.plugin_name)
    cmd.setAlias("gd")
    cmd.setEnum("ChangeAction", ["set", "random"]);
    cmd.mandatory("action", ParamType.Enum, "ChangeAction", 1);
    cmd.mandatory("playarr", ParamType.Player);
    cmd.mandatory("number", ParamType.Int);
    cmd.overload(["ChangeAction", "playarr", "number"]);
    cmd.overload(["ChangeAction", "playarr"]);
    cmd.setCallback((_cmd, _ori, out, res) => {
        switch (res.action) {
            case "set":
                const isupdateset = updategender_arr(res.playarr, res.number)
                const msgset = isupdateset ? language.setok : language.setno;
                return out.success(msgset)
            case "random":
                const isupdaterandom = randomupdate(res.playarr)
                const msgrandom = isupdaterandom ? language.setok : language.setno;
                return out.success(msgrandom)
        }
    });
    cmd.setup();
}

function randomupdate(playarr) {
    return updategender_arr(playarr, null)
}

function updategender_arr(playarr, number) {
    if (number == 0 || number == 1) {
        playarr.forEach((pl, id) => {
            var result = sqlite.table(table_name)//需要操作的完整表名
                .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
                .update({
                    gender: number,
                });
        })
        return true;
    } else if (number == null) {
        playarr.forEach((pl, id) => {
            const randomNumber = Math.floor(Math.random() * 2);
            var result = sqlite.table(table_name)//需要操作的完整表名
                .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
                .update({
                    gender: randomNumber,
                });
        })
        return true;
    }
    return false;
}

function update_pl_gender(player, number) {
    if (number == 0 || number == 1) {
            var result = sqlite.table(table_name)//需要操作的完整表名
                .where('realName', player.realName)//获取你可以添加一些条件  (id = 1)
                .update({
                    gender: number,
                });
        return true;
    } else if (number == null) {
            const randomNumber = Math.floor(Math.random() * 2);
            var result = sqlite.table(table_name)//需要操作的完整表名
                .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
                .update({
                    gender: randomNumber,
                });
        return true;
    }
    return false;
}

class gender {
    /**
     * 
     * @param {数组化的玩家} playarr 
     * @param {性别} number 
     * @returns 布尔值
     */
    static update_players_gender(playarr, number){
        return updategender_arr(playarr, number)
    }
    /**
     * 
     * @param {单个玩家} player 
     * @param {性别} number 
     * @returns 布尔值
     */
    static update_player_gender(player, number){
        return update_pl_gender(player, number)
    }
        /**
     * 
     * @param {单个玩家} player 
     * @returns 0|1
     */
        static getplayerrealName_gender(player){
            return getplayerrealName_gender(player.realName)
        }
}

module.exports = {
    gender
};