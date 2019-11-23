import fs from 'fs-extra';

global.App = global.App || {};
global.App.dataDir = global.App.dataDir || `~/.short-todo-list/data`;

if (!fs.existsSync(global.App.dataDir)) fs.mkdirSync(global.App.dataDir);

export default class Store {
      static async save(todo) {
            await fs.writeJson(`${global.App.dataDir}/${todo.id}.json`, todo.toJson());
      }
}