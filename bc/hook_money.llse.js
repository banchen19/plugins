// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 



// 配置文件
var config = new JsonConfigFile("./plugins/bc/hook/config.json")
config.init("money", "llmoney")
config.init("minecraft:cod", 200)
mc.listen("onPlayerPullFishingHook", (player, entity, item) => {
    if (item != null) {
        giveplmoney(player, item.type)
    }
})
colorLog("blue", "————————————————————————————————————————————————————")
colorLog("pink", "插件名：", "钓鱼经济")
colorLog("yellow", "类型：", "定制")
colorLog("green", "作者：", "banchen")
colorLog("green", "邮箱：", "banchen8964@gmail.com")
colorLog("green", "QQ：", "738270843")
colorLog("green", "配置文件路径：", "./plugins/bc/hook/config.json")
colorLog("blue", "————————————————————————————————————————————————————")
function giveplmoney(pl, item_type) {
    const moneydemo = config.get("money");
    if (moneydemo == "llmoney") {
        if (config.get(item_type) != null) {
            money.add(pl.xuid, config.get(item_type))
            pl.tell("获取奖励："+config.get(item_type))
            pl.tell("钱包余额变动："+money.get(pl.xuid))
        }
    } else {
        if (config.get(item_type) != null) {
            mc.addPlayerScore(pl.uuid, moneydemo, config.get(item_type))
            pl.tell("获取奖励："+config.get(item_type))
            pl.tell("计分板变动："+pl.getScore(moneydemo))
        }
    }
}