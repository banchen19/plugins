// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 


// 基础信息sql
const { sqlite } = require('./api/yoyoSqlite-2.0.5');
//引入年龄
const { age } = require('./bc_age.llse');
//引入性别
const { gender } = require('./bc_gender.llse');

var config_json = new JsonConfigFile('.\\plugins\\bc\\partner\\age_config.json')
config_json.init("language", "zh_CN")
config_json.init("gender_sw", true)
config_json.init("boy_age", 19)
config_json.init("girl_age", 18)



const config_language_json = data.openConfig(`.\\plugins\\bc\\partner\\${config_json.get("language")}.json`, "json", JSON.stringify({
    plugin_name: "伴侣模块",
    plugin_msg: "前置模块：年龄、性别",
    gui_post_title: "伴侣请求",
    marry_post: "牵手",
    marry_refuse: "分手",
    ok: "同意",
    no: "拒绝",
    fail: "执行失败",
    bigamy: "重婚"
}));
const config = {
    language: config_language_json.get("language"),
    gender_sw: config_json.get("gender_sw"),
    boy_age: config_json.get("boy_age"),
    girl_age: config_json.get("girl_age"),
}
const language = {
    language: config.language,
    plugin_name: config_language_json.get("plugin_name"),
    gui_post_title: config_language_json.get("gui_post_title"),
    marry_post: config_language_json.get("marry_post"),
    marry_refuse: config_language_json.get("marry_refuse"),
    ok: config_language_json.get("ok"),
    no: config_language_json.get("no"),
    fail: config_language_json.get("fail"),
    bigamy: config_language_json.get("bigamy"),
}

mc.listen("onServerStarted", () => {
    colorLog("blue", "————————————————————————————————————————————————————")
    colorLog("pink", "plugin_name：", language.plugin_name)
    colorLog("green", "author：", "banchen")
    colorLog("green", "Mail：", "banchen8964@gmail.com")
    colorLog("green", "QQ：", "738270843")
    colorLog("green", "language：", language.language)
    colorLog("green", "依赖模块：", "年龄、性别")
    createTable()
    setup_com()
    colorLog("blue", "————————————————————————————————————————————————————")
})

var table_name = 'partner'
function createTable() {
    /* 多个参数的时候你可以传对象 */
    sqlite.connectDb({
        path: '.\\plugins\\bc\\data\\player.db',
        create: true,/* 不存在是否自动创建 */
    });
    let sql = sqlite.createTable(table_name, {
        realName: {
            type: 'TEXT',
            unique: true//是否保持唯一值
        },
        lover: {
            type: 'TEXT'
        }
    });
    colorLog("yellow", 'Initialize table:', sql ? 'OK' : 'NOT');
}

mc.listen("onJoin", (pl) => {
    init_pl(pl)

})

function init_pl(pl) {
    try {
        var result = sqlite.table(table_name)
            .field(['realName', 'lover'])
            .insert([pl.realName, pl.realName,]);
    }
    catch
    {
    }
}

function setup_com() {
    let cmd = mc.newCommand("like", language.plugin_name, PermType.Any)
    cmd.setAlias("love")
    cmd.setEnum("ChangeAction", ["post", "refuse", "gui"]);
    cmd.mandatory("action", ParamType.Enum, "ChangeAction", 1);
    cmd.mandatory("player_name", ParamType.String);
    cmd.overload(["ChangeAction", "player_name"]);
    cmd.overload(["ChangeAction"]);
    cmd.setCallback((_cmd, _ori, out, res) => {
        switch (res.action) {
            case "post":
                const isupdateset = partner.form_pl_post(_ori.player, res.player_name)
                const msgset = isupdateset ? language.setok : language.setno;
                return out.success(msgset);
            case "refuse":
                const isupdateset2 = partner.form_pl_refuse(_ori.player, res.player_name)
                const msgset2 = isupdateset2 ? language.setok : language.setno;
                return out.success(msgset2)
            case "gui":
                form_gui(_ori.player)
                break;
        }
    });
    cmd.setup();
}

function form_gui(pl) {
    let fm = mc.newSimpleForm()
    fm.setTitle(language.gui_post_title)
    fm.addButton(language.marry_post)
    fm.addButton(language.marry_refuse)
    pl.sendForm(fm, (pl, id) => {
        switch (id) {
            case 0:
                form_post(pl)
                break
            case 1:
                if (partner.getpl_lover(pl) != pl.realName) {
                    partner.form_pl_refuse(pl, partner.getpl_lover(pl))
                } else {
                    tellpl(pl, language.fail)
                }
                break;
        }
    });
}

function form_post(pl) {
    let fm = mc.newSimpleForm()
    fm.setTitle(language.gui_post_title + language.marry_post)
    let pls = mc.getOnlinePlayers()
    pls.forEach((pl, id) => {
        fm.addButton(pl.realName)
    })
    pl.sendForm(fm, (pl, id) => {
        if (id != null)
            partner.form_pl_post(pl, pls[id].realName)
    });
}

function tellpl(pl, msg) {
    pl.tell(`【${language.plugin_name}】${msg}`)
}

class partner {
    static form_pl_post(frompl, topl_name) {
        let topl = mc.getPlayer(topl_name)
        if (this.getpl_lover(frompl) == frompl.realName) {
            if (gender.getplayerrealName_gender(frompl) == 1 && age.getpl_age_old(frompl) >= config.boy_age &&
                gender.getplayerrealName_gender(topl) == 0 && age.getpl_age_old(topl) >= config.girl_age) {
                this.form_pl_ok_post(frompl, topl_name)
            }
            else if (gender.getplayerrealName_gender(topl) == 1 && age.getpl_age_old(topl) >= config.boy_age &&
                gender.getplayerrealName_gender(frompl) == 0 && age.getpl_age_old(frompl) >= config.girl_age) {
                this.form_pl_ok_post(frompl, topl_name)
            } else {
                tellpl(frompl, language.fail)
            }
        } else {
            tellpl(frompl, language.bigamy)
        }
    }

    static form_pl_ok_post(frompl, topl_name) {
        let topl = mc.getPlayer(topl_name)
        let fm = mc.newSimpleForm()
        fm.setTitle(language.gui_post_title)
        fm.setContent(frompl.realName + language.marry_post + topl_name)
        fm.addButton(language.ok)
        fm.addButton(language.no)
        topl.sendForm(fm, (pl, id) => {
            if (id == 0) {
                this.setlover(frompl, topl)
                this.setlover(topl, frompl)
                tellpl(frompl, topl_name + language.ok + language.marry_post + topl_name)
                tellpl(topl, topl_name + language.ok + language.marry_post + frompl.realName)
            } else {
                tellpl(frompl, topl_name + language.no + language.marry_post)
            }
        })
    }

    static form_pl_refuse(frompl, topl_name, type) {
        let topl = mc.getPlayer(topl_name)
        let fm = mc.newSimpleForm()
        fm.setTitle(language.gui_post_title)
        fm.setContent(frompl.realName + language.marry_refuse + topl_name)
        fm.addButton(language.ok)
        fm.addButton(language.no)
        topl.sendForm(fm, (pl, id) => {
            if (id == 0) {
                this.setlover(frompl, frompl)
                this.setlover(topl, topl)
                tellpl(frompl, topl_name + language.ok + language.marry_refuse + topl_name)
                tellpl(topl, topl_name + language.ok + language.marry_refuse + frompl.realName)
            } else {
                tellpl(frompl, topl_name + language.no + language.marry_refuse)
            }
        })
    }
    /**
     * 设置伴侣 
     * @param {玩家对象} pl 
     * @param {玩家对象} pl2  
     * @returns Boolean
     */

    static setlover(pl, pl2) {
        try {
            sqlite.table(table_name)//需要操作的完整表名
                .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
                .update({
                    lover: pl2.realName,
                });
            return true;
        } catch {
            return false;
        }
    }
    /**
     * 获取指定玩家的伴侣名字
     * @param {玩家} pl 
     * @returns String
     */
    static getpl_lover(pl) {
        var result = sqlite.table(table_name)//需要操作的完整表名
            .where('realName', pl.realName)//获取你可以添加一些条件  (id = 1)
            .find();//查询一条数据
        return result.lover;
    }
}

module.exports = {
    partner
};