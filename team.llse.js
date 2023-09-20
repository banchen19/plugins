// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 

// 基础信息sql
const { sqlite } = require('./api/yoyoSqlite-2.0.5');

var config = new JsonConfigFile('.\\plugins\\bc\\team\\age_config.json')
config.init("language", "zh_CN")
config.init("one_year_old", "s")

const config_language_json = data.openConfig(`.\\plugins\\bc\\team\\${config.get("language")}.json`, "json", JSON.stringify({
    plugin_name: "团队模块",
    default_team: "敌人",
    team_add: "创建队伍",
    team_join: "加入队伍",
    team_exit: "退出队伍",
    disband_team: "解散队伍",
    team_mg: "管理队伍",
    setkey: "设置令牌",
    setok: "设置成功",
    setno: "设置失败",
}));
const language = {
    language: config.get("language"),
    plugin_name: config_language_json.get("plugin_name"),
    default_team: config_language_json.get("default_team"),
    team_add: config_language_json.get("team_add"),
    team_join: config_language_json.get("team_join"),
    team_exit: config_language_json.get("team_exit"),
    team_mg: config_language_json.get("team_mg"),
    setkey: config_language_json.get("setkey"),
    setok: config_language_json.get("setok"),
    setno: config_language_json.get("setno"),
}

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

var table_team = 'team'
var table_pl = 'team_pl'
var table_pl_log = 'team_pl_log'

function createTable() {
    /* 多个参数的时候你可以传对象 */
    sqlite.connectDb({
        path: '.\\plugins\\bc\\data\\player.db',
        create: true,/* 不存在是否自动创建 */
    });
    let sql = sqlite.createTable(table_pl, {
        realName: {
            type: 'TEXT',//字段类型
            unique: true//是否保持唯一值
        },
        key: {
            type: 'TEXT'
        }
    });

    colorLog("yellow", 'Initialize table:', sql ? 'OK' : 'NOT');
    let sql2 = sqlite.createTable(table_team, {
        team_name: {
            type: 'TEXT'
        },
        realName: {
            type: 'TEXT'
        },
        key: {
            type: 'TEXT'
        }
    });
    colorLog("yellow", 'Initialize table:', sql2 ? 'OK' : 'NOT');
    let sql3 = sqlite.createTable(table_pl_log, {
        realName: {
            type: 'TEXT'
        },
        team_name: {
            type: 'TEXT'
        }
    });
    colorLog("yellow", 'Initialize table:', sql3 ? 'OK' : 'NOT');
}

function setup_com() {
    let cmd = mc.newCommand("team", language.plugin_name)
    cmd.setAlias("tm")
    cmd.setEnum("ChangeAction", ["add", "setkey", 'exit', 'gui']);
    cmd.mandatory("action", ParamType.Enum, "ChangeAction", 1);
    cmd.mandatory("str", ParamType.String);
    cmd.overload(["ChangeAction", "str"]);
    cmd.overload(["ChangeAction"]);
    cmd.setCallback((_cmd, _ori, out, res) => {
        switch (res.action) {
            case "join":
                team.set_pl_key(_ori.player, res.str)
                return out.success(language.setok)
            case "add":
                let key = team.new_team(res.str, _ori.player)
                init_pl_log(_ori.player, res.str)
                team.set_pl_key(_ori.player, res.str)
                return out.success(language.team_add + language.setok + language.setkey + key)
            case "setkey":
                team.set_pl_key(_ori.player, res.str)
                return out.success(language.setok)
            case "exit":
                team.plexit_team(_ori.player, res.str)
                return out.success(language.setok)
            case 'gui':
                form_main(_ori.player)
                break;
        }
    });
    cmd.setup();
}

function form_main(pl) {
    let fm = mc.newSimpleForm()
    fm.setTitle(language.plugin_name)
    fm.addButton(language.team_join)
    fm.addButton(language.setkey)
    fm.addButton(language.team_add)
    fm.addButton(language.team_exit)
    fm.addButton(language.disband_team)
    pl.sendForm(fm, (pl, id) => {
        switch (id) {
            case 0:
                join_team_gui(pl, language.team_join);
                break
            case 1:
                setpl_key_gui(pl, language.setkey)
                break;
            case 2:
                new_team_gui(pl, team_add)
                break;
            case 3:
                form_exit_team(pl)
                break;
            case 4:
                if(team.getteam_realName(id[0]) == pl.realName)
                {            
                    let oldkey=team.getpl_team_key(pl)
                    let now_key = language.disband_team+team.getteam_name(oldkey)
                    team.delete_team(oldkey,pl)
                    Modify_the_keys_of_everyone_under_the_current(oldkey, now_key)
                    tellpl(pl, language.setok)
                }else{
                    tellpl(pl, language.setno)
                }
                break;
        }
    });
}

function form_exit_team(pl) {
    let fm = mc.newCustomForm()
    fm.setTitle(team_add)
    fm.addInput("输入队伍名", "")
    pl.sendForm(fm, (pl, id) => {
        if (id[0] != null && team.getteam_realName(id[0]) != pl.realName) {
            team.plexit_team(pl, id[0])
            tellpl(pl, language.setok)
        } else {
            tellpl(pl, language.setno)
        }
    });
}

function tellpl(pl, msg) {
    pl.tell(`【${language.plugin_name}】${msg}`)
}

function setpl_key_gui(pl, setkey) {
    let fm = mc.newCustomForm()
    fm.setTitle(setkey)
    fm.addInput("修改令牌", "请找队伍创建者获取")
    pl.sendForm(fm, (pl, id) => {
        if (id[0] != null) {
            team.set_pl_key(pl, id[0])
            tellpl(pl, language.setok)
        }
    });
}

function new_team_gui(pl, team_add) {
    let fm = mc.newCustomForm()
    fm.setTitle(team_add)
    fm.addInput("输入队伍名", "")
    pl.sendForm(fm, (pl, id) => {
        if (id[0] != null) {
            let key = team.new_team(id[0], _ori.player)
            tellpl(pl, language.team_add + language.setok + language.setkey + key)
        }
    });
}

function join_team_gui(pl, team_join) {
    let fm = mc.newSimpleForm()
    fm.setTitle(team_join)
    let arr = team.getteamall_name()
    arr.forEach((data, id) => {
        fm.addButton(data.team_name)
    })
    pl.sendForm(fm, (pl, id) => {
        let team_name = arr[id].team_name;
        team.set_pl_key(pl, team_name)
        tellpl(pl, language.setok)
    });
}

mc.listen("onJoin", (pl) => {
    if (team.getplteam_count(pl) == 0) {
        init_pl_log(pl, language.default_team)
        init_pl(pl)
    }
})

function init_pl_log(pl, team_name) {
    var result = sqlite.table(table_pl_log)
        .field(['realName', 'team_name'])
        .insert([pl.realName, team_name]);
}

function init_pl(pl) {
    var result = sqlite.table(table_pl_log)
        .field(['realName', 'key'])
        .insert([pl.realName, generateRandomString(8)]);
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function Modify_the_keys_of_everyone_under_the_current(key, now_key) {
    var result = sqlite.table(table_pl)//需要操作的完整表名
        .where('key', key)//获取你可以添加一些条件  (id = 1)
        .update({
            key: now_key,
        });
}

class team {

    static plexit_team(pl, team_name) {
        var result = sqlite.table(table_pl_log)//需要操作的完整表名
            .where({
                realName: pl.realName,
                team_name: team_name
            })
            .delete();
        if (this.getteam_name(this.getpl_team_key(pl)) == team_name) {
            this.set_pl_key(pl, generateRandomString(8))
            let team_key = generateRandomString(8)
            this.setteam_key(team_name, team_key)
            Modify_the_keys_of_everyone_under_the_current(this.getpl_team_key(pl), team_key)
        }
    }

    static set_pl_key(pl, key) {
        var result = sqlite.table(table_pl)//需要操作的完整表名
            .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
            .update({
                key: key,
            });
    }

    static getplteam_count(pl) {
        let result = sqlite.table(table_pl)//需要操作的完整表名
            .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
            .count();//查询一条数据
        return result;
    }

    static new_team(team_name, pl) {
        let key = generateRandomString(6)
        let result = sqlite.table(table_team)
            .field(['team_name', 'realName', 'key'])
            .insert([team_name, pl.realName, key]);
        return key;
    }

    static delete_team(key, pl) {
        let result = sqlite.table(table_team)//需要操作的完整表名
            .where({
                realName: pl.realName,
                key: key
            })
            .delete();
    }

    static getpl_team_key(pl) {
        let result = sqlite.table(table_pl)//需要操作的完整表名
            .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
            .find().key;//查询一条数据
        return result;
    }

    static getpl_join_team(pl) {
        let key = this.getpl_team_key(pl)
        return this.getteam_name(key)
    }

    static getteam_name(key) {
        try {
            let result = sqlite.table(table_team)//需要操作的完整表名
                .where('key', key)//获取你可以添加一些条件  (id = 1)
                .find().team_name;//查询一条数据
            return result;
        }
        catch {
            return null;
        }
    }

    static getteam_key(team_name) {
        try {
            let result = sqlite.table(table_team)//需要操作的完整表名
                .where('team_name', team_name)//获取你可以添加一些条件  (id = 1)
                .find().key;//查询一条数据
            return result;
        }
        catch {
            return null;
        }
    }

    static getteam_realName(team_name) {
        try {
            let result = sqlite.table(table_team)//需要操作的完整表名
                .where('team_name', team_name)//获取你可以添加一些条件  (id = 1)
                .find().realName;//查询一条数据
            return result;
        }
        catch {
            return null;
        }
    }

    static setteam_key(team_name, key) {
        var result = sqlite.table(table_team)//需要操作的完整表名
            .where('team_name', team_name)//获取你可以添加一些条件  (id = 1)
            .update({
                key: key,
            });
    }

    static getteamall_name() {
        var result = sqlite.table(table_team)//需要操作的完整表名
            .select();//查询多条
        return result.data
    }
    

}


module.exports = {
    team
};