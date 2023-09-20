// LiteLoader-AIDS automatic generated
/// <reference path="/media/banchen/games/mc_bds/bds_api/dts/helperlib/src/index.d.ts"/> 

// 基础信息sql
// const { sqlite } = require('./api/yoyoSqlite-2.0.5');
// var table_name='vault'
// var table_log='log'
// function createTable() {
//     /* 多个参数的时候你可以传对象 */
//     sqlite.connectDb({
//         path: '.\\plugins\\bc\\data\\vault.db',
//         create: true,/* 不存在是否自动创建 */
//     });
//     let sql = sqlite.createTable(table_name, {
//         key: {
//             type: 'TEXT',//字段类型
//             unique: true//是否保持唯一值
//         },
//         balance: {
//             type: 'TEXT'
//         }
//     });
//     colorLog("yellow", 'Initialize table:', sql ? 'OK' : 'NOT');
//     let sql2 = sqlite.createTable(table_log, {
//         from: {
//             type: 'TEXT'
//         },
//         to: {
//             type: 'TEXT'
//         },
//         number:{
//             type: 'INTEGER'
//         },
//         action:{
//             type: 'TEXT'
//         }
//     });
//     colorLog("yellow", 'Initialize table:', sql2 ? 'OK' : 'NOT');
// }

// mc.listen("onServerStarted",()=>
// {
//     createTable()
// })

