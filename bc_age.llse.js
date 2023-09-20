// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 

var config = new JsonConfigFile('.\\plugins\\bc\\age\\age_config.json')
config.init("language", "zh_CN")
config.init("one_year_old", "s")

const config_language_json = data.openConfig(`.\\plugins\\bc\\age\\${config.get("language")}.json`, "json", JSON.stringify({
    plugin_name: "年龄模块",
    time_str: "岁",
    setok: "设置成功",
    setno: "设置失败",
}));
const language = {
    language: config.get("language"),
    plugin_name: config_language_json.get("plugin_name"),
    setok: config_language_json.get("setok"),
    setno: config_language_json.get("setno"),
    time_str: config_language_json.get("time_str"),
}

// 基础信息sql
const { sqlite } = require('./api/yoyoSqlite-2.0.5');
var table_name = 'age'
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
    sqlite.connectDb({
        path: '.\\plugins\\bc\\data\\player.db',
        create: true,/* 不存在是否自动创建 */
    });
    let sql = sqlite.createTable(table_name, {
        realName: {
            type: 'TEXT',//字段类型
            unique: true//是否保持唯一值
        },
        timestamp: {
            type: 'INTEGER'
        },
        age:
        {
            type: 'INTEGER'
        }
    });
    colorLog("yellow", 'Initialize table:', sql ? 'OK' : 'NOT');
}

function setup_com() {
    let cmd = mc.newCommand("age", language.plugin_name)
    cmd.setAlias("age")
    cmd.setEnum("ChangeAction", ["set"]);
    cmd.mandatory("action", ParamType.Enum, "ChangeAction", 1);
    cmd.mandatory("playarr", ParamType.Player);
    cmd.mandatory("number", ParamType.Int);
    cmd.overload(["ChangeAction", "playarr", "number"]);
    cmd.setCallback((_cmd, _ori, out, res) => {
        switch (res.action) {
            case "set":
                const isupdateset = age.update_player_age(res.playarr[0], res.number)
                const msgset = isupdateset ? language.setok : language.setno;
                return out.success(msgset)
        }
    });
    cmd.setup();
}

mc.listen("onJoin", (pl) => {
    init_pl(pl)
})

mc.listen("onJump", (pl) => {
    update_pl(pl)

})

mc.listen("onLeft", (pl) => {
    update_pl(pl)
})

function getpl_age_old(pl) {
    let time_unit = config.get("one_year_old")
    let age_ms = getplayerrealName_data(pl.realName).age
    switch (time_unit) {
        case "ms":
            return age_ms
        case "s":
            return age_ms / 1000
        case "min":
            return age_ms / (1000 * 60)
        case "h":
            return age_ms / (1000 * 60 * 60)
        case "d":
            return age_ms / (1000 * 60 * 60 * 24)
        case "wk":
            return age_ms / (1000 * 60 * 60 * 24 * 7)
        case "mo":
            return age_ms / (1000 * 60 * 60 * 24 * 30)
        case "qtr":
            return age_ms / (1000 * 60 * 60 * 24 * 30 * 3)
        case "yr":
            return age_ms / (1000 * 60 * 60 * 24 * 30 * 12)
    }
}

function tellpl(pl, msg) {
    pl.tell(`【${language.plugin_name}】${msg}`)
}

function update_pl(pl) {
    const pl_data = getplayerrealName_data(pl.realName)
    if (pl_data != null) {
        const timestamp = new Date().getTime();
        let number = (Math.floor((timestamp - pl_data.timestamp)))
        update_pl_age(pl, pl_data.age + number)
        update_pl_timestamp(pl)
    }
}
function init_pl(pl) {
    const timestamp = new Date().getTime();
    try {
        var result = sqlite.table(table_name)
            .field(['realName', 'timestamp'])
            .insert([pl.realName, timestamp]);
    }
    catch
    {

    }
}

//获取玩家数据-realName
function getplayerrealName_data(realName) {
    var result = sqlite.table(table_name)//需要操作的完整表名
        .where('realName', realName)//获取你可以添加一些条件  (id = 1)
        .find();//查询一条数据
    return result;
}

function update_pl_age(pl, number) {
    try {

        var result = sqlite.table(table_name)//需要操作的完整表名
            .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
            .update({
                age: number,
            });
        return true
    }
    catch {
        return false;
    }
}

function update_pl_timestamp(pl) {
    const timestamp = new Date().getTime();
    var result = sqlite.table(table_name)//需要操作的完整表名
        .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
        .update({
            timestamp: timestamp,
        });
}

class age {
    /**
     * 
     * @param {玩家} player 
     * @param {年龄} number 
     * @returns 布尔值
     */
    static update_player_age(player, number) {
        let age_ms = 0;
        let time_unit = config.get("one_year_old")
        switch (time_unit) {
            case "ms":
                return number
            case "s":
                return number * 1000
            case "min":
                return number * (1000 * 60)
            case "h":
                return number * (1000 * 60 * 60)
            case "d":
                return number * (1000 * 60 * 60 * 24)
            case "wk":
                return number * (1000 * 60 * 60 * 24 * 7)
            case "mo":
                return number * (1000 * 60 * 60 * 24 * 30)
            case "qtr":
                return number * (1000 * 60 * 60 * 24 * 30 * 3)
            case "yr":
                return number * (1000 * 60 * 60 * 24 * 30 * 12)
        }
        age_ms=number
        return update_pl_age(player, age_ms)
    }
    /**
 * 
 * @param {玩家} player 
 * @returns {age} int
 */
    static getpl_age_old(player) {
        return getpl_age_old(player)
    }
}

module.exports = {
    age
};